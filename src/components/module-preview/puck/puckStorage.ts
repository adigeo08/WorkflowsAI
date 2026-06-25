import type { Data } from '@measured/puck';

const DB_NAME = 'workflows-ai-puck';
const STORE_NAME = 'puck-data';
const DB_VERSION = 1;

export const ecommercePuckStorageKey = 'workflows-ai:puck:ecommerce-data';
export const landingPuckStorageKey = 'workflows-ai:puck:landing-data';

const openPuckDb = () => new Promise<IDBDatabase | null>((resolve) => {
  if (typeof window === 'undefined' || !('indexedDB' in window)) {
    resolve(null);
    return;
  }

  const request = indexedDB.open(DB_NAME, DB_VERSION);
  request.onupgradeneeded = () => {
    if (!request.result.objectStoreNames.contains(STORE_NAME)) {
      request.result.createObjectStore(STORE_NAME);
    }
  };
  request.onsuccess = () => resolve(request.result);
  request.onerror = () => resolve(null);
});

export const loadPuckData = async <TData extends Data>(key: string, fallbackData: TData): Promise<TData> => {
  const db = await openPuckDb();
  if (!db) return fallbackData;

  return new Promise<TData>((resolve) => {
    const request = db.transaction(STORE_NAME, 'readonly').objectStore(STORE_NAME).get(key);
    request.onsuccess = () => resolve((request.result as TData | undefined) ?? fallbackData);
    request.onerror = () => resolve(fallbackData);
  });
};

export const savePuckData = async (key: string, data: Data) => {
  const db = await openPuckDb();
  if (!db) return;

  await new Promise<void>((resolve) => {
    const request = db.transaction(STORE_NAME, 'readwrite').objectStore(STORE_NAME).put(data, key);
    request.onsuccess = () => resolve();
    request.onerror = () => resolve();
  });
};

export const resetPuckData = async (key: string) => {
  const db = await openPuckDb();
  if (!db) return;

  await new Promise<void>((resolve) => {
    const request = db.transaction(STORE_NAME, 'readwrite').objectStore(STORE_NAME).delete(key);
    request.onsuccess = () => resolve();
    request.onerror = () => resolve();
  });
};
