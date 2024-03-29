from threading import Thread
import sys

from akari import http
from akari.dsu.server import Server
from akari.server import app

dsu_server = Server()
Thread(target=dsu_server.start, daemon=True).start()

app.run(host="0.0.0.0", port=4800, debug="--debug" in sys.argv)
