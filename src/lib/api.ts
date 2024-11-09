const API_BASE_URL = process.env.API_BASE_URL;

export async function fetchFromAPI(endpoint: string, options: RequestInit = {}) {
  const url = `${API_BASE_URL}${endpoint}`;
  const isFormData = options.body instanceof FormData;

  const response = await fetch(url, {
    ...options,
    headers: {
      ...options.headers,
      ...(isFormData ? {} : { 'Content-Type': 'application/json' }), // Only set Content-Type for JSON
    },
  });

  const data = await response.json();

  if (!data.status) { // assuming status is a boolean
    throw new Error(data.message || 'An error occurred');
  }

  return data;
}
