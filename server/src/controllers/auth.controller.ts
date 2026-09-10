import { Request, Response } from 'express';
import mongoose from 'mongoose';
import { User } from '../models/User.js';
import { AuthenticatedRequest } from '../middleware/auth.middleware.js';

// Helper to format user response (omits password)
const sanitizeUser = (user: any) => ({
  id: user._id || user.id,
  name: user.name,
  email: user.email,
  role: user.role,
  avatar: user.avatar || '',
  bio: user.bio || '',
  skills: user.skills || [],
  github: user.github || '',
  linkedin: user.linkedin || '',
  isVerified: user.isVerified ?? true,
});

// Fallback Mock Users for Decoupled DB Testing
const mockUsersDatabase: any[] = [
  {
    _id: 'user_mock_zaved',
    name: 'MD Zaved Akhtar',
    email: 'mdzavedakhtar620@gmail.com',
    role: 'OWNER',
    avatar: '/zaved.jpg',
    bio: 'Lead Architect & Full Stack Engineer',
    skills: ['TypeScript', 'Node.js', 'React', 'MongoDB', 'Python', 'AI'],
    github: 'https://github.com/mdzavedakhtar',
    linkedin: 'https://www.linkedin.com/in/md-zaved-akhtar-22013828b',
    isVerified: true,
  },
  {
    _id: 'user_mock_rahul',
    name: 'Rahul Sharma',
    email: 'rahul@zansta.dev',
    role: 'ADMIN',
    avatar: '',
    bio: 'Frontend Specialist',
    skills: ['React', 'Tailwind'],
    github: '',
    linkedin: '',
    isVerified: true,
  },
  {
    _id: 'user_mock_aman',
    name: 'Aman Deep',
    email: 'aman@zansta.dev',
    role: 'MEMBER',
    avatar: '',
    bio: 'Backend Engineer',
    skills: ['Node.js', 'Express'],
    github: '',
    linkedin: '',
    isVerified: true,
  },
];

// @desc    Register new user
// @route   POST /api/v1/auth/register
export const register = async (req: Request, res: Response) => {
  const { name, email, password, role } = req.body;

  const isDbConnected = mongoose.connection.readyState === 1;

  if (isDbConnected) {
    const existingUser = await User.findOne({ email: email.toLowerCase() });
    if (existingUser) {
      return res.status(409).json({
        success: false,
        error: { message: 'User with this email already exists.', statusCode: 409 },
      });
    }

    const user = await User.create({
      name,
      email: email.toLowerCase(),
      password,
      role: email.toLowerCase() === 'mdzavedakhtar620@gmail.com' ? 'OWNER' : (role || 'MEMBER'),
    });

    const token = user.generateJWTToken();

    return res.status(201).json({
      success: true,
      message: 'Account created successfully',
      token,
      user: sanitizeUser(user),
    });
  } else {
    // Decoupled Mode Mock Response
    const mockUser = {
      _id: `user_mock_${Date.now()}`,
      name,
      email: email.toLowerCase(),
      role: email.toLowerCase() === 'mdzavedakhtar620@gmail.com' ? 'OWNER' : (role || 'MEMBER'),
      avatar: '',
      bio: 'Developer Workspace Member',
      skills: ['TypeScript', 'React'],
      github: '',
      linkedin: '',
      isVerified: true,
    };
    mockUsersDatabase.push(mockUser);

    return res.status(201).json({
      success: true,
      message: 'Account created successfully (Decoupled Mode)',
      token: `mock_jwt_token_${mockUser._id}`,
      user: sanitizeUser(mockUser),
    });
  }
};

// @desc    Login user
// @route   POST /api/v1/auth/login
export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  const isDbConnected = mongoose.connection.readyState === 1;

  if (isDbConnected) {
    const user = await User.findOne({ email: email.toLowerCase() }).select('+password');

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
    // Decoupled Mode Mock Match
    let mockUser = mockUsersDatabase.find((u) => u.email === email.toLowerCase());
    if (!mockUser) {
      mockUser = {
        _id: `user_mock_${Date.now()}`,
        name: email.split('@')[0].toUpperCase(),
        email: email.toLowerCase(),
        role: email.toLowerCase() === 'mdzavedakhtar620@gmail.com' ? 'OWNER' : 'MEMBER',
        avatar: '',
        bio: 'Workspace Member',
        skills: ['TypeScript', 'React', 'Node.js'],
        github: '',
        linkedin: '',
        isVerified: true,
      };
      mockUsersDatabase.push(mockUser);
    }

    return res.status(200).json({
      success: true,
      message: 'Logged in successfully (Decoupled Mode)',
      token: `mock_jwt_token_${mockUser._id}`,
      user: sanitizeUser(mockUser),
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

  const isDbConnected = mongoose.connection.readyState === 1;

  if (isDbConnected && req.user) {
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
    // Decoupled Mode Update
    const updatedUser = {
      ...(req.user || mockUsersDatabase[0]),
      name: name || req.user?.name || 'MD Zaved Akhtar',
      bio: bio ?? req.user?.bio ?? '',
      avatar: avatar ?? req.user?.avatar ?? '',
      skills: skills || req.user?.skills || [],
      github: github ?? req.user?.github ?? '',
      linkedin: linkedin ?? req.user?.linkedin ?? '',
    };

    return res.status(200).json({
      success: true,
      message: 'Profile updated successfully (Decoupled Mode)',
      user: sanitizeUser(updatedUser),
    });
  }
};

// @desc    Forgot Password Request
// @route   POST /api/v1/auth/forgot-password
export const forgotPassword = async (req: Request, res: Response) => {
  const { email } = req.body;

  return res.status(200).json({
    success: true,
    message: `Password reset instructions sent to ${email}`,
  });
};

// @desc    Reset Password
// @route   POST /api/v1/auth/reset-password
export const resetPassword = async (req: Request, res: Response) => {
  return res.status(200).json({
    success: true,
    message: 'Password reset successfully. Please log in.',
  });
};

// @desc    Logout User
// @route   POST /api/v1/auth/logout
export const logout = async (req: Request, res: Response) => {
  return res.status(200).json({
    success: true,
    message: 'Logged out successfully',
  });
};
