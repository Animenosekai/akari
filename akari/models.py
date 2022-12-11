import dataclasses


@dataclasses.dataclass
class Vector:
    """
    A 3 dimensional vector
    """
    x: float
    """X-axis (horizontal) vector magnitude"""
    y: float
    """Y-axis (depth) vector magnitude"""
    z: float
    """Z-axis (vertical) vector magnitude"""


@dataclasses.dataclass
class Touch:
    """
    Touch Screen touching values
    """
    touched: bool
    """If the screen is touched"""
    id: int
    """The touch ID (1 byte)"""
    x: int
    """The X-coordinate (horizontal) of the touched area"""
    y: int
    """The Y-coordinate (vertical) of the touched area"""


@dataclasses.dataclass
class Stick:
    """
    The stick state
    """
    pressed: bool
    """If the stick is pressed/clicked"""
    x: float
    """X-axis (horizontal) deflection from the center position"""
    y: float
    """Y-axis (vertical) deflection from the center position"""


@dataclasses.dataclass
class Sticks:
    """
    Report on the sticks state
    """
    left: Stick
    """Left stick"""
    right: Stick
    """Right stick"""


@dataclasses.dataclass
class Orientation:
    """
    This is a basis of three perpendicular unit vectors;
    that is, each vector has length 1.0 and points along the relevant axis of the GamePad relative to an arbitrary starting orientation in three-dimensional space.
    """
    x: Vector
    y: Vector
    z: Vector


@dataclasses.dataclass
class Pad:
    """
    The cross pad on the Gamepad
    """
    left: bool
    right: bool
    up: bool
    down: bool


@dataclasses.dataclass
class SticksButton:
    """
    Wether the sticks are pressed or not
    """
    left: bool
    right: bool


@dataclasses.dataclass
class Buttons:
    """
    Pressed buttons
    """
    TV: bool
    A: bool
    B: bool
    X: bool
    Y: bool
    ZL: bool
    ZR: bool
    L: bool
    R: bool
    PLUS: bool
    MINUS: bool
    HOME: bool
    POWER: bool
    PAD: Pad
    STICKS: SticksButton


@dataclasses.dataclass
class Gamepad:
    """
    Gamepad state
    """
    connected: bool
    acceleration: Vector
    gyroscope: Vector
    angle: Vector
    touch: Touch
    sticks: Sticks
    orientation: Orientation
    buttons: Buttons
