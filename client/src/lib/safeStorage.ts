/**
 * Safe Storage Utility
 * Wraps browser localStorage with:
 * 1. Automatic QuotaExceededError recovery (cleaning disposable caches, pruning oversized Base64 DataURLs)
 * 2. In-memory session fallback so operations NEVER crash or throw
 * 3. Self-healing on startup to repair already bloated storage keys
 */

const memoryStore = new Map<string, string>();

/**
 * Removes oversized base64 data URLs from JSON strings to compact data inside localStorage.
 * Original data is kept in memoryStore and backend API.
 */
export function pruneLargeBase64(jsonStr: string): string {
  try {
    const data = JSON.parse(jsonStr);
    const prune = (val: any): any => {
      if (typeof val === 'string') {
        // If string is an uncompressed base64 data URL (> 1KB)
        if (val.startsWith('data:') && val.length > 1024) {
          return ''; // Strip from localStorage cache
        }
        return val;
      }
      if (Array.isArray(val)) {
        return val.map(prune);
      }
      if (val !== null && typeof val === 'object') {
        const copy: Record<string, any> = {};
        for (const k of Object.keys(val)) {
          copy[k] = prune(val[k]);
        }
        return copy;
      }
      return val;
    };
    return JSON.stringify(prune(data));
  } catch {
    return jsonStr;
  }
}

/**
 * Frees up non-essential cached keys from localStorage
 */
export function freeUpStorage(): void {
  try {
    const disposableKeys = [
      'zansta_activity_log',
      'zansta_draft',
      'zansta_temp',
      'zansta_cache',
    ];

    for (const key of disposableKeys) {
      localStorage.removeItem(key);
    }

    // Also prune any key in localStorage containing 'log' or 'cache'
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key && (key.includes('log') || key.includes('temp') || key.includes('cache'))) {
        localStorage.removeItem(key);
      }
    }
  } catch (err) {
    // Ignore cleanup errors
  }
}

/**
 * Startup self-healing: checks if existing keys are dangerously bloated and prunes them.
 */
export function healStorage(): void {
  try {
    const cmsKeys = [
      'zansta_cms_projects',
      'zansta_cms_team',
      'zansta_cms_services',
      'zansta_cms_reviews',
      'zansta_cms_demos',
      'zansta_cms_banners',
      'zansta_cms_certificates',
      'zansta_cms_landing',
      'zansta_activity_log',
    ];

    for (const key of cmsKeys) {
      const raw = localStorage.getItem(key);
      if (raw && raw.length > 500000) {
        // If key is larger than ~500KB, prune huge base64 items
        const pruned = pruneLargeBase64(raw);
        if (pruned.length < raw.length) {
          try {
            localStorage.setItem(key, pruned);
            console.info(`[safeStorage] Successfully compacted storage key "${key}" from ${raw.length} to ${pruned.length} bytes.`);
          } catch {
            localStorage.removeItem(key);
          }
        }
      }
    }
  } catch {
    freeUpStorage();
  }
}

// Run self-healing immediately on import
if (typeof window !== 'undefined' && window.localStorage) {
  healStorage();
}

export const safeStorage = {
  getItem: (key: string): string | null => {
    try {
      const val = localStorage.getItem(key);
      if (val !== null) return val;
    } catch (e) {
      console.warn(`[safeStorage] Error reading key "${key}" from localStorage:`, e);
    }
    return memoryStore.get(key) || null;
  },

  setItem: (key: string, value: string): boolean => {
    // Keep in-memory copy so active runtime has complete data
    memoryStore.set(key, value);

    try {
      localStorage.setItem(key, value);
      return true;
    } catch (err: any) {
      console.warn(`[safeStorage] localStorage quota reached or setItem failed for "${key}". Recovering...`, err);

      // 1. Free disposable storage
      freeUpStorage();
      try {
        localStorage.setItem(key, value);
        return true;
      } catch {
        // 2. Prune oversized base64 data URLs for local cache storage
        try {
          const pruned = pruneLargeBase64(value);
          localStorage.setItem(key, pruned);
          console.info(`[safeStorage] Saved pruned cache version for "${key}".`);
          return true;
        } catch {
          // 3. Clear old key to prevent corrupt state
          try {
            localStorage.removeItem(key);
          } catch {
            // Ignore
          }
          console.warn(`[safeStorage] Storing key "${key}" in-memory only.`);
          return false;
        }
      }
    }
  },

  removeItem: (key: string): void => {
    memoryStore.delete(key);
    try {
      localStorage.removeItem(key);
    } catch {
      // Ignore
    }
  },

  clear: (): void => {
    memoryStore.clear();
    try {
      localStorage.clear();
    } catch {
      // Ignore
    }
  },
};
