/**
 * Persistent Video Storage Engine using Browser IndexedDB
 * Allows Yuvraj to upload MP4 video files once, and have them
 * permanently stored and played every time the website is opened.
 */

const DB_NAME = 'YuvrajPortfolioDB';
const DB_VERSION = 1;
const STORE_NAME = 'videos';

export interface StoredVideoData {
  reelId: string;
  blob?: Blob;
  url?: string;
  fileName?: string;
  brandName?: string;
  title?: string;
  hook?: string;
  updatedAt: number;
}

const openDB = (): Promise<IDBDatabase> => {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION);

    request.onupgradeneeded = () => {
      const db = request.result;
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME, { keyPath: 'reelId' });
      }
    };

    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
};

export const saveVideoToDB = async (data: StoredVideoData): Promise<void> => {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(STORE_NAME, 'readwrite');
    const store = tx.objectStore(STORE_NAME);
    const req = store.put({ ...data, updatedAt: Date.now() });

    req.onsuccess = () => resolve();
    req.onerror = () => reject(req.error);
  });
};

export const getVideoFromDB = async (reelId: string): Promise<StoredVideoData | null> => {
  try {
    const db = await openDB();
    return new Promise((resolve, reject) => {
      const tx = db.transaction(STORE_NAME, 'readonly');
      const store = tx.objectStore(STORE_NAME);
      const req = store.get(reelId);

      req.onsuccess = () => resolve(req.result || null);
      req.onerror = () => reject(req.error);
    });
  } catch (err) {
    console.error('Failed to load video from IndexedDB:', err);
    return null;
  }
};

export const getAllStoredVideos = async (): Promise<Record<string, StoredVideoData>> => {
  try {
    const db = await openDB();
    return new Promise((resolve, reject) => {
      const tx = db.transaction(STORE_NAME, 'readonly');
      const store = tx.objectStore(STORE_NAME);
      const req = store.getAll();

      req.onsuccess = () => {
        const results: Record<string, StoredVideoData> = {};
        (req.result || []).forEach((item: StoredVideoData) => {
          results[item.reelId] = item;
        });
        resolve(results);
      };
      req.onerror = () => reject(req.error);
    });
  } catch (err) {
    console.error('Failed to get all videos from IndexedDB:', err);
    return {};
  }
};

export const deleteVideoFromDB = async (reelId: string): Promise<void> => {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(STORE_NAME, 'readwrite');
    const store = tx.objectStore(STORE_NAME);
    const req = store.delete(reelId);

    req.onsuccess = () => resolve();
    req.onerror = () => reject(req.error);
  });
};
