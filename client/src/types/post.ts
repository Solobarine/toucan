import { User } from "./auth";
import { Comment } from "./comment";

export interface Post {
  id?: number;
  item_type: "post";
  title: string | null;
  body: string;
  media: string[]
  user_id: number;
  user: User;
  likes_count: number;
  comments_count: number;
  is_owner: boolean;
  is_liked_by_user: boolean;
  comments: [] | Comment[];
  reposts_count: number;
  inserted_at: string;
}

export interface Repost {
  id: number;
  item_type: "repost";
  user: User;
  user_id: number;
  body: string | null;
  original_post_id: number;
  original_post: Post;
  inserted_at: string;
}
