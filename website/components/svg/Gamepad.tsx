import * as React from "react"

import { Output } from "lib/output"
import cn from "classnames"

const ACTIVE_COLOR = "#ebcc34"

export interface GamepadSVGProps extends React.SVGProps<SVGSVGElement> {
    output: Output
    onRightStickClick?: any
    onLeftStickClick?: any
}

const GamepadSVG = ({ output, onRightStickClick, onLeftStickClick, className, ...props }: GamepadSVGProps) => {
    return (
        <svg
            width={660}
            height={345}
            viewBox="0 0 660 345"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={cn("opacity-75", className, {
                "opacity-100": output.connected
            })}
            {...props}
        >
            <g id="gamepad">
                <rect
                    id="main-frame"
                    x={1}
                    y={1}
                    width={658}
                    height={343}
                    rx={99}
                    fill="#EDEDED"
                    stroke="#15BFD6"
                    strokeWidth={2}
                />
                <path
                    id="l-button"
                    d="M27 26c-9.72 9-13.5 14.5-17 31C40 3.5 90 1 90 1S54 1 27 26z"
                    fill={output.buttons.L ? ACTIVE_COLOR : "#19C0D7"}
                />
                <path
                    id="r-button"
                    d="M633 26c9.72 9 13.5 14.5 17 31-30-53.5-80-56-80-56s36 0 63 25z"
                    fill={output.buttons.R ? ACTIVE_COLOR : "#19C0D7"}
                />
                <g id="screen" stroke="#19C0D7" strokeWidth={3}>
                    <path
                        id="screen-outer"
                        d="M151 64.5h358a6.5 6.5 0 016.5 6.5v202a6.5 6.5 0 01-6.5 6.5H151a6.5 6.5 0 01-6.5-6.5V71a6.5 6.5 0 016.5-6.5z"
                    />
                    <path
                        id="screen-inner"
                        d="M152.5 272.5v-200h356v200h-356z"
                        fill={output.touch.touched ? ACTIVE_COLOR : "#D9D9D9"}
                    />
                </g>
                <g id="camera" stroke="#19C0D7">
                    <rect
                        id="camera-container"
                        x={238}
                        y={17}
                        width={184}
                        height={24}
                        rx={12}
                        strokeWidth={4}
                    />
                    <g id="camera-object">
                        <circle
                            id="camera-outer"
                            cx={330}
                            cy={29}
                            r={8.5}
                            strokeWidth={3}
                        />
                        <circle id="camera-inner" cx={330} cy={29} r={4} strokeWidth={2} />
                    </g>
                </g>
                <g id="left-stick" stroke="#19C0D7" onClick={onLeftStickClick} className={cn({
                    "cursor-pointer": onLeftStickClick
                })}>
                    <circle
                        id="stick-container"
                        cx={61.5}
                        cy={80.5}
                        r={32}
                        fill="#F5F5F5"
                        strokeWidth={3}
                    />
                    <g id="stick" fill={output.sticks.left.pressed ? ACTIVE_COLOR : "#fff"}>
                        <circle
                            id="stick-outside"
                            cx={61.5 + output.sticks.left.x * 20}
                            cy={80.5 - output.sticks.left.y * 20}
                            r={23}
                            strokeWidth={3}
                        />
                        <circle
                            id="stick-inside"
                            cx={61.5 + output.sticks.left.x * 20}
                            cy={80.5 - output.sticks.left.y * 20}
                            r={15.5}
                            strokeWidth={2}
                        />
                    </g>
                </g>
                <g id="right-stick" stroke="#19C0D7" onClick={onRightStickClick} className={cn({
                    "cursor-pointer": onRightStickClick
                })}>
                    <circle
                        id="stick-container_2"
                        cx={598.5}
                        cy={80.5}
                        r={32}
                        fill="#F5F5F5"
                        strokeWidth={3}
                    />
                    <g id="stick_2" fill={output.sticks.right.pressed ? ACTIVE_COLOR : "#fff"}>
                        <circle
                            id="stick-outside_2"
                            cx={598.5 + output.sticks.right.x * 20}
                            cy={80.5 - output.sticks.right.y * 20}
                            r={23}
                            strokeWidth={3}
                        />
                        <circle
                            id="stick-inside_2"
                            cx={598.5 + output.sticks.right.x * 20}
                            cy={80.5 - output.sticks.right.y * 20}
                            r={15.5}
                            strokeWidth={2}
                        />
                    </g>
                </g>
                <g id="center-buttons">
                    <g id="home">
                        <circle
                            id="home-button"
                            cx={330}
                            cy={309}
                            r={13.5}
                            fill={output.buttons.HOME ? ACTIVE_COLOR : "#fff"}
                            stroke="#19C0D7"
                            strokeWidth={3}
                        />
                    </g>
                    <circle id="microphone" cx={294} cy={309} r={2} fill="gray" />
                </g>
                <g id="power-buttons">
                    <circle id="battery-indicator" cx={435} cy={309} r={3} fill="gray" />
                    <rect
                        id="tv-button"
                        x={460.5}
                        y={301.5}
                        width={15}
                        height={15}
                        rx={2.5}
                        fill={output.buttons.TV ? ACTIVE_COLOR : "#fff"}
                        stroke="#19C0D7"
                        strokeWidth={3}
                    />
                    <circle
                        id="power-button"
                        cx={502}
                        cy={309}
                        r={7.5}
                        fill={output.buttons.POWER ? ACTIVE_COLOR : "#fff"}
                        stroke="#19C0D7"
                        strokeWidth={3}
                    />
                </g>
                <g id="speakers" fill="#19C0D7">
                    <rect
                        id="right-speaker"
                        x={537}
                        y={305}
                        width={18}
                        height={8}
                        rx={4}
                    />
                    <rect
                        id="left-speaker"
                        x={105}
                        y={305}
                        width={18}
                        height={8}
                        rx={4}
                    />
                </g>
                <g id="plus-minus" fill="#fff" stroke="#19C0D7" strokeWidth={2}>
                    <circle id="plus-button" cx={546} cy={221} r={9} fill={output.buttons.PLUS ? ACTIVE_COLOR : ""} />
                    <circle id="minus-button" cx={546} cy={255} r={9} fill={output.buttons.MINUS ? ACTIVE_COLOR : ""} />
                </g>
                <g id="cross-alphabetical" fill="#fff" stroke="#19C0D7" strokeWidth={3}>
                    <circle id="b-button" cx={574} cy={181} r={11.5} fill={output.buttons.B ? ACTIVE_COLOR : ""} />
                    <circle id="a-button" cx={601} cy={155} r={11.5} fill={output.buttons.A ? ACTIVE_COLOR : ""} />
                    <circle id="x-button" cx={574} cy={129} r={11.5} fill={output.buttons.X ? ACTIVE_COLOR : ""} />
                    <circle id="y-button" cx={549} cy={155} r={11.5} fill={output.buttons.Y ? ACTIVE_COLOR : ""} />
                </g>
                <g id="cross">
                    <path id="cross-middle" fill="#fff" d="M80 145H100V165H80z" />
                    <g id="cross-up">
                        {/* <mask id="path-29-inside-1_1_130" fill="#fff">
                            <path d="M80 131a5 5 0 015-5h10a5 5 0 015 5v17H80v-17z" />
                        </mask> */}
                        <path
                            d="M80 131a5 5 0 015-5h10a5 5 0 015 5v17H80v-17z"
                            fill={output.buttons.PAD.up ? ACTIVE_COLOR : "#fff"}
                        />
                        <path
                            d="M77 131a8 8 0 018-8h10a8 8 0 018 8h-6a2 2 0 00-2-2H85a2 2 0 00-2 2h-6zm23 17H80h20zm-23 0v-17a8 8 0 018-8v6a2 2 0 00-2 2v17h-6zm18-25a8 8 0 018 8v17h-6v-17a2 2 0 00-2-2v-6z"
                            fill="#19C0D7"
                            mask="url(#path-29-inside-1_1_130)"
                        />
                    </g>
                    <g id="cross-right">
                        {/* <mask id="path-31-inside-2_1_130" fill="#fff">
                            <path d="M97 145h17a5 5 0 015 5v10a5 5 0 01-5 5H97v-20z" />
                        </mask> */}
                        <path
                            d="M97 145h17a5 5 0 015 5v10a5 5 0 01-5 5H97v-20z"
                            fill={output.buttons.PAD.right ? ACTIVE_COLOR : "#fff"}
                        />
                        <path
                            d="M97 142h17a8 8 0 018 8h-6a2 2 0 00-2-2H97v-6zm25 18a8 8 0 01-8 8H97v-6h17a2 2 0 002-2h6zm-25 5v-20 20zm17-23a8 8 0 018 8v10a8 8 0 01-8 8v-6a2 2 0 002-2v-10a2 2 0 00-2-2v-6z"
                            fill="#19C0D7"
                            mask="url(#path-31-inside-2_1_130)"
                        />
                    </g>
                    <g id="cross-down">
                        {/* <mask id="path-33-inside-3_1_130" fill="#fff">
                            <path d="M80 162h20v17a5 5 0 01-5 5H85a5 5 0 01-5-5v-17z" />
                        </mask> */}
                        <path
                            d="M80 162h20v17a5 5 0 01-5 5H85a5 5 0 01-5-5v-17z"
                            fill={output.buttons.PAD.down ? ACTIVE_COLOR : "#fff"}
                        />
                        <path
                            d="M80 162h20-20zm23 17a8 8 0 01-8 8H85a8 8 0 01-8-8h6a2 2 0 002 2h10a2 2 0 002-2h6zm-18 8a8 8 0 01-8-8v-17h6v17a2 2 0 002 2v6zm18-25v17a8 8 0 01-8 8v-6a2 2 0 002-2v-17h6z"
                            fill="#19C0D7"
                            mask="url(#path-33-inside-3_1_130)"
                        />
                    </g>
                    <g id="cross-left">
                        {/* <mask id="path-35-inside-4_1_130" fill="#fff">
                            <path d="M61 150a5 5 0 015-5h17v20H66a5 5 0 01-5-5v-10z" />
                        </mask> */}
                        <path
                            d="M61 150a5 5 0 015-5h17v20H66a5 5 0 01-5-5v-10z"
                            fill={output.buttons.PAD.left ? ACTIVE_COLOR : "#fff"}
                        />
                        <path
                            d="M58 150a8 8 0 018-8h17v6H66a2 2 0 00-2 2h-6zm25 18H66a8 8 0 01-8-8h6a2 2 0 002 2h17v6zm-17 0a8 8 0 01-8-8v-10a8 8 0 018-8v6a2 2 0 00-2 2v10a2 2 0 002 2v6zm17-23v20-20z"
                            fill="#19C0D7"
                            mask="url(#path-35-inside-4_1_130)"
                        />
                    </g>
                </g>
                <g id="nfc">
                    <g id="nfc-sub">
                        <mask id="path-37-inside-5_1_130" fill="#fff">
                            <path d="M74 226a4 4 0 014-4h30a4 4 0 014 4v14a4 4 0 01-4 4H78a4 4 0 01-4-4v-14z" />
                        </mask>
                        <path
                            d="M74 226a5 5 0 015-5h29a5 5 0 015 5h-2a3 3 0 00-3-3H78c-2.21 0-4 1.343-4 3zm38 18H74h38zm-38 0v-22 22zm34-23a5 5 0 015 5v13a5 5 0 01-5 5c1.657 0 3-1.791 3-4v-14a3 3 0 00-3-3v-2z"
                            fill="#919191"
                            mask="url(#path-37-inside-5_1_130)"
                        />
                    </g>
                    <rect
                        id="nfc-main"
                        x={72}
                        y={226}
                        width={36}
                        height={20}
                        rx={3}
                        stroke="#919191"
                        strokeWidth={2}
                    />
                </g>
            </g>
        </svg>
    )
}

export default GamepadSVG
