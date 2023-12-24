import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { LoaderFunctionArgs, MetaFunction, json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { USERS } from "api/users";
import ReactCountryFlag from "react-country-flag";

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

  return json({ user });
}

export default function UserPage() {
  const { user } = useLoaderData<typeof loader>();

  return (
    <div className="flex flex-col space-y-4">
      <Avatar className="h-12 w-12 shrink-0">
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
        <h1 className="text-xl font-bold">{user.full_name}</h1>
      </div>
      <p>{user.bio}</p>
      {user.location?.country_short_name && (
        <ReactCountryFlag countryCode={user.location.country_short_name} />
      )}

      <p className="italic">{user.location?.country_long_name}</p>

      {/* {user.avatar && (
        <img src={user.avatarUrl} alt={user.name} className="w-64" />
      )} */}
      {/* <p>Member Since: {user.createdAt}</p> */}
      {/* {user.posts.length > 0 && (
        <>
          <h1 className="text-xl font-bold">Posts</h1>
          {user.posts.map((post) => (
            <div key={post.id}>
              <p className="font-bold text-lg">{post.title}</p>
              <p className="text-secondary-foreground">{post.body}</p>
            </div>
          ))}
        </>
      )} */}
    </div>
  );
}
