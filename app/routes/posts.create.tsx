import { Link } from "@remix-run/react";
import { POSTS } from "api/posts";
import getYouTubeID from "get-youtube-id";
import moment from "moment";
import { useState } from "react";
import { Breadcrumbs } from "~/components/breadcrumbs";
import { Badge } from "~/components/ui/badge";
import { Button } from "~/components/ui/button";
import { Card } from "~/components/ui/card";

export default function Posts() {
  const [posts, setPosts] = useState(POSTS);
  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <Breadcrumbs links={[["/posts", "Posts"]]} />

        <Button asChild>
          <Link to="/posts/create">Create</Link>
        </Button>
      </div>

      {posts.map((post) => (
        <Link key={post.id} to={`/posts/${post.id}`}>
          <Card>
            <div className="flex flex-col gap-4 overflow-hidden p-4 sm:flex-row">
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

              <div className="flex flex-col items-start justify-between gap-2 sm:gap-4">
                <div className="flex items-center">
                  <div className="line-clamp-1 text-sm">{post.title}</div>
                </div>
                {post.body && (
                  <p className="line-clamp-3 text-xs">{post.body}</p>
                )}

                <div className="flex flex-col gap-2">
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
            </div>
          </Card>
        </Link>
      ))}
    </div>
  );
}
