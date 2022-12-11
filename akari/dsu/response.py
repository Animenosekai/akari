import dataclasses
import enum
import struct
import time

from akari.models import Gamepad, Touch


class SlotState(enum.IntEnum):
    DISCONNECTED = 0
    RESERVED = 1  # ?
    CONNECTED = 2


class DeviceModel(enum.IntEnum):
    NOT_APPLICABLE = 0
    NO_GYRO = 1
    GYRO = 2
    VR = 3  # ?


class ConnectionType(enum.IntEnum):
    NOT_APPLICABLE = 0
    USB = 1
    BLUETOOTH = 2


class BatteryStatus(enum.IntEnum):
    NOT_APPLICABLE = 0x00
    DYING = 0x01
    LOW = 0x02
    MEDIUM = 0x03
    HIGH = 0x04
    FULL = 0x05
    CHARGING = 0xEE
    CHARGED = 0xEF


@dataclasses.dataclass
class ControllerResponse:
    slot: int
    state: SlotState
    model: DeviceModel = DeviceModel.NOT_APPLICABLE
    connection: ConnectionType = ConnectionType.NOT_APPLICABLE
    mac: int = 0
    battery: BatteryStatus = BatteryStatus.NOT_APPLICABLE

    def dumps(self):
        return (self.slot.to_bytes(1, "little", signed=False) +
                self.state.value.to_bytes(1, "little", signed=False) +
                self.model.value.to_bytes(1, "little", signed=False) +
                self.connection.value.to_bytes(1, "little", signed=False) +
                self.mac.to_bytes(6, "little", signed=False) +
                self.battery.value.to_bytes(1, "little", signed=False))


class ControllerInformationResponse(ControllerResponse):
    def dumps(self):
        return (super().dumps() + b"\x00")


def generate_touch(touch: Touch):
    return (
        touch.touched.to_bytes(1, "little", signed=False) +
        touch.id.to_bytes(1, "little", signed=False) +
        touch.x.to_bytes(2, "little", signed=False) +
        touch.y.to_bytes(2, "little", signed=False)
    )


@dataclasses.dataclass(kw_only=True)
class ControllerDataResponse(ControllerResponse):
    packet: int
    gamepad: Gamepad

    def dumps(self):
        buttons = self.gamepad.buttons
        touch = self.gamepad.touch
        sticks = self.gamepad.sticks
        accelerometer = self.gamepad.acceleration
        gyroscope = self.gamepad.gyroscope

        def transform_stick(value: float):
            # value is between -1 and 1
            value += 1
            # value is between 0 and 2
            value /= 2
            # value is between 0 and 1
            value *= 255
            # value is between 0 and 255
            return int(value)

        return (
            super().dumps() +

            self.gamepad.connected.to_bytes(1, "little", signed=False) +
            self.packet.to_bytes(4, "little", signed=False) +

            # Button inputs
            sum([
                (pressed << i - 1)
                for i, pressed in enumerate([
                    buttons.MINUS,  # Share
                    buttons.STICKS.left,  # L3
                    buttons.STICKS.right,  # R3
                    buttons.PLUS,  # Options
                    buttons.PAD.up,  # D-Pad Up
                    buttons.PAD.right,  # D-Pad Right
                    buttons.PAD.down,  # D-Pad Down
                    buttons.PAD.left,  # D-Pad Left
                ], start=1)]).to_bytes(1, "little", signed=False) +
            sum([
                (pressed << i - 1)
                for i, pressed in enumerate([
                    buttons.ZL,  # L2
                    buttons.ZR,  # R2
                    buttons.L,  # L1
                    buttons.R,  # R1
                    buttons.X,  # X
                    buttons.A,  # A
                    buttons.B,  # B
                    buttons.Y,  # Y
                ], start=1)]).to_bytes(1, "little", signed=False) +
            buttons.HOME.to_bytes(1, "little", signed=False) +
            touch.touched.to_bytes(1, "little", signed=False) +  # touch button (?)

            # Analog inputs
            transform_stick(sticks.left.x).to_bytes(1, "little", signed=False) +
            transform_stick(sticks.left.y).to_bytes(1, "little", signed=False) +
            transform_stick(sticks.right.x).to_bytes(1, "little", signed=False) +
            transform_stick(sticks.right.y).to_bytes(1, "little", signed=False) +
            (255 if buttons.PAD.left else 0).to_bytes(1, "little", signed=False) +
            (255 if buttons.PAD.down else 0).to_bytes(1, "little", signed=False) +
            (255 if buttons.PAD.right else 0).to_bytes(1, "little", signed=False) +
            (255 if buttons.PAD.up else 0).to_bytes(1, "little", signed=False) +
            (255 if buttons.Y else 0).to_bytes(1, "little", signed=False) +
            (255 if buttons.B else 0).to_bytes(1, "little", signed=False) +
            (255 if buttons.A else 0).to_bytes(1, "little", signed=False) +
            (255 if buttons.X else 0).to_bytes(1, "little", signed=False) +
            (255 if buttons.R else 0).to_bytes(1, "little", signed=False) +
            (255 if buttons.L else 0).to_bytes(1, "little", signed=False) +
            (255 if buttons.ZR else 0).to_bytes(1, "little", signed=False) +
            (255 if buttons.ZL else 0).to_bytes(1, "little", signed=False) +

            # Touch inputs
            generate_touch(touch) +
            (int(0).to_bytes(6, "little", signed=False)) +  # second touch

            # Movement inputs
            (int(time.time() / 1e-6).to_bytes(8, "little", signed=False)) +  # TOOD: motion data timestamp (microseconds)

            struct.pack("<f", float(accelerometer.x)) +
            struct.pack("<f", float(accelerometer.y)) +
            struct.pack("<f", float(accelerometer.z)) +
            struct.pack("<f", float(gyroscope.x)) +
            struct.pack("<f", float(gyroscope.y)) +
            struct.pack("<f", float(gyroscope.z))
        )
