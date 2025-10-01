import * as React from "react"
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  MoreHorizontalIcon,
} from "lucide-react"

import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"
import { Link } from "@inertiajs/react"

function Pagination({ className, ...props }: React.ComponentProps<"nav">) {
  return (
    <nav
      role="navigation"
      aria-label="pagination"
      data-slot="pagination"
      className={cn("mx-auto flex w-full justify-center", className)}
      {...props}
    />
  )
}

function PaginationContent({
  className,
  ...props
}: React.ComponentProps<"ul">) {
  return (
    <ul
      data-slot="pagination-content"
      className={cn("flex flex-row items-center gap-1", className)}
      {...props}
    />
  )
}

function PaginationItem({ ...props }: React.ComponentProps<"li">) {
  return <li data-slot="pagination-item" {...props} />
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type PaginationLinkProps = any & {
  isActive?: boolean
  size?: "icon" | "default"
}

function PaginationLink({
  className,
  isActive,
  size = "icon",
  ...props
}: PaginationLinkProps) {
  return (
    <Link
      preserveScroll
      aria-current={isActive ? "page" : undefined}
      data-slot="pagination-link"
      data-active={isActive}
      disabled={!props.href}
      className={cn(
        buttonVariants({
          variant: isActive ? "outline" : "ghost",
          size,
        }),
        className
      )}
      {...props}
    />
  )
}

function PaginationPrevious({
  className,
  ...props
}: React.ComponentProps<typeof PaginationLink>) {
  return (
    <PaginationLink
      aria-label="Go to previous page"
      size="default"
      className={cn("gap-1 px-2.5 sm:pl-2.5", className)}
      {...props}
    >
      <ChevronLeftIcon />
      <span className="hidden sm:block">Previous</span>
    </PaginationLink>
  )
}

function PaginationNext({
  className,
  ...props
}: React.ComponentProps<typeof PaginationLink>) {
  return (
    <PaginationLink
      aria-label="Go to next page"
      size="default"
      className={cn("gap-1 px-2.5 sm:pr-2.5", className)}
      {...props}
    >
      <span className="hidden sm:block">Next</span>
      <ChevronRightIcon />
    </PaginationLink>
  )
}

function PaginationEllipsis({
  className,
  ...props
}: React.ComponentProps<"span">) {
  return (
    <span
      aria-hidden
      data-slot="pagination-ellipsis"
      className={cn("flex size-9 items-center justify-center", className)}
      {...props}
    >
      <MoreHorizontalIcon className="size-4" />
      <span className="sr-only">More pages</span>
    </span>
  )
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const PaginationComponent = ({ links }: { links: any[] }) => {
  return (
      <Pagination>
          <PaginationContent>
              {links.map((link, index) => {
                  if (link.label === '&laquo; Previous') {
                      return (
                          <PaginationItem key={index}>
                              <PaginationPrevious href={link.url || '#'} aria-disabled={!link.url} />
                          </PaginationItem>
                      );
                  } else if (link.label === 'Next &raquo;') {
                      return (
                          <PaginationItem key={index}>
                              <PaginationNext href={link.url || '#'} aria-disabled={!link.url} />
                          </PaginationItem>
                      );
                  } else if (link.label === '...') {
                      return (
                          <PaginationItem key={index}>
                              <PaginationEllipsis />
                          </PaginationItem>
                      );
                  } else {
                      return (
                          <PaginationItem key={index}>
                              <PaginationLink
                                  href={link.url || '#'}
                                  isActive={link.active}
                                  dangerouslySetInnerHTML={{ __html: link.label }}
                              />
                          </PaginationItem>
                      );
                  }
              })}
          </PaginationContent>
      </Pagination>
  );
};

export {
  Pagination,
  PaginationContent,
  PaginationLink,
  PaginationItem,
  PaginationPrevious,
  PaginationNext,
  PaginationEllipsis,
  PaginationComponent
}
