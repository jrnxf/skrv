import React from "react";
import * as Primitive from "~/components/ui/avatar";
import { Nullable } from "~/lib/types";
import { cn } from "~/lib/utils";

export const Avatar = React.forwardRef<
  React.ElementRef<typeof Primitive.Avatar>,
  {
    src: Nullable<string>;
    name: string;
  } & React.ComponentPropsWithoutRef<typeof Primitive.Avatar>
>(({ src, name, className }, ref) => (
  <Primitive.Avatar className={cn("h-12 w-12 shrink-0", className)} ref={ref}>
    {src && (
      <Primitive.AvatarImage
        className="h-full w-full rounded-full object-cover"
        src={src}
      />
    )}
    <Primitive.AvatarFallback className="flex h-full w-full items-center justify-center rounded-full text-sm dark:bg-zinc-800">
      {name.charAt(0)}
    </Primitive.AvatarFallback>
  </Primitive.Avatar>
));

Avatar.displayName = Primitive.Avatar.displayName;
