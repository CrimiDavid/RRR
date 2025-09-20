"use client";

import React from "react";
import List from "@/components/discover/list";
import Sort from "@/components/discover/sort-button";
import { Switch } from "@/components/discover/switch";
import { useRepos } from "@/hooks/useList";

export default function ListManager() {
  const [page, setPage] = React.useState<number>(1);
  const [selection, setSelection] = React.useState<string[]>(["likes", "desc"]);
  const [value, setValue] = React.useState<string | null>(null);

  // get list data
  const { data } = useRepos(page, selection, value);

  const onSort = (value: string[]) => {
    setSelection(value);
    setPage(1);
  };
  const onClick = (name: string) => {
    setValue(() => {
      if (name === value) {
        return null;
      } else {
        return name;
      }
    });
  };
  return (
    <div>
      <div className={"flex space-x-2 items-center"}>
        <Switch value={value} onClick={onClick} options={["UI", "HOOKS"]} />
        <Sort onSort={onSort} />
      </div>

      <List data={data} page={page} setPage={setPage} />
    </div>
  );
}
