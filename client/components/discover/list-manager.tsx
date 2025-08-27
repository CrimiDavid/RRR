"use client";

import React from "react";
import List  from "@/components/discover/list";
import Sort from "@/components/discover/sort-button";

export default function ListManager() {
    const [page, setPage] = React.useState<number>(1);
    const [selection, setSelection] = React.useState<string>('created')

    const onSort = (value: string) => {
        setSelection(value)
        setPage(1)
    }
    return (
        <div>
            <Sort value={selection} onSort={onSort}/>
            <List page={page} setPage={setPage}/>
        </div>
    )
}
