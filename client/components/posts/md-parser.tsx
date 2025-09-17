"use client";
import React from "react";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypePrism from "rehype-prism-plus";
// keep your prism CSS import
import "prismjs/themes/prism-tomorrow.css";
import "./style.css";

export function Demo({ markdown }) {
  return (
    <div className="markdown-body">
      <Markdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypePrism]}>
        {markdown}
      </Markdown>
    </div>
  );
}
