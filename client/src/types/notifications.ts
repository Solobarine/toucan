import { User } from "./auth";

export interface Notification {
  id: number;
  user: User;
  actor: User;
  user_id: number;
  actor_id: number;
  verb: string;
  object: Record<string, string | number>;
  metadata: Record<string, string | number>;
  read_at: string;
  inserted_at: string;
  updated_at: string;
}
