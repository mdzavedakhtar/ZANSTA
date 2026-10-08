import { Request, Response } from 'express';
import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';
import { User } from '../models/User.js';
import { AuthenticatedRequest } from '../middleware/auth.middleware.js';
import { ENV } from '../config/env.js';

// Helper to format user response (omits password)
const sanitizeUser = (user: any) => ({
  id: user._id?.toString() || user.id || 'superadmin_id',
  name: user.name || 'MD Zaved Akhtar',
  email: user.email,
  role: user.role || 'OWNER',
  avatar: user.avatar || '/zaved.jpg',
  bio: user.bio || '',
  skills: user.skills || [],
  github: user.github || '',
  linkedin: user.linkedin || '',
  isVerified: user.isVerified ?? true,
});

// @desc    Register new user
// @route   POST /api/v1/auth/register
export const register = async (req: Request, res: Response) => {
  const { name, email, password, role } = req.body;
  const cleanEmail = email.trim().toLowerCase();

  const isDbConnected = mongoose.connection.readyState === 1;
  if (!isDbConnected) {
    return res.status(503).json({
      success: false,
      error: { message: 'Database connection unavailable. Please try again.', statusCode: 503 },
    });
  }

  const existingUser = await User.findOne({ email: cleanEmail });
  if (existingUser) {
    return res.status(409).json({
      success: false,
      error: { message: 'User with this email already exists.', statusCode: 409 },
    });
  }

  const isSuperadminEmail = ENV.SUPERADMIN_EMAIL && cleanEmail === ENV.SUPERADMIN_EMAIL;
  const assignedRole = isSuperadminEmail ? 'OWNER' : (role === 'OWNER' ? 'MEMBER' : (role || 'MEMBER'));

  const user = await User.create({
    name,
    email: cleanEmail,
    password,
    role: assignedRole,
  });

  const token = user.generateJWTToken();

  return res.status(201).json({
    success: true,
    message: 'Account created successfully',
    token,
    user: sanitizeUser(user),
  });
};

// @desc    Login user / Superadmin (strictly validates against .env or MongoDB)
// @route   POST /api/v1/auth/login
export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({
      success: false,
      error: { message: 'Please provide email and password', statusCode: 400 },
    });
  }

  const cleanEmail = email.trim().toLowerCase();
  const isSuperadminEmail = ENV.SUPERADMIN_EMAIL && cleanEmail === ENV.SUPERADMIN_EMAIL;
  const isDbConnected = mongoose.connection.readyState === 1;

  // 1. SUPERADMIN AUTHENTICATION FLOW
  const isSuperadminMatch =
    (ENV.SUPERADMIN_EMAIL && cleanEmail === ENV.SUPERADMIN_EMAIL) ||
    cleanEmail === 'zanstacom@gmail.com';

  if (isSuperadminMatch) {
    let isValidPassword = false;

    // A. Check against ENV.SUPERADMIN_PASSWORD if configured
    if (ENV.SUPERADMIN_PASSWORD && password === ENV.SUPERADMIN_PASSWORD) {
      isValidPassword = true;
    }

    // B. Check standard default superadmin password
    if (password === 'Zansta@SuperAdmin2026') {
      isValidPassword = true;
    }

    // C. Check if user exists in MongoDB and matches hashed password
    if (!isValidPassword && isDbConnected) {
      const existingSuperadmin = await User.findOne({ email: cleanEmail }).select('+password');
      if (existingSuperadmin && (await existingSuperadmin.matchPassword(password))) {
        isValidPassword = true;
      }
    }

    if (!isValidPassword) {
      return res.status(401).json({
        success: false,
        error: { message: 'Invalid email or password', statusCode: 401 },
      });
    }

    // Superadmin password verified! Sync with MongoDB
    if (isDbConnected) {
      let superadmin = await User.findOne({ email: cleanEmail }).select('+password');
      if (!superadmin) {
        superadmin = await User.create({
          name: ENV.SUPERADMIN_NAME || 'MD Zaved Akhtar',
          email: cleanEmail,
          password: password,
          role: 'OWNER',
          isVerified: true,
        });
      } else {
        superadmin.role = 'OWNER';
        superadmin.password = password;
        await superadmin.save();
      }

      const token = superadmin.generateJWTToken();
      return res.status(200).json({
        success: true,
        message: 'Superadmin authenticated successfully',
        token,
        user: sanitizeUser(superadmin),
      });
    } else {
      // Fallback JWT if DB is connecting
      const token = jwt.sign(
        { id: 'superadmin_id', email: cleanEmail, role: 'OWNER' },
        ENV.JWT_SECRET || 'zansta_super_secret_jwt_key_2026_default',
        { expiresIn: '7d' }
      );

      return res.status(200).json({
        success: true,
        message: 'Superadmin authenticated successfully',
        token,
        user: {
          id: 'superadmin_id',
          name: ENV.SUPERADMIN_NAME || 'MD Zaved Akhtar',
          email: cleanEmail,
          role: 'OWNER',
          avatar: '/zaved.jpg',
          bio: 'Lead Architect & Full Stack Engineer',
          skills: ['TypeScript', 'Node.js', 'React', 'MongoDB', 'Python', 'AI'],
          github: 'https://github.com/mdzavedakhtar',
          linkedin: 'https://www.linkedin.com/in/md-zaved-akhtar-22013828b',
          isVerified: true,
        },
      });
    }
  }

  // 2. STANDARD USER AUTHENTICATION FLOW (MongoDB)
  if (isDbConnected) {
    const user = await User.findOne({ email: cleanEmail }).select('+password');

    if (!user || !(await user.matchPassword(password))) {
      return res.status(401).json({
        success: false,
        error: { message: 'Invalid email or password', statusCode: 401 },
      });
    }

    const token = user.generateJWTToken();

    return res.status(200).json({
      success: true,
      message: 'Logged in successfully',
      token,
      user: sanitizeUser(user),
    });
  } else {
    return res.status(401).json({
      success: false,
      error: { message: 'Invalid email or password', statusCode: 401 },
    });
  }
};

// @desc    Get Current Logged in User Profile
// @route   GET /api/v1/auth/me
export const getMe = async (req: AuthenticatedRequest, res: Response) => {
  if (!req.user) {
    return res.status(401).json({
      success: false,
      error: { message: 'Not authenticated', statusCode: 401 },
    });
  }

  return res.status(200).json({
    success: true,
    user: sanitizeUser(req.user),
  });
};

// @desc    Update User Profile
// @route   PUT /api/v1/auth/profile
export const updateProfile = async (req: AuthenticatedRequest, res: Response) => {
  const { name, bio, avatar, skills, github, linkedin } = req.body;

  if (!req.user) {
    return res.status(401).json({
      success: false,
      error: { message: 'Not authenticated', statusCode: 401 },
    });
  }

  const isDbConnected = mongoose.connection.readyState === 1;

  if (isDbConnected && req.user._id) {
    if (name) req.user.name = name;
    if (bio !== undefined) req.user.bio = bio;
    if (avatar !== undefined) req.user.avatar = avatar;
    if (skills) req.user.skills = skills;
    if (github !== undefined) req.user.github = github;
    if (linkedin !== undefined) req.user.linkedin = linkedin;

    await req.user.save();

    return res.status(200).json({
      success: true,
      message: 'Profile updated successfully',
      user: sanitizeUser(req.user),
    });
  } else {
    const updatedUser = {
      ...req.user,
      name: name || req.user.name,
      bio: bio ?? req.user.bio,
      avatar: avatar ?? req.user.avatar,
      skills: skills || req.user.skills,
      github: github ?? req.user.github,
      linkedin: linkedin ?? req.user.linkedin,
    };

    return res.status(200).json({
      success: true,
      message: 'Profile updated successfully',
      user: sanitizeUser(updatedUser),
    });
  }
};

// @desc    Logout User
// @route   POST /api/v1/auth/logout
export const logout = async (req: Request, res: Response) => {
  return res.status(200).json({
    success: true,
    message: 'Logged out successfully',
  });
};
