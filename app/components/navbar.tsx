import { Link, NavLink } from "@remix-run/react";
import { Logo } from "~/components/logo";
import { ModeToggle } from "~/components/mode-toggle";
import { buttonVariants } from "~/components/ui/button";
import { cn } from "~/lib/utils";

export function Navbar() {
  return (
    <nav className="relative flex h-12 items-center justify-center gap-4">
      <Link
        to="/"
        className="outline-ring absolute left-0 mb-4 mt-2 rounded-sm outline-offset-8 dark:outline-transparent"
      >
        <Logo className="ml-4 mt-2  w-[60px] max-w-[100px] sm:w-[80px]" />
      </Link>
      <NavLink
        to="/users"
        className={({ isActive }) =>
          cn(
            buttonVariants({
              variant: isActive ? "secondary" : "ghost",
              size: "xs",
              className: "justify-start",
            }),
          )
        }
      >
        Users
      </NavLink>

      <NavLink
        to="/posts"
        className={({ isActive }) =>
          cn(
            buttonVariants({
              variant: isActive ? "secondary" : "ghost",
              size: "xs",
              className: "justify-start",
            }),
          )
        }
      >
        Posts
      </NavLink>

      <NavLink
        to="/chat"
        className={({ isActive }) =>
          cn(
            buttonVariants({
              variant: isActive ? "secondary" : "ghost",
              size: "xs",
              className: "justify-start",
            }),
          )
        }
      >
        Chat
      </NavLink>

      <NavLink
        to="/login"
        className={({ isActive }) =>
          cn(
            buttonVariants({
              variant: isActive ? "secondary" : "ghost",
              size: "xs",
              className: "justify-start",
            }),
          )
        }
      >
        Login
      </NavLink>

      <ModeToggle />
    </nav>
  );
}
