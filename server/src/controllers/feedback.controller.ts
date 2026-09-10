import { Request, Response } from 'express';
import { AuthenticatedRequest } from '../middleware/auth.middleware.js';
import { Feedback } from '../models/Feedback.js';
import { Notification } from '../models/Notification.js';
import mongoose from 'mongoose';

// In-memory feedback store for standalone mode
let mockFeedbacksDatabase = [
  {
    id: 'fb_101',
    projectId: 'caresprint',
    clientName: 'Dr. Arthur Pendelton',
    clientEmail: 'arthur@telehealth.com',
    message: 'The WebRTC video consultation latency is incredibly fast! Can we add a multi-doctor conference feature in the next sprint?',
    status: 'NEW',
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 4).toISOString()
  },
  {
    id: 'fb_102',
    projectId: 'caresprint',
    clientName: 'Dr. Arthur Pendelton',
    clientEmail: 'arthur@telehealth.com',
    message: 'Prescription PDF generation formatting approved by compliance board.',
    status: 'RESOLVED',
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 28).toISOString()
  }
];

export const submitFeedback = async (req: Request, res: Response) => {
  try {
    const { projectId, clientName, clientEmail, message } = req.body;

    if (!projectId || !message) {
      return res.status(400).json({ success: false, message: 'Project ID and message are required' });
    }

    const isMongoConnected = mongoose.connection.readyState === 1;
    let feedbackItem: any;

    if (isMongoConnected) {
      feedbackItem = await Feedback.create({
        projectId,
        clientName: clientName || 'Client Stakeholder',
        clientEmail: clientEmail || 'client@nexora.dev',
        message,
        status: 'NEW'
      });

      // Dispatch team notification
      await Notification.create({
        recipientId: new mongoose.Types.ObjectId(), // Broadcast to workspace
        type: 'FEEDBACK',
        title: 'New Client Feedback Received',
        message: `${clientName || 'Client'}: "${message.slice(0, 60)}..."`,
        link: `/projects/${projectId}/overview`
      });
    } else {
      feedbackItem = {
        id: `fb_${Date.now()}`,
        projectId,
        clientName: clientName || 'Client Stakeholder',
        clientEmail: clientEmail || 'client@nexora.dev',
        message,
        status: 'NEW',
        createdAt: new Date().toISOString()
      };
      mockFeedbacksDatabase.unshift(feedbackItem);
    }

    res.status(201).json({
      success: true,
      message: 'Feedback submitted successfully to NEXORA engineering team',
      feedback: feedbackItem
    });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getProjectFeedback = async (req: Request, res: Response) => {
  try {
    const { projectId } = req.params;
    const isMongoConnected = mongoose.connection.readyState === 1;

    let feedbacks: any[] = [];
    if (isMongoConnected) {
      feedbacks = await Feedback.find({ projectId }).sort({ createdAt: -1 });
    }

    if (!feedbacks || feedbacks.length === 0) {
      feedbacks = mockFeedbacksDatabase.filter(f => f.projectId === projectId || projectId === 'caresprint');
    }

    res.json({
      success: true,
      count: feedbacks.length,
      feedbacks
    });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const updateFeedbackStatus = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const isMongoConnected = mongoose.connection.readyState === 1;

    if (isMongoConnected) {
      await Feedback.findByIdAndUpdate(id, { status });
    } else {
      const fb = mockFeedbacksDatabase.find(f => f.id === id);
      if (fb) {
        fb.status = status;
      }
    }

    res.json({
      success: true,
      message: 'Feedback status updated'
    });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};
