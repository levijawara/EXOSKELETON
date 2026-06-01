export type Role = "user" | "admin";

export type AuthUser = {
  id: string;
  email: string | null;
  role: Role;
};

export type AuthSession = {
  accessToken: string;
  refreshToken: string;
  expiresAt: number | null;
  user: AuthUser;
};

export type AuthProvider = {
  getSession(): Promise<AuthSession | null>;
  getUser(): Promise<AuthUser | null>;
};

