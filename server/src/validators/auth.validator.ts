import { z } from 'zod';

export const registerSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  role: z.enum(['OWNER', 'ADMIN', 'MEMBER', 'CLIENT']).optional(),
});

export const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(1, 'Password is required'),
});

export const updateProfileSchema = z.object({
  name: z.string().min(2).optional(),
  bio: z.string().max(250).optional(),
  avatar: z.string().optional(),
  skills: z.array(z.string()).optional(),
  github: z.string().optional(),
  linkedin: z.string().optional(),
});
