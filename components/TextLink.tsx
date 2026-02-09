import type { ReactNode } from "react";

interface TextLinkProps {
  href?: string;
  children: ReactNode;
}

export function TextLink({ href, children }: TextLinkProps) {
  if (!href) {
    return <span className="text-heading">{children}</span>;
  }

  return (
    <a href={href} className="text-heading" rel="noreferrer">
      {children}
    </a>
  );
}
