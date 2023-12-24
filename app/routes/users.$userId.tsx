import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { LoaderFunctionArgs, MetaFunction, json } from "@remix-run/node";
import { Link, useLoaderData } from "@remix-run/react";
import { USERS } from "api/users";
import React from "react";
import ReactCountryFlag from "react-country-flag";
import { Button } from "~/components/ui/button";
import { cn } from "~/lib/utils";

export const meta: MetaFunction = () => {
  return [
    { title: "skrrrt" },
    { name: "description", content: "a une commune" },
  ];
};

export async function loader({ request, params }: LoaderFunctionArgs) {
  // TODO actually validate a real number here
  const userId = Number(params.userId);

  const user = USERS.find((u) => u.id === userId);

  if (!user) {
    throw new Error("User not found");
  }

  console.log({
    user,
  });
  return json({ user });
}

function Breadcrumbs({
  links,
  className,
}: { links: [string, string][] } & React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("flex items-center gap-2 self-start text-sm", className)}
    >
      {links.map(([link, text], idx) => (
        <React.Fragment key={idx}>
          <Button variant="ghost" asChild size="sm">
            <Link to={link}>
              <p>{text}</p>
            </Link>
          </Button>
          {idx !== links.length - 1 && <p>/</p>}
        </React.Fragment>
      ))}
    </div>
  );
}

export default function UserPage() {
  const { user } = useLoaderData<typeof loader>();

  return (
    <div className="flex flex-col items-center space-y-4">
      <Breadcrumbs
        links={[
          ["/users", "Users"],
          [`/users/${user.id}`, user.full_name],
        ]}
      />
      <Avatar className="h-36 w-36 shrink-0">
        {user.avatar && (
          <AvatarImage
            className="h-full w-full rounded-full object-cover"
            src={user.avatar}
          />
        )}
        <AvatarFallback className="flex h-full w-full items-center justify-center rounded-full dark:bg-zinc-800">
          {user.full_name.charAt(0)}
        </AvatarFallback>
      </Avatar>
      <div className="space-y-1">
        <h1 className="text-3xl font-bold">{user.full_name}</h1>
      </div>
      <p>{user.bio}</p>

      <p>{user.social?.tiktok}</p>
      <p>{user.social?.facebook}</p>
      <p>{user.social?.instagram}</p>
      <p>{user.social?.spotify}</p>
      <p>{user.social?.twitter}</p>

      <p className="italic">{user.location?.country_long_name}</p>
      <p className="italic">{user.location?.country_short_name}</p>
    </div>
  );
}

const Flag = ({ countryCode }: { countryCode: string }) => {
  return <ReactCountryFlag countryCode={countryCode} />;
};
