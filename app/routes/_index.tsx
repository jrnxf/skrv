import type { MetaFunction } from "@remix-run/node";
import { toast } from "sonner";
import { ModeToggle } from "~/components/mode-toggle";
import { Button } from "~/components/ui/button";
import { Toaster } from "~/components/ui/sonner";

export const meta: MetaFunction = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export default function Index() {
  return (
    <div>
      <h1 className="text-3xl">skrv</h1>
      <Button onClick={() => toast(Date.now())}>click me!</Button>
      <ModeToggle />
      <Toaster />
    </div>
  );
}
