export interface UserDetails {
  id: number;
  email: string;
  fullName: string;
  roles: string[];
  subordinateIds: number[];
}

export interface UserCreateRequest {
  email: string;
  password: string;
  fullName: string;
  roles: number[];
}
