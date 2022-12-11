import json
import pathlib
import uuid

from dacite import from_dict  # type: ignore
from flask import send_file

from akari.models import Gamepad
from akari.server import app, sock
from akari.shared import DSU_CLIENTS, GAMEPADS

BASE_DIRECTORY = pathlib.Path(__file__).parent.parent


@app.route('/')
def index():
    return send_file(BASE_DIRECTORY / "website" / "index.html")


@app.route('/scripts/main.js')
def main():
    return send_file(BASE_DIRECTORY / "website" / "scripts" / "main.js")


@app.route('/scripts/models.js')
def models():
    return send_file(BASE_DIRECTORY / "website" / "scripts" / "models.js")


@sock.route('/akari')
def akari(ws):
    request_id = str(uuid.uuid4())
    try:
        slot = max(gamepad.slot for gamepad in GAMEPADS.values()) + 1
    except Exception:
        slot = 0
    try:
        while True:
            data = from_dict(Gamepad, json.loads(ws.receive()))
            # app.log(data)
            ws.send("OK")
            data.slot = slot
            GAMEPADS[request_id] = data
            # for client in DSU_CLIENTS.values():
            #     try:
            #         client.update(data)
            #     except Exception:
            #         app.logger.print_exception()
    except Exception as err:
        ws.send(str(err))
        GAMEPADS.pop(request_id, None)
