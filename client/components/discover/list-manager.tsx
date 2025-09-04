"use client";

import React from "react";
import List  from "@/components/discover/list";
import Sort from "@/components/discover/sort-button";
import {Switch} from "@/components/discover/switch";

export default function ListManager() {
    const [page, setPage] = React.useState<number>(1);
    const [selection, setSelection] = React.useState<string[]>(['likes', 'desc'])
    const [value, setValue] = React.useState("UI")

    const onSort = (value: string[]) => {
        setSelection(value)
        setPage(1)
    }
    const onClick = (name) => {
        setValue(() => {
            if (name === value) {
                return null
            } else {
                return name;
            }
        });
    }
    console.log(selection)
    return (
        <div>
            <div className={"flex space-x-2 items-center"}>
                <Switch value={value} onClick={onClick}/>
                <Sort onSort={onSort }/>
            </div>

            <List page={page} selection={selection} setPage={setPage}/>
        </div>
    )
}
