import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { Link } from "@remix-run/react";
import { USERS } from "api/users";
import { useState } from "react";
import { Badge } from "~/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { Input } from "~/components/ui/input";

export default function Users() {
  const [users, setUsers] = useState(USERS);
  return (
    <>
      <h1 className="text-2xl">Users</h1>

      <div className="mx-auto flex w-full max-w-xl flex-col gap-6">
        <Input
          placeholder="Search users..."
          onChange={(e) => {
            if (e.target.value === "") {
              setUsers(USERS);
            } else {
              setUsers((u) =>
                u.filter((u) =>
                  u.full_name
                    .toLowerCase()
                    .includes(e.target.value.toLowerCase()),
                ),
              );
            }
          }}
        />

        {users.map((user) => (
          <Link key={user.id} to={`/users/${user.id}`}>
            <Card>
              <CardHeader>
                <div className="flex items-center gap-3">
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
                  <div>
                    <CardTitle>{user.full_name}</CardTitle>
                    <CardDescription>
                      {user.location?.country_long_name}
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              {user.bio && (
                <CardContent>
                  <p className="line-clamp-2 text-sm">{user.bio}</p>
                </CardContent>
              )}

              {user.disciplines.length > 0 && (
                <CardFooter className="flex gap-2">
                  {user.disciplines.map((d) => (
                    <Badge key={d}>{d}</Badge>
                  ))}
                </CardFooter>
              )}
            </Card>
          </Link>
        ))}
      </div>
    </>
  );
}
