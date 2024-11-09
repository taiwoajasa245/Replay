
const API_BASE_URL = process.env.API_BASE_URL; 

export async function fetchFromAPI(endpoint: string, options: RequestInit = {}) {
  const url = `${API_BASE_URL}${endpoint}`;
  const response = await fetch(url, {
    ...options,
    headers: {
      ...options.headers,
      'Content-Type': 'application/json',
    },
  });

  const data = await response.json();

  if (data.status !== 'true') {
    throw new Error( data.message || 'An error occurred');
  }

  return data;
}