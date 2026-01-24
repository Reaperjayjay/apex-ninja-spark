// AUTOMATICALLY SWITCH: Uses localhost if you are running locally, 
// otherwise uses your live Vercel Backend.
export const API_BASE_URL = window.location.hostname === 'localhost'
    ? "http://localhost:8000"
    : "https://apex-news-ninja-backend.vercel.app";

export type ApiError = {
    message: string;
    status: number;
};

async function handleResponse<T>(response: Response): Promise<T> {
    if (!response.ok) {
        const errorBody = await response.json().catch(() => ({}));
        throw {
            message: errorBody.detail || errorBody.message || "An error occurred",
            status: response.status,
        } as ApiError;
    }
    return response.json();
}

export const api = {
    get: async <T>(endpoint: string): Promise<T> => {
        const response = await fetch(`${API_BASE_URL}${endpoint}`);
        return handleResponse<T>(response);
    },

    post: async <T>(endpoint: string, data: any): Promise<T> => {
        const response = await fetch(`${API_BASE_URL}${endpoint}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        });
        return handleResponse<T>(response);
    },

    put: async <T>(endpoint: string, data: any): Promise<T> => {
        const response = await fetch(`${API_BASE_URL}${endpoint}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        });
        return handleResponse<T>(response);
    },

    delete: async <T>(endpoint: string): Promise<T> => {
        const response = await fetch(`${API_BASE_URL}${endpoint}`, {
            method: "DELETE",
        });
        return handleResponse<T>(response);
    },
};