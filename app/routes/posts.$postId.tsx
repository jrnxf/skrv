import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { LoaderFunctionArgs, MetaFunction, json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { POSTS } from "api/posts";
import getYouTubeID from "get-youtube-id";

export const meta: MetaFunction = () => {
  return [
    { title: "skrrrt" },
    { name: "description", content: "a une commune" },
  ];
};

export async function loader({ request, params }: LoaderFunctionArgs) {
  // TODO actually validate a real number here
  const postId = Number(params.postId);

  const post = POSTS.find((u) => u.id === postId);

  if (!post) {
    throw new Error("Post not found");
  }

  console.log({
    post,
  });
  return json({ post });
}

export default function PostPage() {
  const { post } = useLoaderData<typeof loader>();

  return (
    <div className="flex flex-col space-y-4">
      <Avatar className="h-12 w-12 shrink-0">
        {post.posted_by.avatar && (
          <AvatarImage
            className="h-full w-full rounded-full object-cover"
            src={post.posted_by.avatar}
          />
        )}
        <AvatarFallback className="flex h-full w-full items-center justify-center rounded-full dark:bg-zinc-800">
          {post.posted_by.full_name.charAt(0)}
        </AvatarFallback>
      </Avatar>
      <div className="space-y-1">
        <h1 className="text-xl font-bold">{post.title}</h1>
      </div>

      <div className="w-96">
        {post.oembed?.url ? (
          <img
            alt="youtube thumbnail"
            className="aspect-video h-48 rounded-md object-cover sm:h-24 lg:h-36"
            src={`https://img.youtube.com/vi/${getYouTubeID(
              post.oembed.url,
            )}/hqdefault.jpg`}
          />
        ) : post.image_url ? (
          <img
            alt="post thumbnail"
            className="aspect-video h-48 rounded-md object-cover sm:h-24 lg:h-36"
            src={post.image_url}
          />
        ) : post.video?.playback_id ? (
          <img
            alt="video thumbnail"
            className="aspect-video h-48 rounded-md object-cover sm:h-24 lg:h-36"
            src={`https://image.mux.com/${post.video.playback_id}/thumbnail.png?time=0`}
          />
        ) : null}
      </div>

      <p>{post.body}</p>
    </div>
  );
}
