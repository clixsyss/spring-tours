// Firebase initialization and helpers for Spring Tours
// 1. Go to your Firebase project settings → "General" → "Web apps"
// 2. Copy the config object and either:
//    - Replace the placeholder values below directly, OR
//    - Preferably, put them in environment variables (REACT_APP_FIREBASE_*)
// 3. Make sure Firebase Storage is enabled and that you have rules allowing read access
//    for the folders you want to expose publicly.

import { initializeApp } from "firebase/app";
import { getStorage, ref, listAll, getDownloadURL } from "firebase/storage";

// Option A: use environment variables (recommended)
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY || "YOUR_API_KEY_HERE",
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN || "YOUR_AUTH_DOMAIN_HERE",
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID || "YOUR_PROJECT_ID_HERE",
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET || "YOUR_STORAGE_BUCKET_HERE",
  messagingSenderId:
    process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID || "YOUR_MESSAGING_SENDER_ID_HERE",
  appId: process.env.REACT_APP_FIREBASE_APP_ID || "YOUR_APP_ID_HERE",
};

// Initialize Firebase app (safe to call once)
const app = initializeApp(firebaseConfig);

// Export a Storage instance
export const storage = getStorage(app);

/**
 * List all image file URLs inside a given folder in Firebase Storage.
 *
 * @param {string} folderPath - The path to the folder, e.g. "cruises/sphinx/gallery"
 * @returns {Promise<string[]>} Array of download URLs for all items in the folder.
 */
export async function listFolderImageUrls(folderPath) {
  const folderRef = ref(storage, folderPath);
  const result = await listAll(folderRef);

  // Filter just items (files), ignore subfolders
  const urlPromises = result.items.map((itemRef) => getDownloadURL(itemRef));
  const urls = await Promise.all(urlPromises);

  return urls;
}

