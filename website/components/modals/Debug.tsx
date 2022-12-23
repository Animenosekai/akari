import { HTMLAttributes, MouseEventHandler } from "react";

import { Button } from "components/Button";
import { IconX } from "@tabler/icons";
import { Output } from "lib/output";
import cn from "classnames";

export interface DebugModalProps extends HTMLAttributes<HTMLDivElement> {
    output: Output
    onClose?: MouseEventHandler<HTMLButtonElement> | undefined
}

export const DebugModal = ({ className, output, onClose, ...props }: DebugModalProps) => {
    return <div className={cn("flex flex-col bg-white rounded-lg p-8 gap-10 w-[50vw] modal-dialog absolute bg-opacity-80 border text-left", className)}
    // @ts-ignore
    dataStyle="display: flex; flex-direction: column;">
        <div className="flex flex-row justify-between"
        // @ts-ignore
        dataStyle="display: flex; flex-direction: row;">
            <div className="flex flex-col"
            // @ts-ignore
            dataStyle="display: flex; flex-direction: column;">
                <h2 className="text-3xl font-semibold">Raw Output</h2>
                <i>This is the raw data sent to the computer</i>
            </div>
            <Button Icon={IconX} onClick={onClose} />
        </div>
        <pre className="bg-slate-100 p-4 overflow-auto rounded" style={{
            maxHeight: "60vh",
        }}>
            <code className="text-left whitespace-pre normal break-words">{JSON.stringify(output, null, 2)}</code>
        </pre>
    </div>
}