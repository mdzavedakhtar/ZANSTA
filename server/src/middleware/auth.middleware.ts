import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { ENV } from '../config/env.js';
import { User, IUser, UserRole } from '../models/User.js';

export interface AuthenticatedRequest extends Request {
  user?: IUser;
}

// Protect Middleware (Verifies JWT)
export const protect = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  let token: string | undefined;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1];
  }

  if (!token) {
    return res.status(401).json({
      success: false,
      error: {
        message: 'Not authorized to access this route. Please log in.',
        statusCode: 401,
      },
    });
  }

  try {
    const decoded = jwt.verify(token, ENV.JWT_SECRET) as { id: string };
    const user = await User.findById(decoded.id);

    if (!user) {
      return res.status(401).json({
        success: false,
        error: {
          message: 'User belonging to this token no longer exists.',
          statusCode: 401,
        },
      });
    }

    req.user = user;
    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      error: {
        message: 'Token verification failed or token expired.',
        statusCode: 401,
      },
    });
  }
};

// RBAC Authorization Middleware
export const authorize = (...roles: UserRole[]) => {
  return (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    if (!req.user || !roles.includes(req.user.role)) {
      return res.status(403).json({
        success: false,
        error: {
          message: `User role '${req.user?.role || 'GUEST'}' is not authorized to perform this action.`,
          statusCode: 403,
        },
      });
    }
    next();
  };
};
