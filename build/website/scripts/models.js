/**
 * models.js
 * 
 * A wrapper around the wiiu.gamepad API
 */

; (function (available) {
    if (!available) return;

    const WiiUGamepad = {
        /**
         * Default values
         */

        /** Wether the Gamepad is connected or not */
        connected: false,

        /**
         * These variables form a vector showing the current acceleration forces on the WiiUGamepad, measured in Gs.
         * 
         * Note: When held level and motionless, the force of gravity will cause these variables to contain the vector (0.0, -1.0, 0.0).
         */
        acceleration: {
            /** Force on X (horizontal) axis */
            x: 0,
            /** Force on Y (depth) axis */
            y: 0,
            /** Force on Z (vertical) axis */
            z: 0
        },
        /**
         * The following variables hold the current state of the WiiUGamepad's gyroscopes.
         * 
         * Note: When the WiiUGamepad is motionless these values hover around 0.0.
         */
        gyroscope: {
            /** Rotation speed around X (horizontal) axis */
            x: 0,
            /** Rotation speed around Y (depth) axis */
            y: 0,
            /** Rotation speed around Z (vertical) axis */
            z: 0
        },

        /**
         * The following variables hold the current angle of rotation of the GamePad.
         * 
         * Note: A change of 1.0 in these values represents a complete revolution around the specified axis.
         * These variables do not appear to wrap around; multiple revolutions around the same axis will cause the value to continuously increase or decrease.
         * 
         * Note: If properly calibrated, horizontal and vertical should hover around 0.0 when the GamePad is held level, but as the gyroscopes have limited range and resolution the alignment will drift with use.
         */
        angle: {
            /** Rotation around X (horizontal) axis */
            x: 0,
            /** Rotation around Y (depth) axis */
            y: 0,
            /** Rotation around Z (vertical) axis */
            z: 0
        },

        /**
         * Touch Screen touching values
         */
        touch: {
            /** Wether the touch screen is touched */
            touched: false,
            /** The touch ID */
            id: 0,
            /** The X (horizontal) coordinate of the touched surface */
            x: 0,
            /** The Y (vertical) coordinate of the touched surface */
            y: 0
        },

        /**
         * Report on the sticks state
         */
        sticks: {
            /** Left stick */
            left: {
                /** If the left stick is pressed */
                pressed: false,
                /** X-axis (horizontal) deflection from the center position */
                x: 0,
                /** Y-axis (vertical) deflection from the center position */
                y: 0
            },
            /** Right stick */
            right: {
                /** If the right stick is pressed */
                pressed: false,
                /** X-axis (horizontal) deflection from the center position */
                x: 0,
                /** Y-axis (vertical) deflection from the center position */
                y: 0
            }
        },

        /**
         * This is a basis of three perpendicular unit vectors;
         * that is, each vector has length 1.0 and points along the relevant axis of the GamePad relative to an arbitrary starting orientation in three-dimensional space.
         */
        orientation: {
            /** Horizontal (X) vector of the orientation base */
            x: {
                /** X component of the horizontal vector */
                x: 0,
                /** Y component of the horizontal vector */
                y: 0,
                /** Z component of the horizontal vector */
                z: 0
            },
            /** Depth (Y) vector of the orientation base */
            y: {
                /** X component of the depth vector */
                x: 0,
                /** Y component of the depth vector */
                y: 0,
                /** Z component of the depth vector */
                z: 0
            },
            /** Vertical (Z) vector of the orientation base */
            z: {
                /** X component of the vertical vector */
                x: 0,
                /** Y component of the vertical vector */
                y: 0,
                /** Z component of the vertical vector */
                z: 0
            }
        },

        /**
         * Pressed buttons
         */
        buttons: {
            /** TV Button */
            TV: false,

            /** A Button */
            A: false,
            /** B Button */
            B: false,
            /** X Button */
            X: false,
            /** Y Button */
            Y: false,

            /** ZL Button */
            ZL: false,
            /** ZR Button */
            ZR: false,
            /** L Button */
            L: false,
            /** R Button */
            R: false,

            /** + Button */
            PLUS: false,
            /** + Button */
            "+": false, // alias for PLUS
            /** - Button */
            MINUS: false, // alias for MINUS
            /** - Button */
            "-": false,

            /** Home Button */
            HOME: false,
            /** Power Button */
            POWER: false,

            /** Pad Buttons */
            PAD: {
                /** Pad Left Button */
                left: false,
                /** Pad Right Button */
                right: false,
                /** Pad Up Button */
                up: false,
                /** Pad Down Button */
                down: false
            },

            /** Sticks */
            STICKS: {
                /** Left stick pressed */
                left: false, // alias for sticks.left.pressed
                /** Right stick pressed */
                right: false // alias for sticks.right.pressed
            }
        }
    }

    /**
     * Updates the WiiUGamepad Input values with the latest ones
     */
    WiiUGamepad.update = function () {
        const current = wiiu.gamepad.update();

        function is_held(testing) {
            return (current.hold & 0x7f86fffc & testing) > 0;
        }

        this.connected = current.isEnabled === 1;

        this.acceleration = {
            x: current.accX,
            y: current.accY,
            z: current.accZ
        };

        this.gyroscope = {
            x: current.gyroX,
            y: current.gyroY,
            z: current.gyroZ
        };

        this.angle = {
            x: current.angleX,
            y: current.angleY,
            z: current.angleZ
        };


        const touched = current.tpTouch === 1;

        if (this.touch && this.touch.id) {
            var id = this.touch.id;
        } else {
            var id = 0;
        }
        if (touched != this.touch.touched) {
            id = (id + 1) % 256 // increments the touch ID for 1 byte
        }

        this.touch = {
            touched: touched,
            id: id,
            x: current.tpX,
            y: current.tpY,
        }

        this.sticks = {
            left: {
                pressed: is_held(0x00040000),
                x: current.lStickX,
                y: current.lStickY
            },
            right: {
                pressed: is_held(0x00020000),
                x: current.rStickX,
                y: current.rStickY
            },
        }

        this.orientation = {
            x: {
                x: current.dirXx,
                y: current.dirXy,
                z: current.dirXz
            },
            y: {
                x: current.dirYx,
                y: current.dirYy,
                z: current.dirYz
            },
            z: {
                x: current.dirZx,
                y: current.dirZy,
                z: current.dirZz
            }
        }

        this.buttons = {
            TV: is_held(0x00010000),

            A: is_held(0x00008000),
            B: is_held(0x00004000),
            X: is_held(0x00002000),
            Y: is_held(0x00001000),

            ZL: is_held(0x00000080),
            ZR: is_held(0x00000040),
            L: is_held(0x00000020),
            R: is_held(0x00000010),

            PLUS: is_held(0x00000008),
            MINUS: is_held(0x00000004),

            HOME: is_held(0x00000002),
            POWER: is_held(0x00000001), // not sure?

            PAD: {
                left: is_held(0x00000800),
                right: is_held(0x00000400),
                up: is_held(0x00000200),
                down: is_held(0x00000100)
            },

            STICKS: {
                left: this.sticks.left.pressed,
                right: this.sticks.right.pressed,
            }
        };

        this.buttons["+"] = this.buttons.PLUS;
        this.buttons["-"] = this.buttons.MINUS;

        if (this.onupdate) this.onupdate();
    }

    /**
     * A setInterval replacement, if needed
     * @param {number} rate - The interval rate
     * 
     * Note: This got introduced to overcome any response/latency issue
     * See https://github.com/ryanmcgrath/wii-js/blob/314201355ebe8a4e319557ab5aa681da80115563/js/wii.js#LL180 for more information
     * 
     */
    WiiUGamepad.startInterval = function (rate) {
        this.__interval_enabled = true
        this.update()
        setInterval(function () {
            if (!this.__interval_enabled) return;
            this.interval();
        }, rate);
    }

    /**
     * Stops the interval launched by the `startInterval`
     * 
     * Note: This can fail in the rare event that `stopInterval` is called right before startInterval is recalled.
     */
    WiiUGamepad.stopInterval = function () {
        this.__interval_enabled = false
    }

    /**
     * Starts updating the values in near real-time
     * @param {number} refreshRate - The values updating rate
     */
    WiiUGamepad.listen = function (refreshRate) {
        ["keydown", "keypress", "keyup"].forEach(function (e) {
            window.addEventListener(e, function (ev) {
                ev.preventDefault();
            })
        })

        setInterval(function () {
            WiiUGamepad.update();
        }, refreshRate);

        return WiiUGamepad
    }

    window.WiiUGamepad = WiiUGamepad;
})(window.wiiu && window.wiiu.gamepad);