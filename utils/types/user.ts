export type User = {
  id: string;
  username: string;
  passwordHash: string;
  role: string;
  banned: boolean;
};

export enum UserRoles {
  User = "user",
  Admin = "admin",
  SuperAdmin = "s.admin",
}
