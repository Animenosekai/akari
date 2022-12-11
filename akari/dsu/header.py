import typing


class Header:
    def __init__(self, magic: typing.Literal["DSUS", "DSUC"], length: int, crc32: int, id: int, version: int = 1001) -> None:
        self.magic = str(magic)
        self.version = int(version)
        self.length = int(length)
        self.crc32 = int(crc32)
        self.id = int(id)

    @staticmethod
    def loads(data: bytes):
        return Header(
            magic=data[:4],
            version=data[4:6],
            length=data[6:8],
            crc32=data[8:12],
            id=data[12:16]
        )

    def dumps(self):
        return (self.magic.encode("utf-8") +
                self.version.to_bytes(2, "little", signed=False) +
                self.length.to_bytes(2, "little", signed=False) +
                self.crc32.to_bytes(4, "little", signed=False) +
                self.id.to_bytes(4, "little", signed=False))


class MessageType:
    def __init__(self) -> None:
        pass