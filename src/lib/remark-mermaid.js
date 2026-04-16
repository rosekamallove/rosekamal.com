import { visit } from "unist-util-visit";

/**
 * Transforms ```mermaid fenced blocks into <MermaidDiagram chart="..." />
 * MDX JSX so they pass through rehype-pretty-code untouched.
 */
export default function remarkMermaid() {
  return (tree) => {
    visit(tree, "code", (node, index, parent) => {
      if (node.lang !== "mermaid" || index == null || !parent) return;

      const chart = node.value;

      parent.children.splice(index, 1, {
        type: "mdxJsxFlowElement",
        name: "MermaidDiagram",
        attributes: [
          { type: "mdxJsxAttribute", name: "chart", value: chart },
        ],
        children: [],
      });
    });
  };
}
