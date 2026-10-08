/**
 * Safely opens or downloads documents (PDF, DOC, DOCX, images) in the browser.
 * Fixes Chrome/Edge blank PDF viewer issue with Blob URLs by writing an embedded HTML viewer wrapper.
 */

export function getDocumentBlob(url: string): { blob: Blob; mime: string; blobUrl: string } | null {
  if (!url || typeof window === 'undefined') return null;

  try {
    if (url.startsWith('data:')) {
      const parts = url.split(',');
      if (parts.length < 2) return null;

      const mimeMatch = parts[0].match(/:(.*?);/);
      let mime = mimeMatch ? mimeMatch[1] : 'application/pdf';
      const cleanBase64 = parts[1].replace(/\s/g, '');
      const binaryStr = atob(cleanBase64);
      const len = binaryStr.length;
      const bytes = new Uint8Array(len);

      for (let i = 0; i < len; i++) {
        bytes[i] = binaryStr.charCodeAt(i);
      }

      const blob = new Blob([bytes], { type: mime });
      const blobUrl = URL.createObjectURL(blob);
      return { blob, mime, blobUrl };
    }

    if (url.startsWith('blob:')) {
      return { blob: new Blob([], { type: 'application/pdf' }), mime: 'application/pdf', blobUrl: url };
    }
  } catch (err) {
    console.error('Error generating document blob:', err);
  }

  return null;
}

export function downloadResumeDocument(url?: string, fileName: string = 'Resume.pdf') {
  if (!url || typeof window === 'undefined') return;

  const docBlob = getDocumentBlob(url);
  const downloadUrl = docBlob ? docBlob.blobUrl : url;

  const a = document.createElement('a');
  a.href = downloadUrl;
  a.download = fileName || 'Resume.pdf';
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
}

export function openResumeDocument(url?: string, fileName: string = 'Resume.pdf') {
  if (!url || typeof window === 'undefined') return;

  const lowerName = (fileName || '').toLowerCase();
  const isDocx = lowerName.endsWith('.docx') || lowerName.endsWith('.doc');

  // Word documents cannot be rendered natively by browser PDF engines - download directly
  if (isDocx) {
    downloadResumeDocument(url, fileName);
    return;
  }

  // Handle Base64 Data URL or Blob
  if (url.startsWith('data:') || url.startsWith('blob:')) {
    const docData = getDocumentBlob(url);
    if (!docData) {
      downloadResumeDocument(url, fileName);
      return;
    }

    const { blobUrl, mime } = docData;

    // Open a new dedicated viewer window
    const viewerWindow = window.open('', '_blank');

    if (!viewerWindow || viewerWindow.closed || typeof viewerWindow.closed === 'undefined') {
      // Pop-up blocked: fallback to direct download
      downloadResumeDocument(url, fileName);
      return;
    }

    // Write a clean, high-performance HTML document viewer wrapper
    viewerWindow.document.write(`
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>${fileName} - ZANSTA Document Viewer</title>
        <style>
          * { margin: 0; padding: 0; box-sizing: border-box; }
          body, html {
            height: 100%;
            width: 100%;
            overflow: hidden;
            background-color: #0b0b0e;
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
            color: #f5f2ed;
          }
          .toolbar {
            height: 52px;
            background-color: #121217;
            border-bottom: 1px solid rgba(255, 255, 255, 0.1);
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: 0 20px;
            z-index: 10;
          }
          .title-box {
            display: flex;
            align-items: center;
            gap: 10px;
            font-size: 14px;
            font-weight: 600;
            letter-spacing: 0.2px;
          }
          .badge {
            background: rgba(139, 13, 26, 0.2);
            color: #ff4d61;
            border: 1px solid rgba(139, 13, 26, 0.4);
            padding: 2px 8px;
            border-radius: 6px;
            font-size: 11px;
            font-family: monospace;
          }
          .actions {
            display: flex;
            align-items: center;
            gap: 12px;
          }
          .btn {
            background-color: #8B0D1A;
            color: #ffffff;
            border: none;
            padding: 7px 16px;
            border-radius: 8px;
            font-size: 12px;
            font-weight: 600;
            cursor: pointer;
            text-decoration: none;
            display: inline-flex;
            align-items: center;
            gap: 6px;
            transition: all 0.2s ease;
          }
          .btn:hover {
            background-color: #a31222;
            transform: translateY(-1px);
          }
          .btn-secondary {
            background-color: rgba(255, 255, 255, 0.08);
            color: #f5f2ed;
            border: 1px solid rgba(255, 255, 255, 0.12);
          }
          .btn-secondary:hover {
            background-color: rgba(255, 255, 255, 0.15);
          }
          .content-frame {
            width: 100%;
            height: calc(100% - 52px);
            border: none;
            display: block;
            background: #18181b;
          }
          .fallback-box {
            display: none;
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            text-align: center;
            padding: 30px;
            background: #121217;
            border: 1px solid rgba(255, 255, 255, 0.1);
            border-radius: 16px;
          }
        </style>
      </head>
      <body>
        <div class="toolbar">
          <div class="title-box">
            <span>📄 ${fileName}</span>
            <span class="badge">VERIFIED RESUME</span>
          </div>
          <div class="actions">
            <button onclick="window.print()" class="btn btn-secondary">🖨 Print</button>
            <a href="${blobUrl}" download="${fileName}" class="btn">⬇ Download PDF</a>
          </div>
        </div>

        <iframe
          src="${blobUrl}#toolbar=1&navpanes=0&scrollbar=1"
          class="content-frame"
          title="${fileName}"
          onerror="document.getElementById('fallback').style.display='block'"
        ></iframe>

        <div id="fallback" class="fallback-box">
          <h3 style="margin-bottom: 8px;">Document Preview</h3>
          <p style="font-size: 13px; color: rgba(245, 242, 237, 0.6); margin-bottom: 16px;">
            If the preview does not display automatically in your browser:
          </p>
          <a href="${blobUrl}" download="${fileName}" class="btn">Download Document</a>
        </div>
      </body>
      </html>
    `);

    viewerWindow.document.close();
    return;
  }

  // Handle standard HTTP / HTTPS or external URLs
  const win = window.open(url, '_blank', 'noopener,noreferrer');
  if (!win) {
    downloadResumeDocument(url, fileName);
  }
}
