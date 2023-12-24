import { Link } from "@remix-run/react";
import { POSTS } from "api/posts";
import getYouTubeID from "get-youtube-id";
import moment from "moment";
import { useState } from "react";
import { Badge } from "~/components/ui/badge";
import { Card } from "~/components/ui/card";
import { Input } from "~/components/ui/input";

export default function Posts() {
  const [posts, setPosts] = useState(POSTS);
  return (
    <>
      <h1 className="text-2xl">Posts</h1>

      <div className="w-80vw mx-auto flex w-full max-w-3xl flex-col gap-6">
        <Input
          placeholder="Search posts..."
          onChange={(e) => {
            if (e.target.value === "") {
              setPosts(POSTS);
            } else {
              setPosts((p) =>
                p.filter((p) =>
                  p.posted_by.full_name
                    .toLowerCase()
                    .includes(e.target.value.toLowerCase()),
                ),
              );
            }
          }}
        />

        {posts.map((post) => (
          <Link key={post.id} to={`/posts/${post.id}`}>
            <Card>
              <div className="flex flex-col gap-4 overflow-hidden p-4 sm:flex-row">
                {post.oembed?.url && (
                  <img
                    alt="youtube thumbnail"
                    className="aspect-video h-48 rounded-md object-cover sm:h-24 lg:h-36"
                    src={`https://img.youtube.com/vi/${getYouTubeID(
                      post.oembed.url,
                    )}/hqdefault.jpg`}
                  />
                )}

                <div className="flex flex-col items-start justify-between">
                  <div className="flex items-center">
                    <div className="text-sm">{post.title}</div>
                  </div>
                  {post.body && (
                    <p className="line-clamp-1 text-xs">{post.body}</p>
                  )}

                  <div className="flex gap-2">
                    {post.tags.length > 0 &&
                      post.tags.map((pt) => <Badge key={pt}>{pt}</Badge>)}
                  </div>

                  <div className="flex gap-1 text-xs">
                    <span>{post.posted_by.full_name}</span>
                    <span>•</span>
                    <span>{moment(post.created_at).fromNow()}</span>
                  </div>
                </div>
              </div>
            </Card>
          </Link>
        ))}
      </div>
    </>
  );
}
