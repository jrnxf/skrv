import { CHAT_MESSAGES } from "api/chat-messages";
import moment from "moment";
import { Avatar } from "~/components/avatar";
import { Nullable } from "~/lib/types";
import { cn } from "~/lib/utils";

export default function Chat() {
  return (
    <div className="mx-auto flex max-w-[80vw] flex-col gap-6 sm:max-w-3xl">
      {CHAT_MESSAGES.map((message) => {
        const isAuthUser = message.author.id === 1;
        return (
          <div
            key={message.id}
            className={cn(
              isAuthUser ? "self-end" : "self-start",
              "max-w-[85%]",
            )}
          >
            <AuthorSection
              user={message.author}
              createdAt={message.created_at}
              isAuthUser={isAuthUser}
            />
            <div>
              <div
                className={cn(
                  "mt-2 break-words rounded-md bg-zinc-900 p-2",
                  isAuthUser ? "mr-8" : "ml-8",
                )}
              >
                {message.text}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

function AuthorSection({
  user,
  createdAt,
  isAuthUser,
}: {
  user: {
    id: number;
    full_name: string;
    avatar: Nullable<string>;
  };
  createdAt: string;
  isAuthUser: boolean;
}) {
  return (
    <div
      className={cn(
        "flex items-center gap-1",
        isAuthUser && "flex-row-reverse",
      )}
    >
      <Avatar src={user.avatar} name={user.full_name} className="h-8 w-8" />
      <div className={cn("flex flex-col", isAuthUser && "items-end")}>
        <p className="text-sm">{user.full_name}</p>
        <p className="text-2xs text-white/70">{moment(createdAt).fromNow()}</p>
      </div>
    </div>
  );
}
