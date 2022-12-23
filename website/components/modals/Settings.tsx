import { DetailedHTMLProps, HTMLAttributes, InputHTMLAttributes, MouseEventHandler } from "react";
import { IconEditCircleOff, IconX } from "@tabler/icons";

import { Button } from "components/Button";
import cn from "classnames";

interface SettingsModalInputProps extends DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> {
    title: string
    description: string
    unit?: string
}

const SettingsModalInput = ({ title, description, unit, className, ...props }: SettingsModalInputProps) => {
    return <div className={cn("flex flex-col gap-2", className)}
        // @ts-ignore
        dataStyle="display: flex; flex-direction: column;">
        <div className="flex flex-col"
            // @ts-ignore
            dataStyle="display: flex; flex-direction: column;">
            <h3 className="text-xl font-semibold">{title}</h3>
            <i>{description}</i>
        </div>
        <div>
            <input className={cn("p-2 border rounded", {
                "pr-8": unit
            })} type="number" {...props} />
            {unit && <span className="-ml-7">{unit}</span>}
        </div>
    </div>
}

export interface SettingsModalProps extends HTMLAttributes<HTMLDivElement> {
    onClose?: MouseEventHandler<HTMLButtonElement> | undefined
}

export const SettingsModal = ({ className, onClose, ...props }: SettingsModalProps) => {
    return <div className={cn("flex flex-col bg-white rounded-lg p-8 gap-10 w-[50vw] modal-dialog absolute bg-opacity-80 border", className)}
        // @ts-ignore
        dataStyle="display: flex; flex-direction: column;">
        <div className="flex flex-row justify-between"
            // @ts-ignore
            dataStyle="display: flex; flex-direction: row;">
            <h2 className="text-3xl font-semibold">Settings</h2>
            <Button Icon={IconX} onClick={onClose} />
        </div>
        <div className="flex gap-14 flex-wrap"
            // @ts-ignore
            dataStyle="display: flex;">
            <div className="flex flex-col gap-3"
                // @ts-ignore
                dataStyle="display: flex; flex-direction: column;">
                <h3 className="text-xl font-semibold">Joysticks</h3>
                <Button Icon={IconEditCircleOff} onClick={() => {
                    window.localStorage.removeItem("right-stick");
                    window.localStorage.removeItem("left-stick");
                }}>Reset Joysticks</Button>
            </div>
            <SettingsModalInput title="Refresh Rate" description="This is the inputs data update frequency" unit="ms" />
            <SettingsModalInput title="DSU Port" description="This is the port used by the DSU server" readOnly value="5000" />
        </div>
    </div>
}