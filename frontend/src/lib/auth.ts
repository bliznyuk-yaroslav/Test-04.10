export const getToken = () =>
  typeof window !== 'undefined' ? localStorage.getItem('token') : null;
export const setToken = (t: string) => {
  if (typeof window !== 'undefined') localStorage.setItem('token', t);
};
export const clearToken = () => {
  if (typeof window !== 'undefined') localStorage.removeItem('token');
};
export const isAuthed = () => !!getToken();

export const getEmail = () =>
  typeof window !== 'undefined' ? localStorage.getItem('email') : null;
export const setEmail = (e: string) => {
  if (typeof window !== 'undefined') localStorage.setItem('email', e);
};
export const clearEmail = () => {
  if (typeof window !== 'undefined') localStorage.removeItem('email');
};

// Cookie helpers for SSR guard
export const setAuthCookie = (token: string) => {
  if (typeof document !== 'undefined') {
    // 7-day expiry; SameSite=Lax so redirects work; path=/ for all routes
    const maxAge = 7 * 24 * 60 * 60;
    document.cookie = `token=${encodeURIComponent(token)}; Max-Age=${maxAge}; Path=/; SameSite=Lax`;
  }
};

export const clearAuthCookie = () => {
  if (typeof document !== 'undefined') {
    document.cookie = `token=; Max-Age=0; Path=/; SameSite=Lax`;
  }
};
