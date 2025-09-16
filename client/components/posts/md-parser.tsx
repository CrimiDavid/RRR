"use client";
import React from "react";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypePrism from "rehype-prism-plus";
// keep your prism CSS import
import "prismjs/themes/prism-tomorrow.css";
import "./style.css";
import { useParams } from "next/navigation";

export function Demo() {
  const { creator, id } = useParams<{ creator: string; id: string }>();
  console.log(creator, id);
  const markdown = `
# Heading 1
## Heading 2
### Heading 3
#### Heading 4

---

**Bold text**  
*Italic text*  
***Bold & Italic***  
~~Strikethrough~~

---

> Blockquote with **bold** text  
>> Nested blockquote

---

- Unordered list item 1
- Unordered list item 2
  - Nested list item

1. Ordered list item 1
2. Ordered list item 2
   1. Nested ordered item

---

Inline code: \`const x = 42;\`

\`\`\`js
// Fenced code block with syntax highlighting
function greet(name) {
  return \`Hello, \${name}!\`;
}
\`\`\`

---

[Link to OpenAI](https://openai.com)  
![Alt text for image](https://via.placeholder.com/150)

---

| Column A | Column B | Column C |
|----------|----------|----------|
| Row 1    | Data     | More     |
| Row 2    | Data     | More     |

---

- [ ] Task list item (incomplete)
- [x] Task list item (complete)

---

**Inline HTML:**  
<span style="color:red;">This is red text (if supported)</span>
`;

  return (
    <div className="markdown-body">
      <Markdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypePrism]}>
        {markdown}
      </Markdown>
    </div>
  );
}
