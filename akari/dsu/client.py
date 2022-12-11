import dataclasses
import enum
import socket

from akari.dsu.header import Header
from akari.dsu.response import (BatteryStatus, ConnectionType,
                                ControllerDataResponse, DeviceModel, SlotState)
from akari.models import Gamepad
from akari.dsu.types import MessageType
from akari.shared import SERVER_ID


class Action(enum.Enum):
    ALL = 0
    SLOT_BASED = 1
    MAC_BASED = 2


class IncomingDataMessage:
    def __init__(self, data: bytes) -> None:
        self.action = Action(data[0])
        self.slot = data[1]
        self.mac = int.from_bytes(data[2:8], "little", signed=False)


@dataclasses.dataclass
class Client:
    host: str
    port: int
    header: Header
    message: IncomingDataMessage
    socket: socket.socket
    number = 0

    def update(self, gamepad: Gamepad):
        self.number += 1
        payload = ControllerDataResponse(
            slot=self.message.slot,
            state=SlotState.CONNECTED if gamepad.connected else SlotState.DISCONNECTED,
            model=DeviceModel.GYRO,
            connection=ConnectionType.BLUETOOTH,
            mac=self.message.mac,
            battery=BatteryStatus.NOT_APPLICABLE,
            packet=self.number,
            gamepad=gamepad
        )
        new_header = Header(
            magic="DSUS",
            length=84,  # (100 - header_length) it should be ?
            id=SERVER_ID
        )
        
        data = (new_header.dumps() +
                MessageType.CONTROLLER_DATA.value.to_bytes(4, "little", signed=False) +
                payload.dumps())

        data = new_header.add_crc32(data)

        self.socket.sendto(data, (self.host, self.port))
