import { User } from "./auth";

export interface Comment {
  id?: number;
  user_id: number;
  user: User;
  text: string;
  content_id: number;
  content_type: "post" | "comment";
  replies: [] | Comment[];
  inserted_at: string;
}
