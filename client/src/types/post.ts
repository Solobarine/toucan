import { User } from "./auth";
import { Comment } from "./comment";

export interface Post {
  id?: number;
  title: string | null;
  body: string;
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
