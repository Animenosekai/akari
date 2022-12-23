import * as React from "react"

const StickRight = ({ ...props }) => {
    return (
        <svg
            width={100}
            height={100}
            viewBox="0 0 100 100"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            {...props}
        >
            <circle
                cx={49.5}
                cy={50.5}
                r={32}
                fill="#F5F5F5"
                stroke="#19C0D7"
                strokeWidth={3}
            />
            <circle
                cx={69.5}
                cy={50.5}
                r={23}
                fill="#fff"
                stroke="#19C0D7"
                strokeWidth={3}
            />
            <circle
                cx={69.5}
                cy={50.5}
                r={15.5}
                fill="#fff"
                stroke="#19C0D7"
                strokeWidth={2}
            />
        </svg>
    )
}

export default StickRight
