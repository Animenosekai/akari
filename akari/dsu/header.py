import typing
import binascii
import dataclasses


@dataclasses.dataclass
class Header:
    magic: typing.Literal["DSUS", "DSUC"]
    length: int
    id: int
    crc32: int = 0
    version: int = 1001

    @staticmethod
    def loads(data: bytes):
        return Header(
            magic=data[:4].decode(),
            version=int.from_bytes(data[4:6], "little", signed=False),
            length=int.from_bytes(data[6:8], "little", signed=False),
            crc32=int.from_bytes(data[8:12], "little", signed=False),
            id=int.from_bytes(data[12:16], "little", signed=False)
        )

    def dumps(self):
        return (self.magic.encode("utf-8") +
                self.version.to_bytes(2, "little", signed=False) +
                self.length.to_bytes(2, "little", signed=False) +
                self.crc32.to_bytes(4, "little", signed=False) +  # CRC32, will be added when completing the packet
                self.id.to_bytes(4, "little", signed=False))

    def add_crc32(self, data: bytes):
        return data[:8] + (binascii.crc32(data) % (1 << 32)).to_bytes(4, "little", signed=False) + data[12:]
