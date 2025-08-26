"use client";

import React from "react";
import { List } from "@/components/discover/list";

export default function ListManager() {
    const [page, setPage] = React.useState<number>(1);

    return <List page={page} setPage={setPage} />;
}
