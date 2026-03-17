import { visit } from "unist-util-visit";
import type { Root, Code } from "mdast";
import type { Plugin } from "unified";

// Transforms ```mermaid code blocks into <MermaidDiagram chart="..." /> JSX
// so they pass through rehype-pretty-code untouched.
const remarkMermaid: Plugin<[], Root> = () => (tree) => {
  visit(tree, "code", (node: Code, index, parent) => {
    if (node.lang !== "mermaid" || index == null || !parent) return;

    const chart = node.value.replace(/`/g, "\\`").replace(/\$/g, "\\$");

    parent.children.splice(index, 1, {
      type: "mdxJsxFlowElement" as never,
      name: "MermaidDiagram",
      attributes: [
        {
          type: "mdxJsxAttribute",
          name: "chart",
          value: chart,
        },
      ],
      children: [],
    } as never);
  });
};

export default remarkMermaid;
