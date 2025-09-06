"use client"

import React from "react"
import { TbFishHook } from "react-icons/tb";
import { FaPaintBrush } from "react-icons/fa";

interface SwitchProps {
    value: string | null,
    onClick: (value: string) => void
}
export function Switch({value, onClick} : SwitchProps) {


    return (
        <div className="border b-2 p-2">
            <div className={"flex"}>
                <SwitchButton name={"UI"} onClick={onClick} current={value}/>
                <SwitchButton name={"HOOK"} onClick={onClick} current={value}/>
            </div>

        </div>
    )
}

interface SwitchButtonProps {
    name: string,
    onClick: (value: string) => void,
    current: string | null
}
function SwitchButton({ name, onClick, current }: SwitchButtonProps) {
    const selected = name === current;

    return selected ? (
        <h1 onClick={() => onClick(name)} className="border b-2 p-1 font-bold bg-red-500">{name}</h1>
    ) : (
        <h1 onClick={() => onClick(name)}  className="border b-2 p-1 ">{name}</h1>
    );
}
