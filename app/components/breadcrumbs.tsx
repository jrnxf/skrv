import { Link } from "@remix-run/react";
import React from "react";
import { Button } from "~/components/ui/button";
import { cn } from "~/lib/utils";

export function Breadcrumbs({
  links,
  className,
}: { links: [string, string][] } & React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn("flex items-center gap-2  text-sm", className)}>
      {links.map(([link, text], idx) => {
        const isLast = idx === links.length - 1;
        return (
          <React.Fragment key={idx}>
            {isLast ? (
              <p className="px-2 py-1">{text}</p>
            ) : (
              <>
                <Button variant="ghost" asChild size="sm">
                  <Link to={link}>
                    <p>{text}</p>
                  </Link>
                </Button>
                <p>/</p>
              </>
            )}
          </React.Fragment>
        );
      })}
    </div>
  );
}
