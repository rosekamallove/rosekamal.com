import { MermaidDiagram } from "./MermaidDiagram";
import type { MDXComponents } from "mdx/types";

export function getMDXComponents(): MDXComponents {
  return {
    MermaidDiagram,
  };
}
