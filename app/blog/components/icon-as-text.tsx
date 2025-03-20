import React from "react";
import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

const IconAsText = React.forwardRef<
  React.ElementRef<LucideIcon>,
  React.ComponentPropsWithoutRef<LucideIcon> & { icon: LucideIcon }
>(({ icon, className, ...props }, ref) => {
  const Icon = icon;
  return (
    <Icon
      className={cn("inline h-[1em] w-[1em]", className)}
      {...props}
      ref={ref}
    />
  );
});

IconAsText.displayName = "IconAsText";

export { IconAsText };
