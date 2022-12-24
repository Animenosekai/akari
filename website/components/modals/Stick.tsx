import { HTMLAttributes, MouseEventHandler, useEffect, useState } from "react";

import { BezierEditor } from "bezier-editor";
import { Button } from "components/Button";
import { IconX } from "@tabler/icons";
import { Output } from "lib/output";
import StickDown from "components/svg/sticks/StickDown";
import StickLeft from "components/svg/sticks/StickLeft";
import StickRight from "components/svg/sticks/StickRight";
import StickUp from "components/svg/sticks/StickUp";
import cn from "classnames";

export interface StickModalProps extends HTMLAttributes<HTMLDivElement> {
    output: Output
    stick: "right" | "left"
    onClose?: MouseEventHandler<HTMLButtonElement> | undefined
}

export interface StickDataDirection {
    x1: number
    y1: number
    x2: number
    y2: number
}

export interface StickData {
    up: StickDataDirection
    right: StickDataDirection
    down: StickDataDirection
    left: StickDataDirection
}

export const defaultDataDirection: StickDataDirection = {
    x1: 0.25,
    y1: 0.25,
    x2: 0.75,
    y2: 0.75
}

export const defaultData: StickData = {
    up: defaultDataDirection,
    right: defaultDataDirection,
    down: defaultDataDirection,
    left: defaultDataDirection
}

export const StickModal = ({ stick, className, output, onClose, ...props }: StickModalProps) => {
    const [data, setData] = useState<StickData>(defaultData);

    useEffect(() => {
        try {
            const localData = window.localStorage.getItem(`${stick}-stick`);
            if (!localData) {
                throw Error("There is no data in LocalStorage");
            }
            var newData: any = JSON.parse(localData)
        } catch {
            var newData: any = defaultData;
        }
        setData(newData);
    }, [stick])

    useEffect(() => {
        window.localStorage.setItem(`${stick}-stick`, JSON.stringify(data))
    }, [data, stick])

    return <div className={cn("flex flex-col bg-white w-max rounded-lg p-8 gap-10 modal-dialog absolute bg-opacity-80 border", className)} style={{
        maxWidth: "98vw"
    }}
        // @ts-ignore
        {...{
        "data-style": "display: flex; flex-direction: column;"
    }}
    >
        <div className="flex flex-row justify-between"
            // @ts-ignore
            {...{
        "data-style": "display: flex; flex-direction: row;"
    }}>
            <div className="flex flex-col"
                // @ts-ignore
                {...{
        "data-style": "display: flex; flex-direction: column;"
    }}>
                <h2 className="text-3xl font-semibold">{`${stick === "right" ? "Right" : "Left"} Joystick Settings`}</h2>
                <i>{`Here are the settings for the ${stick} joystick`}</i>
            </div>
            <Button Icon={IconX} onClick={onClose} />
        </div>
        <div className="flex flex-row flex-wrap justify-between overflow-auto scrollbar-hide gap-4" style={{
            maxHeight: "60vh"
        }}
            // @ts-ignore
            {...{
        "data-style": "display: flex; flex-direction: row;"
    }}
        >
            <fieldset className="border-2 rounded ">
                <legend className="mx-auto"><StickUp /></legend>
                <BezierEditor value={[data.up.x1, data.up.y1, data.up.x2, data.up.y2]} progress={
                    Math.max(output.sticks[stick].y, 0)
                } />
            </fieldset>
            <fieldset className="border-2 rounded">
                <legend className="mx-auto"><StickRight /></legend>
                <BezierEditor value={[data.right.x1, data.right.y1, data.right.x2, data.right.y2]} progress={
                    Math.max(output.sticks[stick].x, 0)
                } />
            </fieldset>
            <fieldset className="border-2 rounded">
                <legend className="mx-auto"><StickDown /></legend>
                <BezierEditor value={[data.down.x1, data.down.y1, data.down.x2, data.down.y2]} progress={
                    Math.max(-output.sticks[stick].y, 0)
                } />
            </fieldset>
            <fieldset className="border-2 rounded">
                <legend className="mx-auto"><StickLeft /></legend>
                <BezierEditor value={[data.left.x1, data.left.y1, data.left.x2, data.left.y2]} progress={
                    Math.max(-output.sticks[stick].y, 0)
                } />
            </fieldset>
        </div>
    </div>
}