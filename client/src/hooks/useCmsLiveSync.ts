import { useEffect } from 'react';
import { socketService } from '@/services/socket';

export type CmsSyncType = 'project' | 'team' | 'service' | 'demo' | 'review' | 'landing' | 'enquiry' | 'demoRequest' | 'banner' | 'all';

export function useCmsLiveSync(types: CmsSyncType | CmsSyncType[], onUpdate: (detail: { type: string; data?: any }) => void) {
  useEffect(() => {
    // Ensure socket is active
    socketService.connect();

    const handleCmsUpdate = (event: Event) => {
      const customEvent = event as CustomEvent<{ type: string; data?: any }>;
      const eventType = customEvent.detail?.type;

      const typesList = Array.isArray(types) ? types : [types];
      if (typesList.includes('all') || (eventType && typesList.includes(eventType as CmsSyncType))) {
        onUpdate(customEvent.detail);
      }
    };

    window.addEventListener('zansta:cms:update', handleCmsUpdate);
    return () => {
      window.removeEventListener('zansta:cms:update', handleCmsUpdate);
    };
  }, [types, onUpdate]);
}
