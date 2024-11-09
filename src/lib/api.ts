const API_BASE_URL = process.env.API_BASE_URL

if (!API_BASE_URL) {
  throw new Error('API_BASE_URL is not defined in environment variables')
}

type APIResponse<T> = {
  status: boolean
  message: string
  data?: T
}

export async function fetchFromAPI<T>(endpoint: string, options: RequestInit = {}): Promise<APIResponse<T>> {
  const url = `${API_BASE_URL}${endpoint}`

  const response = await fetch(url, {
    ...options,
    headers: {
      ...options.headers,
      'Content-Type': 'application/json',
    },
  })

  const data: APIResponse<T> = await response.json()

  if (!response.ok) {
    throw new Error(data.message || `HTTP error! status: ${response.status}`)
  }

  if (!data.status) {
    throw new Error(data.message || 'An error occurred')
  }

  return data
}