"use client";

import { TbFishHook } from "react-icons/tb";
import { FaPaintBrush } from "react-icons/fa";
import Link from "next/link";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import React from "react";

interface ListProps {
  page: number;
  data: any;
  setPage: (page: number) => void;
}

const List = ({ page, data, setPage }: ListProps) => {
  const [isPreviousData, startTransition] = React.useTransition();

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
            {data.posts.map((item: any, index: number) => {
              const href = `/${item.creator._id}/${item.name}`;
              return (
                <TableRow key={index} className="hover:bg-muted">
                  <TableCell>
                    <Link
                      href={href}
                      className="flex items-center gap-2 align-top"
                    >
                      {item.type === "UI" ? (
                        <FaPaintBrush strokeWidth={2} size={25} />
                      ) : (
                        <TbFishHook strokeWidth={2} size={25} />
                      )}
                    </Link>
                  </TableCell>

                  <TableCell className="hidden md:table-cell">
                    <Link href={href}>{item.name}</Link>
                  </TableCell>

                  <TableCell className="pl-0 align-top md:pl-4">
                    <Link href={href} className="flex flex-col gap-2">
                      <p className="text-sm text-muted-foreground md:text-primary">
                        {item.description}
                      </p>
                    </Link>
                  </TableCell>

                  <TableCell className="hidden text-right md:table-cell">
                    <Link href={href}>{item.likes}</Link>
                  </TableCell>

                  <TableCell className="hidden text-left md:table-cell">
                    <Link href={href}>{item.creator.name}</Link>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>

        <hr />

        <footer className="mt-2 flex w-full justify-center space-x-2">
          {page > 1 && (
            <button
              className="hover:cursor-pointer hover:text-yellow-500"
              style={{ opacity: isPreviousData ? 0.5 : 1 }}
              onClick={() => {
                startTransition(() => setPage((p) => p - 1));
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
              className="hover:cursor-pointer hover:text-yellow-500"
              style={{ opacity: isPreviousData ? 0.5 : 1 }}
              disabled={isPreviousData}
              onClick={() => {
                startTransition(() => setPage((prev) => prev + 1));
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
