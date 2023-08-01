import socket
from akari.dsu.types import MessageType
from akari.dsu.header import Header
from akari.dsu.response import ControllerInformationResponse, SlotState, DeviceModel, BatteryStatus, ConnectionType

from akari.models import Gamepad
from akari.shared import DSU_CLIENTS, GAMEPADS, SERVER_ID
from akari.dsu.client import Client, IncomingDataMessage, Action
from akari.server import app


class Server:
    """The DSU server"""
    def __init__(self) -> None:
        self.socket = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
        self.__stopped = False

    def start(self, host: str = "localhost", port: int = 26760):
        """Starts the DSU server"""
        self.__stopped = False
        app.logger.debug("Binding the DSU server to {}:{}".format(host, port))
        self.socket.bind((host, port))

        while True:
            if self.__stopped:
                self.socket.close()
                return

            message, address = self.socket.recvfrom(1024)
            app.logger.debug("The DSU server received a message from {}:{}".format(*address))

            app.logger.debug(message)

            incoming_header = Header.loads(message)
            message_type = MessageType(int.from_bytes(message[16:20], "little", signed=False))

            if message_type is MessageType.PROTOCOL_INFORMATION:
                # protocol version
                app.logger.debug("DSU {}:{} - It seems to be a PROTOCOL_INFORMATION message".format(*address))
                self.socket.sendto(int(1001).to_bytes(2, "little", signed=False), address)

            elif message_type is MessageType.CONTROLLER_INFORMATION:
                app.logger.debug("DSU {}:{} - It seems to be a CONTROLLER_INFORMATION message".format(*address))

                number_of_ports = int.from_bytes(message[20:24], "little", signed=False)

                app.logger.debug("DSU {}:{} - Is requesting {} ports".format(*address, number_of_ports))

                new_header = Header(
                    magic="DSUS",
                    length=16,  # (32 - 16) it should be ?
                    id=SERVER_ID
                )

                index = 0
                for index, gamepad in enumerate(GAMEPADS.values(), start=1):
                    gamepad: Gamepad
                    if index >= number_of_ports:
                        break
                    app.logger.debug("DSU {}:{} - Slot number {} ".format(*address, message[24 + index - 1]))
                    payload = ControllerInformationResponse(
                        slot=message[24 + index - 1],
                        state=SlotState.CONNECTED if gamepad.connected else SlotState.DISCONNECTED,
                        model=DeviceModel.GYRO,
                        connection=ConnectionType.BLUETOOTH
                    )

                    data = (new_header.dumps() +
                            MessageType.CONTROLLER_INFORMATION.value.to_bytes(4, "little", signed=False) +
                            payload.dumps())

                    data = new_header.add_crc32(data)
                    self.socket.sendto(data, address)

                # missing gamepads are just not connected
                for index in range(number_of_ports - index):
                    app.logger.debug("DSU {}:{} - Sending blank data for slot {}".format(*address, message[24 + index]))
                    data = (new_header.dumps() +
                            MessageType.CONTROLLER_INFORMATION.value.to_bytes(4, "little", signed=False) +
                            int(0).to_bytes(12, "little", signed=False))

                    data = new_header.add_crc32(data)
                    self.socket.sendto(data, address)

            else:
                app.logger.debug("DSU {}:{} - It seems to be a CONTROLLER_DATA message".format(*address))
                incoming_data = IncomingDataMessage(message[20:28])
                if incoming_data.action is Action.MAC_BASED:
                    app.logger.debug("DSU {}:{} - The client is asking for data on MAC address {}".format(*address, incoming_data.mac))
                elif incoming_data.action is Action.SLOT_BASED:
                    app.logger.debug("DSU {}:{} - The client is asking for data on slot {}".format(*address, incoming_data.slot))
                else:
                    app.logger.debug("DSU {}:{} - The client is asking for data on all controllers".format(*address))

                gamepads = list(GAMEPADS.values())
                try:
                    current_gamepad = gamepads[0]
                except IndexError:
                    continue

                for gamepad in gamepads:
                    if gamepad.slot == incoming_data.slot:
                        current_gamepad = gamepad
                        break
                try:
                    Client(
                        host=address[0],
                        port=address[1],
                        header=incoming_header,
                        message=incoming_data,
                        socket=self.socket
                    ).update(current_gamepad)
                except Exception:
                    app.logger.debugger.print_exception()

    def stop(self):
        for address, client in DSU_CLIENTS.items():
            if client.socket == self.socket:
                DSU_CLIENTS.pop(address, None)

        self.__stopped = True
