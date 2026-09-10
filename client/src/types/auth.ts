export type UserRole = 'OWNER' | 'ADMIN' | 'MEMBER' | 'CLIENT';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
  bio?: string;
  skills: string[];
  github?: string;
  linkedin?: string;
  isVerified: boolean;
}

export interface AuthResponse {
  success: boolean;
  message?: string;
  token?: string;
  user?: User;
  error?: {
    message: string;
    statusCode: number;
  };
}
