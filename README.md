# akari

> Using your Wii U Gamepad as a DSU Controller.

## Index

- [Index](#index)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
    - [Python](#python)
- [Installing](#installing)
- [Usage](#usage)
- [Contributing](#contributing)
- [Built With](#built-with)
  - [Website](#website)
  - [Server](#server)
- [Authors](#authors)
- [Disclaimer](#disclaimer)
  - [Known Issues](#known-issues)
    - [Unfixable](#unfixable)
- [License](#license)

## Getting Started

### Prerequisites

#### Python

You will need Python 3 to use this module

```bash
# vermin output
Minimum required versions: 3.8
Incompatible versions:     2
```

First and foremost you need to download a copy of this repository.

To do so, use git :

```bash
git clone https://github.com/Animenosekai/akari.git
```

Or download the zip.

## Installing

Then, you need to install the dependencies.

Use pip to install them :

```bash
python -m pip install -r requirements.txt
```

## Usage

To run `akari`, you need to launch `run.py` :

```bash
python run.py
```

You would then need to head to your Wii U, open the internet browser, and go to the following page [http://\<your-computer-ip\>:4800](http://<your-computer-ip>:4800)

> ***Note***  
> You need to replace `<your-computer-ip>` with your computer IP address

Once you see `Connected` at the bottom of the webpage, you can head to your favorite DSU client (i.e. Cemu, Ryujinx, etc.) with the port `26760` (the default port for Cemuhook servers according to the [protocol](https://github.com/v1993/cemuhook-protocol)).

## Contributing

Pull requests are welcome. For major changes, please open a discussion first to discuss what you would like to change.

Please make sure to update the tests as appropriate.

## Built With

### Website

- React
- Next.js
- Tailwind CSS
- bezier-editor

### Server

- [Nasse](https://github.com/Animenosekai/nasse)
- [flask_sock](https://github.com/miguelgrinberg/flask-sock)

## Authors

- Anime no Sekai *- Initial work -* [Animenosekai](https://github.com/Animenosekai)

## Disclaimer

### Known Issues

- The Bézier curves data are recorded to `LocalStorage` but, `LocalStorage` is cleared after quitting the browser and the values aren't used for now
- The settings page doesn't work very well for now
- There is a styling problem with the modals
- The controller changes name after refreshing the webpage

#### Unfixable

- You currently can't long-press the `B` button without returning to the home screen
- The `Power` button is supported but is obviously not working
- The `TV` button is supported but doesn't seem to be working
- The `HOME` button is supported but is obviously not working

## License

This repository is licensed under the [MIT License](./LICENSE)
