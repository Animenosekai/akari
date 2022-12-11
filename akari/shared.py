"""
Shared data between the WebSocket server and the UDP DSU Server
"""
import random
import typing

# from akari.dsu.client import Client
# from akari.models import Gamepad

SERVER_ID = random.randrange(0, 2**32, 1)

GAMEPADS: typing.Dict[str, "Gamepad"] = {}
"""
A variable holding the gamepads coming from the key address

{
    "fd567eac-dca2-477f-a2d8-d490ea59f619": <akari.models.Gamepad instance>
}
"""


DSU_CLIENTS: typing.Dict[str, "Client"] = {}
"""
A variable holding the different DSU clients

{
    "address1": Client
}
"""
