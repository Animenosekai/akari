from nasse import Nasse
from flask_sock import Sock

app = Nasse("akari", flask_options={
    "root_path": __name__
})
sock = Sock(app.flask)
