import { API_BASE_URL, getHeaders, handleResponse } from './apiConfig';

export interface LoginResponse {
  access_token: string;
  user_email: string;
  user_id: string;
  user_last_name: string;
  user_name: string;
  user_profile_image: string;
}

export interface LoginError {
  detail: string;
}

export const loginService = async (email: string, password: string): Promise<LoginResponse> => {
  try {
    const response = await fetch(`${API_BASE_URL}/login`, {
      method: "POST",
      headers: getHeaders("application/x-www-form-urlencoded"),
      body: new URLSearchParams({
        username: email,
        password: password,
      }),
    });

    return handleResponse<LoginResponse>(response);
  } catch (error) {
    console.error("Error en loginService:", error);
    throw error; // Lanza el error para manejarlo en LoginPage
  }
};
