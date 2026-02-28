// Firebase initialization and helpers for Spring Tours
// 1. Go to your Firebase project settings → "General" → "Web apps"
// 2. Copy the config object and either:
//    - Replace the placeholder values below directly, OR
//    - Preferably, put them in environment variables (REACT_APP_FIREBASE_*)
// 3. Make sure Firebase Storage is enabled and that you have rules allowing read access
//    for the folders you want to expose publicly.

import { initializeApp } from "firebase/app";
import { getStorage, ref, listAll, getDownloadURL } from "firebase/storage";
import { getFirestore, collection, doc, getDoc, getDocs, query, where } from "firebase/firestore";

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

// Export Storage and Firestore
export const storage = getStorage(app);
export const db = getFirestore(app);

export const TRAVEL_PACKAGES_COLLECTION = "travelPackages";

/** Categories matching the Travel Packages nav (and dashboard dropdown). */
export const PACKAGE_CATEGORIES = [
  "All Tours",
  "City Breaks",
  "Classic Egypt Tours",
  "Coptic/Islamic Culture",
  "Nile Cruises",
  "Red sea Beach Breaks",
];

/**
 * Fetch all travel packages from Firestore, optionally filtered by category.
 * @param {string} [category] - If provided and not "All Tours", only packages with this category are returned.
 * @returns {Promise<Array<{ id: string, title: string, description: string, code: string, category: string, imageURL: string }>>}
 */
export async function getTravelPackages(category) {
  const col = collection(db, TRAVEL_PACKAGES_COLLECTION);
  const q =
    category && category !== "All Tours"
      ? query(col, where("category", "==", category))
      : col;
  const snapshot = await getDocs(q);
  return snapshot.docs.map((d) => ({ id: d.id, ...d.data() }));
}

/**
 * Fetch a single travel package by ID.
 * @param {string} id - Firestore document ID
 * @returns {Promise<{ id: string, title: string, ... } | null>}
 */
export async function getTravelPackageById(id) {
  if (!id) return null;
  const d = await getDoc(doc(db, TRAVEL_PACKAGES_COLLECTION, id));
  return d.exists() ? { id: d.id, ...d.data() } : null;
}

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

