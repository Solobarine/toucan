export interface RegisterInterface {
  first_name: string;
  last_name: string;
  email: string;
  password_hash: string;
  tos: boolean;
}

export interface LoginInterface {
  email: string;
  password: string;
}

export interface User
  extends Pick<RegisterInterface, "first_name" | "last_name" | "email"> {
  id: number;
  avatar: string;
  username: string;
  bio: string;
  inserted_at: string;
  friend_request_received?: boolean;
  friend_request_sent?: boolean;
  is_follower?: boolean;
  is_following?: boolean;
  is_friend?: boolean;
}

export interface UserProfile {
  followers: number;
  following: number;
  posts_count: number;
  activity: [];
}

export interface Metrics {
  user_id: number;
  friends_count: number;
  followers_count: number;
  following_count: number;
  posts_count: number;
  reposts_count: number;
  total_posts: number;
}
