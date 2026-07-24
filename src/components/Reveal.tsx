"use client";

import { createElement } from "react";
import { useReveal } from "@/hooks/useReveal";

type RevealProps<T extends React.ElementType> = {
  as?: T;
  children?: React.ReactNode;
} & Omit<React.ComponentPropsWithoutRef<T>, "as" | "children">;

export default function Reveal<T extends React.ElementType = "div">({
  as,
  className,
  children,
  ...rest
}: RevealProps<T>) {
  const ref = useReveal<HTMLElement>();
  return createElement(
    as ?? "div",
    {
      ref,
      className: className ? `al-rev ${className}` : "al-rev",
      ...rest,
    },
    children,
  );
}
