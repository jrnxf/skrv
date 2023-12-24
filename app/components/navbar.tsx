import { Link, NavLink } from "@remix-run/react";
import { RemixNavLinkProps } from "@remix-run/react/dist/components";
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

      <NavOption to="/users">Users</NavOption>
      <NavOption to="/games">Games</NavOption>
      <NavOption to="/posts">Posts</NavOption>
      <NavOption to="/chat">Chat</NavOption>
      <NavOption to="/login">Login</NavOption>

      <ModeToggle />
    </nav>
  );
}

const NavOption = ({
  to,
  children,
}: React.PropsWithChildren<RemixNavLinkProps>) => (
  <NavLink
    to={to}
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
    {children}
  </NavLink>
);
