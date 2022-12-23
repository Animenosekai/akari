import { HTMLAttributes } from "react"
import { TablerIcon } from "@tabler/icons"
import cn from "classnames"

export interface ButtonProps extends HTMLAttributes<HTMLButtonElement> {
    Icon?: TablerIcon
}


export const Button = ({ Icon, children, className, ...props }: ButtonProps) => {
    return <button className={cn(
        "flex flex-row gap-2 bg-white rounded px-3 py-2 opacity-90 hover:opacity-100 active:opacity-70 scale-95 hover:scale-100 active:scale-95 transition duration-200 shadow-sm hover:shadow-md active:shadow-sm w-max h-max border",
        className,
    )}
    // @ts-ignore
    dataStyle="display: flex; flex-direction: row;"
    {...props}>
        {Icon && <Icon />}
        {children}
    </button >
}