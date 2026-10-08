import { CMSCertificate } from '@/types/cms';
import { apiRequest } from './api';
import { activityService } from './activityService';

const STORAGE_KEY = 'zansta_cms_certificates';

export const defaultCertificates: CMSCertificate[] = [
  {
    id: 'cert_msme_udyam',
    title: 'MSME UDYAM REGISTRATION VERIFIED',
    issuer: 'Ministry of Micro, Small & Medium Enterprises, Govt. of India',
    certificateNumber: 'UDYAM-CG-02-0018924',
    badgeText: '🇮🇳 GOVT. OF INDIA VERIFIED',
    logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/8/84/Government_of_India_logo.svg',
    verificationUrl: 'https://udyamregistration.gov.in',
    issuedDate: '2024-03-15',
    description: 'Officially registered and recognized Enterprise by the Government of India for Software Design, Development, and Digital Systems.',
    isVisible: true,
    order: 1,
    createdAt: '2026-01-01T00:00:00.000Z',
    updatedAt: '2026-01-01T00:00:00.000Z',
  },
  {
    id: 'cert_startup_india',
    title: 'STARTUP INDIA RECOGNITION',
    issuer: 'Department for Promotion of Industry and Internal Trade (DPIIT)',
    certificateNumber: 'DPIIT-RECOGNIZED-ENTERPRISE',
    badgeText: '🚀 DPIIT RECOGNIZED',
    logoUrl: 'https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?q=80&w=300&auto=format&fit=crop',
    verificationUrl: 'https://www.startupindia.gov.in',
    issuedDate: '2024-05-10',
    description: 'Recognized by DPIIT as an innovative technology and software development startup entity.',
    isVisible: true,
    order: 2,
    createdAt: '2026-01-02T00:00:00.000Z',
    updatedAt: '2026-01-02T00:00:00.000Z',
  },
  {
    id: 'cert_iso_9001',
    title: 'ISO 9001:2015 QUALITY MANAGEMENT',
    issuer: 'International Organization for Standardization',
    certificateNumber: 'ISO-9001:2015-QMS-VALIDATED',
    badgeText: '⭐ ISO 9001:2015 CERTIFIED',
    logoUrl: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=300&auto=format&fit=crop',
    verificationUrl: '',
    issuedDate: '2025-01-20',
    description: 'Certified Quality Management System for reliable architecture delivery and software engineering security standards.',
    isVisible: true,
    order: 3,
    createdAt: '2026-01-03T00:00:00.000Z',
    updatedAt: '2026-01-03T00:00:00.000Z',
  },
  {
    id: 'cert_ssl_encryption',
    title: '256-BIT SSL ENTERPRISE ENCRYPTED',
    issuer: 'Cloudflare & Let\'s Encrypt Trust Network',
    certificateNumber: 'TLS-1.3-HIGH-GRADE-SECURITY',
    badgeText: '🔒 256-BIT ENCRYPTION',
    logoUrl: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?q=80&w=300&auto=format&fit=crop',
    verificationUrl: '',
    issuedDate: '2026-01-01',
    description: 'Strict TLS 1.3 cryptographic transport and end-to-end payload encryption for user data safety.',
    isVisible: true,
    order: 4,
    createdAt: '2026-01-04T00:00:00.000Z',
    updatedAt: '2026-01-04T00:00:00.000Z',
  },
];

export interface CertificateFilterOptions {
  isVisible?: boolean;
}

export const certificateService = {
  fetchCertificates: async (filters?: CertificateFilterOptions): Promise<CMSCertificate[]> => {
    try {
      const params = new URLSearchParams();
      if (filters?.isVisible !== undefined) params.append('isVisible', String(filters.isVisible));
      const queryString = params.toString() ? `?${params.toString()}` : '';

      const response = await apiRequest<{ success: boolean; data: CMSCertificate[] }>(`/cms/certificates${queryString}`);
      if (response.success && Array.isArray(response.data)) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(response.data));
        return response.data;
      }
    } catch (err) {
      console.warn('[certificateService] Backend API offline, using local cache:', err);
    }
    return certificateService.getCertificates(filters);
  },

  getCertificates: (filters?: CertificateFilterOptions): CMSCertificate[] => {
    let certs: CMSCertificate[] = [];
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored !== null) {
        certs = JSON.parse(stored);
      } else {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(defaultCertificates));
        certs = defaultCertificates;
      }
    } catch (e) {
      console.error('Failed to parse certificates from localStorage', e);
      certs = defaultCertificates;
    }

    certs.sort((a, b) => (a.order || 0) - (b.order || 0));

    if (!filters) return certs;

    return certs.filter((c) => {
      if (filters.isVisible !== undefined && c.isVisible !== filters.isVisible) return false;
      return true;
    });
  },

  getCertificateById: (id: string): CMSCertificate | null => {
    const certs = certificateService.getCertificates();
    return certs.find((c) => c.id === id) || null;
  },

  createCertificate: async (data: Omit<CMSCertificate, 'id' | 'createdAt' | 'updatedAt' | 'order'> & { order?: number }): Promise<CMSCertificate> => {
    const certs = certificateService.getCertificates();
    const id = `cert_${Date.now()}_${Math.random().toString(36).substr(2, 4)}`;

    const newCert: CMSCertificate = {
      ...data,
      id,
      order: data.order ?? (certs.length + 1),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    try {
      const res = await apiRequest<{ success: boolean; data: CMSCertificate }>('/cms/certificates', {
        method: 'POST',
        body: JSON.stringify(newCert),
      });
      const saved = res.data || newCert;
      const updated = [...certs.filter((c) => c.id !== id && c.id !== saved.id), saved];
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      activityService.logActivity('MD Zaved Akhtar', 'added company certificate', saved.title, 'certificate');
      return saved;
    } catch (err) {
      console.warn('[certificateService] Failed to save certificate to MongoDB, saved locally:', err);
      const updated = [...certs, newCert];
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      activityService.logActivity('MD Zaved Akhtar', 'added company certificate (offline)', newCert.title, 'certificate');
      return newCert;
    }
  },

  updateCertificate: async (id: string, updates: Partial<CMSCertificate>): Promise<CMSCertificate | null> => {
    const certs = certificateService.getCertificates();
    const index = certs.findIndex((c) => c.id === id);
    const existing = index !== -1 ? certs[index] : ({} as CMSCertificate);

    const updatedCert: CMSCertificate = {
      ...existing,
      ...updates,
      updatedAt: new Date().toISOString(),
    };

    try {
      const res = await apiRequest<{ success: boolean; data: CMSCertificate }>(`/cms/certificates/${id}`, {
        method: 'PUT',
        body: JSON.stringify(updates),
      });
      const saved = res.data || updatedCert;
      const updatedList = certs.map((c) => (c.id === id ? saved : c));
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedList));
      activityService.logActivity('MD Zaved Akhtar', 'updated company certificate', saved.title, 'certificate');
      return saved;
    } catch (err) {
      console.warn('[certificateService] Failed to update certificate on server, saved locally:', err);
      const updatedList = certs.map((c) => (c.id === id ? updatedCert : c));
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedList));
      activityService.logActivity('MD Zaved Akhtar', 'updated company certificate (offline)', updatedCert.title, 'certificate');
      return updatedCert;
    }
  },

  deleteCertificate: async (id: string): Promise<boolean> => {
    const certs = certificateService.getCertificates();
    const target = certs.find((c) => c.id === id);
    const title = target?.title || id;

    try {
      await apiRequest(`/cms/certificates/${id}`, { method: 'DELETE' });
    } catch (err) {
      console.warn('[certificateService] Failed to delete certificate from server:', err);
    }

    const filtered = certs.filter((c) => c.id !== id);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
    activityService.logActivity('MD Zaved Akhtar', 'deleted company certificate', title, 'certificate');
    return true;
  },

  reorderCertificates: async (certificates: CMSCertificate[]): Promise<CMSCertificate[]> => {
    const reordered = certificates.map((c, idx) => ({ ...c, order: idx + 1, updatedAt: new Date().toISOString() }));
    try {
      await apiRequest('/cms/certificates/reorder', {
        method: 'PUT',
        body: JSON.stringify({ certificates: reordered }),
      });
    } catch (err) {
      console.warn('[certificateService] Failed to persist certificate reordering to server, saving locally:', err);
    }
    localStorage.setItem(STORAGE_KEY, JSON.stringify(reordered));
    activityService.logActivity('MD Zaved Akhtar', 'reordered company certificates', 'Certificates Order', 'certificate');
    return reordered;
  },
};
