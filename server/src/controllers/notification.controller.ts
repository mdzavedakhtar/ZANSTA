import { Request, Response } from 'express';

let mockNotificationsDatabase = [
  { id: '1', type: 'TASK_ASSIGNMENT', title: 'Task Assigned', message: 'Rahul assigned you to "Implement Auth Middleware"', read: false, time: '10m ago' },
  { id: '2', type: 'MENTION', title: 'GitHub PR Merged', message: 'Pull request #42 merged into main branch by Zaved', read: false, time: '1h ago' },
  { id: '3', type: 'CLIENT_FEEDBACK', title: 'Client Feedback', message: 'Acme Corp left feedback on CareSprint demo link', read: true, time: '3h ago' },
];

// @desc    Get Notifications
// @route   GET /api/v1/notifications
export const getNotifications = async (req: Request, res: Response) => {
  return res.status(200).json({
    success: true,
    notifications: mockNotificationsDatabase,
    unreadCount: mockNotificationsDatabase.filter((n) => !n.read).length,
  });
};

// @desc    Mark Single Notification Read
// @route   PUT /api/v1/notifications/:id/read
export const markNotificationRead = async (req: Request, res: Response) => {
  const { id } = req.params;
  const target = mockNotificationsDatabase.find((n) => n.id === id);
  if (target) {
    target.read = true;
  }
  return res.status(200).json({
    success: true,
    notifications: mockNotificationsDatabase,
    unreadCount: mockNotificationsDatabase.filter((n) => !n.read).length,
  });
};

// @desc    Mark All Notifications Read
// @route   PUT /api/v1/notifications/read-all
export const markAllNotificationsRead = async (req: Request, res: Response) => {
  mockNotificationsDatabase.forEach((n) => (n.read = true));
  return res.status(200).json({
    success: true,
    notifications: mockNotificationsDatabase,
    unreadCount: 0,
  });
};
