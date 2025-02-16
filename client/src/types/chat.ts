import { User } from "./auth";

export interface Chat {
  id: number;
  name: string;
  message: string;
  sender_id: number;
  receiver_id: number;
  inserted_at?: string;
  updated_at?: string;
  sender: User;
  receiver: User;
}
