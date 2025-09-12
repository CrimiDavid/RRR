"use client";

import { TbFishHook } from "react-icons/tb";
import { FaPaintBrush } from "react-icons/fa";

import { useRouter } from "next/navigation";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  TableFooter,
} from "@/components/ui/table";

import React from "react";

interface ListProps {
  page: number;
  data: any;
  setPage: (page: number) => void;
}
const List = ({ page, data, setPage }: ListProps) => {
  console.log(data);
  const [isPreviousData, startTransition] = React.useTransition();
  const router = useRouter();
  console.log("rendering list");
  return (
    <section>
      <div className="container px-0">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead></TableHead>
              <TableHead className="hidden font-bold text-primary md:table-cell">
                Name
              </TableHead>
              <TableHead>
                <span className="hidden font-bold text-primary md:block">
                  Description
                </span>
                <span className="block font-bold text-primary md:hidden">
                  Project
                </span>
              </TableHead>
              <TableHead className="hidden text-right font-bold text-primary md:table-cell">
                Likes
              </TableHead>

              <TableHead className="hidden font-bold text-primary md:table-cell">
                Creator
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody style={{ opacity: isPreviousData ? 0.5 : 1 }}>
            {data.posts.map((item, index: number) => (
              <TableRow
                key={index}
                onClick={() =>
                  router.push(`/${item.creator.name}/${item._id.trim()}`)
                }
              >
                <TableCell className="">
                  <div className="flex items-center gap-2 align-top">
                    {item.type === "UI" ? (
                      <FaPaintBrush strokeWidth={2} size={25} />
                    ) : (
                      <TbFishHook strokeWidth={2} size={25} />
                    )}
                  </div>
                </TableCell>
                <TableCell className="hidden md:table-cell">
                  {item.name}
                </TableCell>
                <TableCell className="pl-0 align-top md:pl-4">
                  <div className="flex flex-col gap-2">
                    <p className="text-sm text-muted-foreground md:text-primary">
                      {item.description}
                    </p>
                  </div>
                </TableCell>
                <TableCell className="hidden text-right md:table-cell">
                  {item.likes}
                </TableCell>
                <TableCell className="hidden text-left md:table-cell">
                  {item.creator.name}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <hr />
        <footer className={"flex w-full justify-center mt-2 space-x-2"}>
          {page > 1 && (
            <button
              className={"hover:cursor-pointer hover:text-yellow-500"}
              style={{ opacity: isPreviousData ? 0.5 : 1 }}
              onClick={() => {
                startTransition(() => {
                  setPage((p) => p - 1);
                });
              }}
              disabled={isPreviousData || page === 1}
            >
              Previous
            </button>
          )}
          <span>
            Page {page} of {data.pages}
          </span>
          {page < data.pages && (
            <button
              className={"hover:cursor-pointer hover:text-yellow-500"}
              style={{ opacity: isPreviousData ? 0.5 : 1 }}
              disabled={isPreviousData}
              onClick={() => {
                startTransition(() => {
                  setPage((prev) => prev + 1);
                });
                console.log("clicked");
              }}
            >
              Next
            </button>
          )}
        </footer>
      </div>
    </section>
  );
};

export default React.memo(List);
