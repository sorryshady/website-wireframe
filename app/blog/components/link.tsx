"use client";

import React from "react";
import NextLink from "next/link";
import { MoveUpRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { useIsExternalLink } from "@/hooks/use-externalLink";
import { IconAsText } from "./icon-as-text";
import { typographyVariants } from "./typography";

function ExternalLinkIcon() {
  return (
    <IconAsText
      icon={MoveUpRight}
      className="transition-transform group-hover/link:-translate-y-[0.125rem] group-hover/link:translate-x-[0.125rem]"
    />
  );
}

const Link = React.forwardRef<
  React.ComponentRef<typeof NextLink>,
  React.ComponentPropsWithoutRef<typeof NextLink>
>(({ className, children, href, target, ...props }, ref) => {
  const isExternalLink = useIsExternalLink();

  const isExternal = isExternalLink(href);

  return (
    <NextLink
      href={href}
      className={cn(
        "group/link",
        typographyVariants({ as: "a" }),
        !isExternal &&
          "underline decoration-transparent underline-offset-4 duration-300 hover:decoration-inherit group-hover/link:decoration-inherit",
        className,
      )}
      target={target ? "_blank" : undefined}
      {...props}
      ref={ref}
    >
      {children}
      {isExternal && <ExternalLinkIcon />}
    </NextLink>
  );
});
Link.displayName = "Link";

export { Link, ExternalLinkIcon };
