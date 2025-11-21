import { cn } from "@/lib/utils";
import React from "react";

export function Wrapper({ children, className }) {
  return (
    <div
      className={cn(
        "mx-auto h-full w-full max-w-screen-xl px-4 md:px-0",
        className
      )}
    >
      {children}
    </div>
  );
}
