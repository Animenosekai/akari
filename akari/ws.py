from SimpleWebSocketServer import SimpleWebSocketServer, WebSocket
import json
from models import Gamepad
from dacite import from_dict  # type:ignore


class SimpleEcho(WebSocket):
    def handleMessage(self):
        data = from_dict(Gamepad, json.loads(self.data))

    def handleConnected(self):
        print(self.address, 'connected')

    def handleClose(self):
        print(self.address, 'closed')


server = SimpleWebSocketServer(None, 8000, SimpleEcho)
server.serveforever()
