import typing
import binascii
import dataclasses


@dataclasses.dataclass
class Header:
    magic: typing.Literal["DSUS", "DSUC"]
    length: int
    id: int
    version: int = 1001

    @staticmethod
    def loads(data: bytes):
        return Header(
            magic=data[:4],
            version=data[4:6],
            length=data[6:8],
            id=data[12:16]
        )

    def dumps(self):
        return (self.magic.encode("utf-8") +
                self.version.to_bytes(2, "little", signed=False) +
                self.length.to_bytes(2, "little", signed=False) +
                int(0).to_bytes(4, "little", signed=False) +  # CRC32, will be added when completing the packet
                self.id.to_bytes(4, "little", signed=False))

    def add_crc32(self, data: bytes):
        return data[:8] + (binascii.crc32(data) % (1 << 32)).to_bytes(4, "little", signed=False) + data[12:]
