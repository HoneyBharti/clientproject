const FALLBACK_API_BASE_URL = "http://localhost:5000/api";

export const normalizeApiBaseUrl = (value?: string) => {
  const trimmedValue = (value || FALLBACK_API_BASE_URL).trim().replace(/\/+$/, "");
  return trimmedValue.endsWith("/api") ? trimmedValue : `${trimmedValue}/api`;
};

export const API_BASE_URL = normalizeApiBaseUrl(process.env.NEXT_PUBLIC_API_URL);
