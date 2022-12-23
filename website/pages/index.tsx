import { IconFileDescription, IconSettings } from '@tabler/icons'
import { useEffect, useState } from "react"

import { Button } from 'components/Button'
import { DebugModal } from 'components/modals/Debug'
import GamepadSVG from 'components/svg/Gamepad'
import Head from 'next/head'
import { SettingsModal } from 'components/modals/Settings'
import { StickModal } from 'components/modals/Stick'
import WiiUGamepad from "lib/models";
import cn from "classnames";
import { defaultOutput } from 'lib/output'
import flexibility from "lib/flexibility"

export default function Home() {
    const [connected, setConnected] = useState<boolean>(false);
    const [currentModal, setCurrentModal] = useState<"settings" | "l-stick" | "r-stick" | "debug" | null>(null);
    const [output, setOutput] = useState(defaultOutput);
    const [currentPage, setCurrentPage] = useState(0); // a neat way to handle the B-button

    useEffect(() => {
        window.history.pushState({}, '', "#" + currentPage.toString());
    }, [currentPage])

    useEffect(() => {
        flexibility(document.body)
        console.log("Welcome to the Wii U Dev Tools 🍡")

        window.history.pushState({}, '', "#0");
        const GamepadInstance = WiiUGamepad.listen(100);
        GamepadInstance.onupdate = function () {
            setCurrentPage(p => p + 1)
            setOutput(GamepadInstance)
        }

        // Create WebSocket connection.
        const socket = new WebSocket('ws://' + window.location.host + "/akari");

        // Connection opened
        socket.addEventListener('open', function (event) {
            window.history.pushState({}, '', "#0");
            const GamepadInstance = WiiUGamepad.listen(100);
            setConnected(true);
            GamepadInstance.onupdate = function () {
                setCurrentPage(p => p + 1)
                socket.send(JSON.stringify(GamepadInstance, null, 4));
                setOutput(GamepadInstance)
                // output.textContent = JSON.stringify(GamepadInstance, null, 4)
            }
        });

        // Listen for messages
        socket.addEventListener('message', function (event) {
            // console.log('Message from server ', event.data);
        });
        return () => {
            socket.close()
        }
    }, [])

    return (
        <>
            <Head>
                <title>Akari</title>
                <meta name="description" content="Use your Wii U Gamepad as a DSU controller" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <main className="p-5 flex flex-col gap-5 min-h-screen w-full"
                // @ts-ignore
                dataStyle="display: flex; flex-direction: column;">
                <h1 className="text-3xl font-semibold">Welcome to Akari!</h1>

                <div className={cn("pointer-events-none opacity-0 fixed z-10 w-screen h-screen left-0 top-0 transition duration-300 bg-white modal", {
                    "opacity-100 pointer-events-auto bg-opacity-[rgba(255, 255, 255, 0.5)] center": currentModal
                })} style={{

                }}>
                    {/* Modals */}
                    {
                        currentModal === "settings"
                            ? <SettingsModal onClose={() => setCurrentModal(null)} />
                            : currentModal === "debug"
                                ? <DebugModal output={output} onClose={() => setCurrentModal(null)} />
                                : currentModal === "r-stick"
                                    ? <StickModal stick="right" output={output} onClose={() => setCurrentModal(null)} />
                                    : currentModal === "l-stick"
                                        ? <StickModal stick='left' output={output} onClose={() => setCurrentModal(null)} />
                                        : <></>
                    }
                </div>

                <div className='flex flex-row gap-3'
                    // @ts-ignore
                    dataStyle="display: flex; flex-direction: row;">
                    <Button Icon={IconSettings} onClick={() => setCurrentModal("settings")}>Settings</Button>
                    <Button Icon={IconFileDescription} onClick={() => setCurrentModal("debug")}>Raw Output</Button>
                </div>

                <div className='flex flex-col items-center m-10'
                    // @ts-ignore
                    dataStyle="display: flex; flex-direction: column;">
                    <GamepadSVG output={output} onLeftStickClick={() => setCurrentModal("l-stick")} onRightStickClick={() => setCurrentModal("r-stick")} />
                </div>

                <div className="flex flex-row justify-between"
                    // @ts-ignore
                    dataStyle="display: flex; flex-direction: row;">
                    {/* footer */}
                    <div className='flex flex-row items-center gap-2'
                        // @ts-ignore
                        dataStyle="display: flex; flex-direction: row;">
                        {/* circle */}
                        <div className={cn('h-4 w-4 block rounded-full', {
                            "bg-red-500": !connected,
                            "bg-green-500": connected
                        })}></div>
                        <span>{connected ? "Connected" : "Not Connected"}</span>
                    </div>

                    <div>
                        <span>🍡 Animenosekai, 2022</span>
                    </div>

                </div>

            </main>
        </>
    )
}
