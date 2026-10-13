/**
 * Client-Side Image Compression Utility
 * Resizes and compresses images using HTML5 Canvas before uploading or caching.
 * Transforms 3MB-10MB images into ~40KB-120KB WebP/JPEG strings.
 */

export interface CompressionResult {
  dataUrl: string;
  originalSize: number;
  compressedSize: number;
  originalSizeFormatted: string;
  compressedSizeFormatted: string;
  savingsPercent: number;
}

export function formatFileSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
}

export async function compressImage(
  file: File,
  options: {
    maxWidth?: number;
    maxHeight?: number;
    quality?: number;
  } = {}
): Promise<CompressionResult> {
  const { maxWidth = 1280, maxHeight = 1280, quality = 0.8 } = options;

  // For SVG files, preserve clean vector markup without canvas rasterization
  if (file.type === 'image/svg+xml') {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => {
        const dataUrl = reader.result as string;
        resolve({
          dataUrl,
          originalSize: file.size,
          compressedSize: file.size,
          originalSizeFormatted: formatFileSize(file.size),
          compressedSizeFormatted: formatFileSize(file.size),
          savingsPercent: 0,
        });
      };
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  }

  return new Promise((resolve, reject) => {
    const img = new Image();
    const objectUrl = URL.createObjectURL(file);

    img.onload = () => {
      URL.revokeObjectURL(objectUrl);

      let { width, height } = img;

      // Scale down proportionally if larger than maximum boundary
      if (width > maxWidth || height > maxHeight) {
        if (width / height > maxWidth / maxHeight) {
          height = Math.round((height * maxWidth) / width);
          width = maxWidth;
        } else {
          width = Math.round((width * maxHeight) / height);
          height = maxHeight;
        }
      }

      const canvas = document.createElement('canvas');
      canvas.width = Math.max(1, width);
      canvas.height = Math.max(1, height);

      const ctx = canvas.getContext('2d');
      if (!ctx) {
        const reader = new FileReader();
        reader.onload = () => {
          const dataUrl = reader.result as string;
          resolve({
            dataUrl,
            originalSize: file.size,
            compressedSize: file.size,
            originalSizeFormatted: formatFileSize(file.size),
            compressedSizeFormatted: formatFileSize(file.size),
            savingsPercent: 0,
          });
        };
        reader.onerror = reject;
        reader.readAsDataURL(file);
        return;
      }

      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = 'high';
      ctx.drawImage(img, 0, 0, width, height);

      // Try modern WebP first
      let dataUrl = canvas.toDataURL('image/webp', quality);
      if (!dataUrl.startsWith('data:image/webp')) {
        dataUrl = canvas.toDataURL('image/jpeg', quality);
      }

      // If still larger than 250KB (~330,000 characters), compress further
      if (dataUrl.length > 330000) {
        dataUrl = canvas.toDataURL('image/jpeg', 0.65);
      }

      // Approximate byte size from Base64 string
      const compressedBytes = Math.round((dataUrl.length * 3) / 4);
      const savings = Math.max(0, Math.round(((file.size - compressedBytes) / file.size) * 100));

      resolve({
        dataUrl,
        originalSize: file.size,
        compressedSize: compressedBytes,
        originalSizeFormatted: formatFileSize(file.size),
        compressedSizeFormatted: formatFileSize(compressedBytes),
        savingsPercent: savings,
      });
    };

    img.onerror = (err) => {
      URL.revokeObjectURL(objectUrl);
      reject(err);
    };

    img.src = objectUrl;
  });
}
