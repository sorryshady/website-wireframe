import React from "react";
import { cva } from "class-variance-authority";
import { cn } from "@/lib/utils";

export const typographyVariants = cva("", {
  variants: {
    as: {
      h1: "scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl mt-8",
      h2: "scroll-m-20 text-3xl font-semibold tracking-tight first:mt-0 mt-8",
      h3: "scroll-m-20 text-2xl font-semibold tracking-tight first:mt-0 mt-8",
      h4: "scroll-m-20 text-xl font-semibold tracking-tight first:mt-0 mt-8",
      p: "text-base leading-7 first:mt-0 mt-6",
      blockquote: "mt-6 border-l-2 pl-6 italic text-muted-foreground",
      table: "mt-6 w-full",
      thead: "",
      tr: "m-0 border-t p-0 even:bg-muted",
      th: "border px-4 py-2 text-left font-bold [&[align=center]]:text-center [&[align=right]]:text-right",
      tbody: "",
      td: "border px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right",
      ul: "my-6 ml-6 list-disc [&>li]:mt-2",
      ol: "my-6 ml-6 list-decimal [&>li]:mt-2",
      code: "relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm font-medium",
      a: "transition-colors opacity-60 hover:opacity-100 group-hover/link:opacity-100",

      lead: "text-xl text-muted-foreground",
      large: "text-lg font-semibold",
      small: "text-sm font-medium leading-none",
      muted: "text-sm text-muted-foreground",
    },
  },
});

const H1 = React.forwardRef<
  React.ComponentRef<"h1">,
  React.ComponentPropsWithoutRef<"h1">
>(({ className, ...props }, ref) => {
  return (
    <h1
      className={cn(typographyVariants({ as: "h1" }), className)}
      {...props}
      ref={ref}
    />
  );
});
H1.displayName = "H1";

const H2 = React.forwardRef<
  React.ComponentRef<"h2">,
  React.ComponentPropsWithoutRef<"h2">
>(({ className, ...props }, ref) => {
  return (
    <h2
      className={cn(typographyVariants({ as: "h2" }), className)}
      {...props}
      ref={ref}
    />
  );
});
H2.displayName = "H2";

const H3 = React.forwardRef<
  React.ComponentRef<"h3">,
  React.ComponentPropsWithoutRef<"h3">
>(({ className, ...props }, ref) => {
  return (
    <h3
      className={cn(typographyVariants({ as: "h3" }), className)}
      {...props}
      ref={ref}
    />
  );
});
H3.displayName = "H3";

const H4 = React.forwardRef<
  React.ComponentRef<"h4">,
  React.ComponentPropsWithoutRef<"h4">
>(({ className, ...props }, ref) => {
  return (
    <h4
      className={cn(typographyVariants({ as: "h4" }), className)}
      {...props}
      ref={ref}
    />
  );
});
H4.displayName = "H4";

const Table = React.forwardRef<
  React.ComponentRef<"table">,
  React.ComponentPropsWithoutRef<"table">
>(({ className, ...props }, ref) => {
  return (
    <table
      className={cn(typographyVariants({ as: "table" }), className)}
      {...props}
      ref={ref}
    />
  );
});
Table.displayName = "Table";

const Tbody = React.forwardRef<
  React.ComponentRef<"tbody">,
  React.ComponentPropsWithoutRef<"tbody">
>(({ className, ...props }, ref) => {
  return (
    <tbody
      className={cn(typographyVariants({ as: "tbody" }), className)}
      {...props}
      ref={ref}
    />
  );
});
Tbody.displayName = "Tbody";

const Td = React.forwardRef<
  React.ComponentRef<"td">,
  React.ComponentPropsWithoutRef<"td">
>(({ className, ...props }, ref) => {
  return (
    <td
      className={cn(typographyVariants({ as: "td" }), className)}
      {...props}
      ref={ref}
    />
  );
});
Td.displayName = "Td";

const Thead = React.forwardRef<
  React.ComponentRef<"thead">,
  React.ComponentPropsWithoutRef<"thead">
>(({ className, ...props }, ref) => {
  return (
    <thead
      className={cn(typographyVariants({ as: "thead" }), className)}
      {...props}
      ref={ref}
    />
  );
});
Thead.displayName = "Thead";

const Th = React.forwardRef<
  React.ComponentRef<"th">,
  React.ComponentPropsWithoutRef<"th">
>(({ className, ...props }, ref) => {
  return (
    <th
      className={cn(typographyVariants({ as: "th" }), className)}
      {...props}
      ref={ref}
    />
  );
});
Th.displayName = "Th";

const Tr = React.forwardRef<
  React.ComponentRef<"tr">,
  React.ComponentPropsWithoutRef<"tr">
>(({ className, ...props }, ref) => {
  return (
    <tr
      className={cn(typographyVariants({ as: "tr" }), className)}
      {...props}
      ref={ref}
    />
  );
});
Tr.displayName = "Tr";

const Blockquote = React.forwardRef<
  React.ComponentRef<"blockquote">,
  React.ComponentPropsWithoutRef<"blockquote">
>(({ className, ...props }, ref) => {
  return (
    <blockquote
      className={cn(typographyVariants({ as: "blockquote" }), className)}
      {...props}
      ref={ref}
    />
  );
});
Blockquote.displayName = "Blockquote";

const P = React.forwardRef<
  React.ComponentRef<"p">,
  React.ComponentPropsWithoutRef<"p">
>(({ className, ...props }, ref) => {
  return (
    <p
      className={cn(typographyVariants({ as: "p" }), className)}
      {...props}
      ref={ref}
    />
  );
});
P.displayName = "P";

const Ul = React.forwardRef<
  React.ComponentRef<"ul">,
  React.ComponentPropsWithoutRef<"ul">
>(({ className, ...props }, ref) => {
  return (
    <ul
      className={cn(typographyVariants({ as: "ul" }), className)}
      {...props}
      ref={ref}
    />
  );
});
Ul.displayName = "Ul";

const Ol = React.forwardRef<
  React.ComponentRef<"ol">,
  React.ComponentPropsWithoutRef<"ol">
>(({ className, ...props }, ref) => {
  return (
    <ol
      className={cn(typographyVariants({ as: "ol" }), className)}
      {...props}
      ref={ref}
    />
  );
});
Ol.displayName = "Ol";

const Code = React.forwardRef<
  React.ComponentRef<"code">,
  React.ComponentPropsWithoutRef<"code">
>(({ className, ...props }, ref) => {
  return (
    <code
      className={cn(typographyVariants({ as: "code" }), className)}
      {...props}
      ref={ref}
    />
  );
});
Code.displayName = "Code";

export {
  P,
  H1,
  H2,
  H3,
  H4,
  Blockquote,
  Table,
  Thead,
  Th,
  Tr,
  Tbody,
  Td,
  Ul,
  Ol,
  Code,
};
