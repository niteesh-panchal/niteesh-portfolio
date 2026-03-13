"use client";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useCallback, useRef } from "react";

export const Suggestions = ({ className, children, ...props }) => {
  const ref = useRef(null);

  const handleWheel = (e) => {
    if (!ref.current) return;

    const el = ref.current;
    const canScrollHorizontally = el.scrollWidth > el.clientWidth;

    if (!canScrollHorizontally) return;

    e.preventDefault();
    el.scrollLeft += e.deltaY;
  };

  return (
    <div
      ref={ref}
      onWheel={handleWheel}
      className="overflow-x-auto whitespace-nowrap
[&::-webkit-scrollbar]:hidden
[-ms-overflow-style:none]
[scrollbar-width:none]"
      {...props}
    >
      <div
        className={cn(
          "flex w-max flex-nowrap items-center gap-2 select-none",
          className,
        )}
      >
        {children}
      </div>
    </div>
  );
};

export const Suggestion = ({
  suggestion,
  onClick,
  className,
  variant = "outline",
  size = "sm",
  children,
  ...props
}) => {
  const handleClick = useCallback(() => {
    onClick?.(suggestion);
  }, [onClick, suggestion]);

  return (
    <Button
      className={cn(
        "shrink-0 select-none cursor-pointer rounded-full px-4",
        className,
      )}
      onClick={handleClick}
      size={size}
      type="button"
      variant={variant}
      {...props}
    >
      {children || suggestion}
    </Button>
  );
};
