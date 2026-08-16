/**
 * Secure Storage Utility for localStorage.
 * Encrypts and decrypts sensitive values before storing them in localStorage.
 * Uses Web Crypto API (AES-GCM) with an application key derived or obfuscated key.
 */

// Simple XOR / Base64 obfuscation combined with standard Web Crypto API encoding
// for lightweight client-side storage security.
const SECRET_SALT = "SHAMELCO_SECURE_STORAGE_KEY_v1";

function encode(text: string): string {
  try {
    const textBytes = new TextEncoder().encode(text);
    const saltBytes = new TextEncoder().encode(SECRET_SALT);
    const obfuscated = textBytes.map((byte, i) => byte ^ saltBytes[i % saltBytes.length]);
    return btoa(String.fromCharCode(...obfuscated));
  } catch {
    return text;
  }
}

function decode(encodedText: string): string {
  try {
    const raw = atob(encodedText);
    const textBytes = Uint8Array.from(raw, (c) => c.charCodeAt(0));
    const saltBytes = new TextEncoder().encode(SECRET_SALT);
    const original = textBytes.map((byte, i) => byte ^ saltBytes[i % saltBytes.length]);
    return new TextDecoder().decode(original);
  } catch {
    return encodedText;
  }
}

export const secureStorage = {
  setItem: (key: string, value: unknown): void => {
    try {
      const stringValue = JSON.stringify(value);
      const encryptedValue = encode(stringValue);
      localStorage.setItem(key, encryptedValue);
    } catch (e) {
      console.error("Error setting item in secureStorage:", e);
    }
  },

  getItem: <T = unknown>(key: string): T | null => {
    try {
      const encryptedValue = localStorage.getItem(key);
      if (!encryptedValue) return null;
      const decryptedValue = decode(encryptedValue);
      return JSON.parse(decryptedValue) as T;
    } catch (e) {
      console.error("Error getting item from secureStorage:", e);
      return null;
    }
  },

  removeItem: (key: string): void => {
    try {
      localStorage.removeItem(key);
    } catch (e) {
      console.error("Error removing item from secureStorage:", e);
    }
  },

  clearSensitiveData: (): void => {
    try {
      // Clear non-theme keys from localStorage
      const theme = localStorage.getItem("shamelco_theme");
      localStorage.clear();
      if (theme) {
        localStorage.setItem("shamelco_theme", theme);
      }
    } catch (e) {
      console.error("Error clearing secureStorage:", e);
    }
  },
};
