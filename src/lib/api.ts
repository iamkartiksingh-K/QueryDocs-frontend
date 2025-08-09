import { setLoggedIn } from "@/app/_utils/auth-client";
const api_url = process.env.NEXT_PUBLIC_API_URL;

// Enhanced error handling
export class ApiError extends Error {
  constructor(
    message: string,
    public status: number,
    public data?: any
  ) {
    super(message);
    this.name = 'ApiError';
  }
}

// Generic API request wrapper
async function apiRequest(url: string, options: RequestInit = {}) {
  try {
    const response = await fetch(url, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      credentials: 'include',
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => null);
      throw new ApiError(
        errorData?.detail || errorData?.message || `HTTP ${response.status}`,
        response.status,
        errorData
      );
    }

    return await response.json();
  } catch (error) {
    if (error instanceof ApiError) {
      throw error;
    }
    throw new ApiError('Network error or server unavailable', 0);
  }
}

export const login = async (email: string, password: string) => {
  const formData = new FormData();
  formData.append("username", email);
  formData.append("password", password);
  
  try {
    const response = await fetch(`${api_url}/auth/login`, {
      method: "POST",
      body: formData,
      credentials: "include",
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => null);
      throw new ApiError(
        errorData?.detail || 'Invalid email or password',
        response.status,
        errorData
      );
    }

    const data = await response.json();
    const status = await setLoggedIn(true, data.access_token);
    return status;
  } catch (error) {
    if (error instanceof ApiError) {
      throw error;
    }
    throw new ApiError('Login failed. Please try again.', 0);
  }
};

export const register = async (
  name: string,
  email: string,
  password: string,
) => {
  try {
    const response = await fetch(`${api_url}/auth/register`, {
      method: "POST",
      body: JSON.stringify({
        name,
        email,
        password,
      }),
      headers: {
        "content-type": "application/json",
      },
      credentials: "include",
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => null);
      throw new ApiError(
        errorData?.detail || 'Registration failed',
        response.status,
        errorData
      );
    }

    const data = await response.json();
    const status = await setLoggedIn(true, data.access_token);
    return status;
  } catch (error) {
    if (error instanceof ApiError) {
      throw error;
    }
    throw new ApiError('Registration failed. Please try again.', 0);
  }
};

export const getProfile = async () => {
  try {
    const response = await fetch("/api/profile", {
      credentials: 'include',
    });

    if (!response.ok) {
      throw new ApiError('Failed to load profile', response.status);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    if (error instanceof ApiError) {
      throw error;
    }
    throw new ApiError('Failed to load user profile', 0);
  }
};

// Document API functions
export const uploadDocument = async (file: File) => {
  const formData = new FormData();
  formData.append('file', file);

  try {
    const response = await fetch(`${api_url}/files/upload/`, {
      method: 'POST',
      body: formData,
      credentials: 'include',
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => null);
      throw new ApiError(
        errorData?.detail || 'Upload failed',
        response.status,
        errorData
      );
    }

    return await response.json();
  } catch (error) {
    if (error instanceof ApiError) {
      throw error;
    }
    throw new ApiError('Upload failed. Please try again.', 0);
  }
};

export const getDocuments = async (page = 1) => {
  return apiRequest(`/api/documents?page=${page}`);
};

export const deleteDocument = async (documentId: string) => {
  return apiRequest('/api/documents', {
    method: 'DELETE',
    body: JSON.stringify({ document_id: documentId }),
  });
};

export const searchDocuments = async (keyword: string) => {
  return apiRequest(`/api/search?keyword=${encodeURIComponent(keyword)}`);
};

export const askQuestion = async (query: string) => {
  return apiRequest('/api/chat', {
    method: 'POST',
    body: JSON.stringify({ query }),
  });
};
