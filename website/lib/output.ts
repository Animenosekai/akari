export interface Output {
    /** Wether the Gamepad is connected or not */
    connected: boolean

    /**
     * These variables form a vector showing the current acceleration forces on the WiiUGamepad, measured in Gs.
     * 
     * Note: When held level and motionless, the force of gravity will cause these variables to contain the vector (0.0, -1.0, 0.0).
     */
    acceleration: Vector
    /**
     * The following variables hold the current state of the WiiUGamepad's gyroscopes.
     * 
     * Note: When the WiiUGamepad is motionless these values hover around 0.0.
     */
    gyroscope: Vector
    /**
     * The following variables hold the current angle of rotation of the GamePad.
     * 
     * Note: A change of 1.0 in these values represents a complete revolution around the specified axis.
     * These variables do not appear to wrap around; multiple revolutions around the same axis will cause the value to continuously increase or decrease.
     * 
     * Note: If properly calibrated, horizontal and vertical should hover around 0.0 when the GamePad is held level, but as the gyroscopes have limited range and resolution the alignment will drift with use.
     */
    angle: Vector
    /**
     * Touch Screen touching values
     */
    touch: Touch
    /**
     * Report on the sticks state
     */
    sticks: Sticks
    /**
     * This is a basis of three perpendicular unit vectors;
     * that is, each vector has length 1.0 and points along the relevant axis of the GamePad relative to an arbitrary starting orientation in three-dimensional space.
     */
    orientation: Orientation
    /**
     * Pressed buttons
     */
    buttons: Buttons
}

/** A 3 dimensional vector */
export interface Vector {
    /** X-axis (horizontal) vector magnitude */
    x: number
    /** Y-axis (depth) vector magnitude */
    y: number
    /** Z-axis (vertical) vector magnitude */
    z: number
}


/** Touch Screen touching values */
export interface Touch {
    /** If the screen is touched */
    touched: boolean
    /** The touch ID (1 byte) */
    id: number
    /** The X-coordinate (horizontal) of the touched area */
    x: number
    /** The Y-coordinate (vertical) of the touched area */
    y: number
}

/** Report on the sticks state */
export interface Sticks {
    /** Left stick state */
    left: Stick
    /** Right stick state */
    right: Stick
}

/** The stick state */
export interface Stick {
    /** If the stick is pressed/clicked */
    pressed: boolean
    /** X-axis (horizontal) deflection from the center position */
    x: number
    /** Y-axis (vertical) deflection from the center position */
    y: number
}

/** This is a basis of three perpendicular unit vectors;
    that is, each vector has length 1.0 and points along the relevant axis of the GamePad relative to an arbitrary starting orientation in three-dimensional space. */
export interface Orientation {
    /** Horizontal (X) vector of the orientation base */
    x: Vector
    /** Depth (Y) vector of the orientation base */
    y: Vector
    /** Vertical (Z) vector of the orientation base */
    z: Vector
}

/** Pressed buttons */
export interface Buttons {
    /** TV Button */
    TV: boolean

    /** A Button */
    A: boolean
    /** B Button */
    B: boolean
    /** X Button */
    X: boolean
    /** Y Button */
    Y: boolean

    /** ZL Button */
    ZL: boolean,
    /** ZR Button */
    ZR: boolean,
    /** L Button */
    L: boolean,
    /** R Button */
    R: boolean,

    /** + Button */
    PLUS: boolean,
    /** + Button */
    "+": boolean, // alias for PLUS
    /** - Button */
    MINUS: boolean, // alias for MINUS
    /** - Button */
    "-": boolean,

    /** Home Button */
    HOME: boolean,
    /** Power Button */
    POWER: boolean,

    /** Pad Buttons */
    PAD: Pad

    /** Sticks */
    STICKS: SticksPressed
}

export interface Pad {
    /** Pad Left Button */
    left: boolean
    /** Pad Right Button */
    right: boolean
    /** Pad Up Button */
    up: boolean
    /** Pad Down Button */
    down: boolean
}

export interface SticksPressed {
    /** Left stick pressed */
    left: boolean // alias for sticks.left.pressed
    /** Right stick pressed */
    right: boolean // alias for sticks.right.pressed
}


export const defaultOutput: Output = {
    connected: false,
    acceleration: {
        x: 0,
        y: 0,
        z: 0
    },
    gyroscope: {
        x: 0,
        y: 0,
        z: 0
    },

    angle: {
        x: 0,
        y: 0,
        z: 0
    },

    touch: {
        touched: false,
        id: 0,
        x: 0,
        y: 0
    },

    sticks: {
        left: {
            pressed: false,
            x: 0,
            y: 0
        },
        right: {
            pressed: false,
            x: 0,
            y: 0
        }
    },

    orientation: {
        x: {
            x: 0,
            y: 0,
            z: 0
        },
        y: {
            x: 0,
            y: 0,
            z: 0
        },
        z: {
            x: 0,
            y: 0,
            z: 0
        }
    },

    buttons: {
        TV: false,

        A: false,
        B: false,
        X: false,
        Y: false,

        ZL: false,
        ZR: false,
        L: false,
        R: false,

        PLUS: false,
        "+": false, // alias for PLUS
        MINUS: false, // alias for MINUS
        "-": false,

        HOME: false,
        POWER: false,

        PAD: {
            left: false,
            right: false,
            up: false,
            down: false
        },

        STICKS: {
            left: false, // alias for sticks.left.pressed
            right: false // alias for sticks.right.pressed
        }
    }
}