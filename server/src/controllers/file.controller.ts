import { Request, Response } from 'express';
import { AuthenticatedRequest } from '../middleware/auth.middleware.js';

let mockFilesDatabase = [
  { id: 'f1', projectId: 'caresprint', name: 'caresprint_architecture_v2.pdf', extension: 'PDF', size: 4404019, url: 'https://nexora.dev/files/caresprint_architecture.pdf', uploadedBy: 'MD Zaved Akhtar', createdAt: '2026-02-10T10:00:00.000Z' },
  { id: 'f2', projectId: 'caresprint', name: 'webrtc_signaling_spec.docx', extension: 'DOCX', size: 1240100, url: 'https://nexora.dev/files/signaling_spec.docx', uploadedBy: 'Aman Deep', createdAt: '2026-02-12T14:30:00.000Z' },
  { id: 'f3', projectId: 'caresprint', name: 'caresprint_mobile_build.apk', extension: 'APK', size: 48201948, url: 'https://nexora.dev/files/caresprint.apk', uploadedBy: 'Rahul Sharma', createdAt: '2026-02-15T18:20:00.000Z' },
];

const ALLOWED_EXTENSIONS = ['ZIP', 'PDF', 'DOCX', 'PPTX', 'PNG', 'JPG', 'WEBP', 'MP4', 'APK'];

// @desc    Get Files for a Project
// @route   GET /api/v1/files?projectId=caresprint
export const getFiles = async (req: Request, res: Response) => {
  const { projectId } = req.query;
  const filtered = projectId
    ? mockFilesDatabase.filter((f) => f.projectId === (projectId as string).toLowerCase())
    : mockFilesDatabase;

  return res.status(200).json({ success: true, files: filtered });
};

// @desc    Upload File Metadata
// @route   POST /api/v1/files
export const uploadFile = async (req: AuthenticatedRequest, res: Response) => {
  const { projectId, name, size, url } = req.body;

  const ext = name.split('.').pop()?.toUpperCase() || 'FILE';

  if (!ALLOWED_EXTENSIONS.includes(ext)) {
    return res.status(400).json({
      success: false,
      error: {
        message: `File extension .${ext} is not allowed. Supported formats: ${ALLOWED_EXTENSIONS.join(', ')}`,
        statusCode: 400,
      },
    });
  }

  const newFile = {
    id: `f_${Date.now()}`,
    projectId: (projectId || 'caresprint').toLowerCase(),
    name,
    extension: ext,
    size: size || 2048576,
    url: url || `https://nexora.dev/files/${name}`,
    uploadedBy: req.user?.name || 'MD Zaved Akhtar',
    createdAt: new Date().toISOString(),
  };

  mockFilesDatabase.unshift(newFile);

  return res.status(201).json({ success: true, message: 'File uploaded successfully', file: newFile });
};

// @desc    Delete File
// @route   DELETE /api/v1/files/:id
export const deleteFile = async (req: AuthenticatedRequest, res: Response) => {
  const { id } = req.params;
  mockFilesDatabase = mockFilesDatabase.filter((f) => f.id !== id);
  return res.status(200).json({ success: true, message: 'File deleted successfully' });
};
