"use client";

import React, {useCallback} from "react";
import List  from "@/components/discover/list";
import Sort from "@/components/discover/sort-button";
import {Switch} from "@/components/discover/switch";
import {useRepos} from "@/hooks/useList";
import {useSession} from "@/hooks/use-session";

export default function ListManager() {
    const [page, setPage] = React.useState<number>(1);
    const [selection, setSelection] = React.useState<string[]>(['likes', 'desc'])
    const [value, setValue] = React.useState<string | null>(null)
    const session = useSession()
    console.log(session)
    // get list data
    const {data} = useRepos(page, selection, value)

    const onSort = (value: string[]) => {
        setSelection(value)
        setPage(1)
    }
    const onClick = (name: string): void => {
        setValue(() : string | null => {
            if (name === value) {
                return null
            } else {
                return name;
            }
        });
    }
    return (
        <div>
            <div className={"flex space-x-2 items-center"}>
                <Switch value={value} onClick={onClick}/>
                <Sort onSort={onSort}/>
            </div>

            <List data={data} page={page} setPage={setPage}/>
        </div>
    )
}
