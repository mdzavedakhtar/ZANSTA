export const getApiBaseUrl = (): string => {
  const envUrl = import.meta.env.VITE_API_BASE_URL;

  if (typeof window !== 'undefined') {
    const { hostname } = window.location;
    const isLocalhost = hostname === 'localhost' || hostname === '127.0.0.1';

    // If a valid production remote API URL is provided (e.g. https://api.zansta.dev/api/v1)
    if (envUrl && !envUrl.includes('localhost') && envUrl.startsWith('http')) {
      return envUrl.replace(/\/+$/, '');
    }

    // If accessed from localhost and env is explicitly set
    if (isLocalhost && envUrl && envUrl.includes('localhost')) {
      return envUrl.replace(/\/+$/, '');
    }

    // Default to relative URL '/api/v1' for Vite proxy (local dev & LAN) and Vercel serverless functions
    return '/api/v1';
  }

  return envUrl || 'http://localhost:5000/api/v1';
};

export async function apiRequest<T = any>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  const token = localStorage.getItem('zansta_token');
  const baseUrl = getApiBaseUrl();

  const cleanEndpoint = endpoint.startsWith('/') ? endpoint : `/${endpoint}`;
  const fullUrl = `${baseUrl}${cleanEndpoint}`;

  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    Accept: 'application/json',
    ...(options.headers as Record<string, string>),
  };

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const response = await fetch(fullUrl, {
    ...options,
    headers,
  });

  const text = await response.text();
  let data: any = null;
  try {
    data = text ? JSON.parse(text) : {};
  } catch {
    data = { message: text };
  }

  if (!response.ok) {
    const errorMsg =
      data?.error?.message ||
      data?.message ||
      `Request to ${endpoint} failed with status ${response.status}`;
    throw new Error(errorMsg);
  }

  return data as T;
}

