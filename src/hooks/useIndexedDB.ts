import { useCallback } from 'react';
import { seedUsers } from '@/mocks/data/users';
import { seedRoles } from '@/mocks/data/roles';
import { seedPermissions } from '@/mocks/data/permissions';

const DB_NAME = 'ai_finance_platform';
const DB_VERSION = 1;

interface StoreConfig {
  name: string;
  keyPath: string;
  data: unknown[];
}

function openDB(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION);

    request.onupgradeneeded = () => {
      const db = request.result;

      if (!db.objectStoreNames.contains('users')) {
        db.createObjectStore('users', { keyPath: 'id' });
      }
      if (!db.objectStoreNames.contains('roles')) {
        db.createObjectStore('roles', { keyPath: 'id' });
      }
      if (!db.objectStoreNames.contains('permissions')) {
        db.createObjectStore('permissions', { keyPath: 'id' });
      }
    };

    request.onsuccess = () => {
      resolve(request.result);
    };

    request.onerror = () => {
      reject(request.error);
    };
  });
}

function importData(db: IDBDatabase, storeName: string, data: unknown[]): Promise<void> {
  return new Promise((resolve, reject) => {
    const transaction = db.transaction(storeName, 'readwrite');
    const store = transaction.objectStore(storeName);

    for (const item of data) {
      store.put(item);
    }

    transaction.oncomplete = () => resolve();
    transaction.onerror = () => reject(transaction.error);
  });
}

function clearStore(db: IDBDatabase, storeName: string): Promise<void> {
  return new Promise((resolve, reject) => {
    const transaction = db.transaction(storeName, 'readwrite');
    const store = transaction.objectStore(storeName);
    const request = store.clear();

    request.onsuccess = () => resolve();
    request.onerror = () => reject(request.error);
  });
}

const STORES: StoreConfig[] = [
  { name: 'users', keyPath: 'id', data: seedUsers },
  { name: 'roles', keyPath: 'id', data: seedRoles },
  { name: 'permissions', keyPath: 'id', data: seedPermissions },
];

export function useIndexedDB() {
  const initDB = useCallback(async () => {
    const db = await openDB();

    for (const store of STORES) {
      await importData(db, store.name, store.data);
    }

    db.close();
    console.log('[IndexedDB] Database initialized with seed data');
  }, []);

  const clearDB = useCallback(async () => {
    const db = await openDB();

    for (const store of STORES) {
      await clearStore(db, store.name);
    }

    db.close();
    console.log('[IndexedDB] Database cleared');
  }, []);

  const resetDB = useCallback(async () => {
    await clearDB();
    await initDB();
    console.log('[IndexedDB] Database reset complete');
  }, [clearDB, initDB]);

  return { initDB, clearDB, resetDB };
}
