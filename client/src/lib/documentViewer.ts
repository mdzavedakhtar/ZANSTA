/**
 * Safely opens or downloads a document (PDF, DOC, images) in the browser.
 * Handles both base64 Data URLs and standard HTTP/HTTPS URLs.
 * Prevents Chrome/Edge 'Not allowed to navigate top frame to data: URL' blocking by using Blob URLs.
 */
export function openResumeDocument(url?: string, fileName: string = 'Resume.pdf') {
  if (!url || typeof window === 'undefined') return;

  // Handle Base64 Data URLs
  if (url.startsWith('data:')) {
    try {
      const parts = url.split(',');
      const mimeMatch = parts[0].match(/:(.*?);/);
      const mime = mimeMatch ? mimeMatch[1] : 'application/pdf';
      const base64Data = parts[1];
      const binaryStr = atob(base64Data);
      const len = binaryStr.length;
      const bytes = new Uint8Array(len);

      for (let i = 0; i < len; i++) {
        bytes[i] = binaryStr.charCodeAt(i);
      }

      const blob = new Blob([bytes], { type: mime });
      const blobUrl = URL.createObjectURL(blob);

      // Try opening in new tab
      const newTab = window.open(blobUrl, '_blank');
      if (!newTab || newTab.closed || typeof newTab.closed === 'undefined') {
        // If popup was blocked or failed, trigger automatic download
        const a = document.createElement('a');
        a.href = blobUrl;
        a.download = fileName || 'Resume.pdf';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
      }

      // Cleanup object URL after 1 minute
      setTimeout(() => URL.revokeObjectURL(blobUrl), 60000);
      return;
    } catch (err) {
      console.error('Failed to parse base64 document:', err);
    }
  }

  // Handle standard HTTP / HTTPS or relative URLs
  const win = window.open(url, '_blank', 'noopener,noreferrer');
  if (!win) {
    const a = document.createElement('a');
    a.href = url;
    a.download = fileName || 'Resume.pdf';
    a.target = '_blank';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  }
}

