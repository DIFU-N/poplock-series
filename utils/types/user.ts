export type User = {
  id: string;
  username: string;
  passwordHash: string;
  role: string;
  banned: boolean;
  email: string;
};

export enum UserRoles {
  User = "user",
  Admin = "admin",
  SuperAdmin = "s.admin",
}
