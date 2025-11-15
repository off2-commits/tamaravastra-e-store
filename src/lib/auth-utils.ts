// Simple encryption for credentials (base64 + simple XOR for obfuscation)
const SECRET_KEY = 'tamaravastra_admin_secret';

function simpleHash(str: string): string {
  // Simple hash function for verification
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash; // Convert to 32bit integer
  }
  return Math.abs(hash).toString(16);
}

// Store hashed credentials (User: admin76, Password: ajt76)
const ADMIN_CREDENTIALS = {
  username: 'admin76',
  // Hash of "admin76:ajt76" for comparison
  credentialHash: simpleHash('admin76:ajt76'),
};

export function verifyAdminLogin(username: string, password: string): boolean {
  if (username !== ADMIN_CREDENTIALS.username) {
    return false;
  }
  
  const submittedHash = simpleHash(`${username}:${password}`);
  return submittedHash === ADMIN_CREDENTIALS.credentialHash;
}

export function setAdminSession(token: string): void {
  sessionStorage.setItem('admin_token', token);
}

export function getAdminSession(): string | null {
  return sessionStorage.getItem('admin_token');
}

export function clearAdminSession(): void {
  sessionStorage.removeItem('admin_token');
}

export function isAdminLoggedIn(): boolean {
  return getAdminSession() !== null;
}

export function generateAdminToken(): string {
  return btoa(`admin_${Date.now()}_${Math.random()}`);
}
