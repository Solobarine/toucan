export interface RegisterInterface {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  tos: boolean;
}

export interface LoginInterface {
  email: string;
  password: string;
}
