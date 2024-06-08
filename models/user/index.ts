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

export interface UserProfile {
  id: number;
  email: string;
  fullName: string;
  roles: string[];
  managerId?: number;
  subordinateIds: number[];
}

export interface UserUpdateRequest {
  fullName: string;
  roles: number[];
  manager?: number;
}
