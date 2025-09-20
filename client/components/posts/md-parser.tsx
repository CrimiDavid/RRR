"use client";
import React from "react";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypePrism from "rehype-prism-plus";
import { Switch } from "@/components/discover/switch";
import "prismjs/themes/prism-tomorrow.css";
import { Favorite } from "@/components/posts/favorite-star";
import "./style.css";

interface MarkDownContentProps {
  markdown: string;
  code: string; // plain text
  language?: string; // optional, e.g. "tsx" | "js" | "py"
}

export function LeftContent({
  markdown,
  code,
  language = "tsx",
}: MarkDownContentProps) {
  const [tab, setTab] = React.useState("Readme");
  const onClick = (name: string) => setTab(name);

  // Use ~~~ fences to avoid conflicts if the code contains ```
  const fenced = `~~~${language}\n${code}\n~~~`;

  const source = tab === "Readme" ? markdown : fenced;

  return (
    <div>
      <div className="flex justify-between items-center">
        <Switch value={tab} onClick={onClick} options={["Readme", "Code"]} />
        <Favorite />
      </div>
      <div className="markdown-body">
        <Markdown
          remarkPlugins={[remarkGfm]}
          rehypePlugins={[[rehypePrism, { showLineNumbers: true }]]}
        >
          {source}
        </Markdown>
      </div>
    </div>
  );
}
