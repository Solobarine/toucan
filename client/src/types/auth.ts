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
  username: string;
  bio: string;
  inserted_at: string;
}

export interface UserProfile {
  followers: number;
  following: number;
  posts_count: number;
  activity: [];
}
