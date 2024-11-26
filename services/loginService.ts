const API_BASE_URL = "http://localhost:8000";

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

export async function loginService(email: string, password: string): Promise<LoginResponse> {
  try {
    //solicitud al backend con el email y password
    const response = await fetch(`${API_BASE_URL}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        username: email,
        password: password,
      }),
    });

    //se valida si la respuesta fue exitosa
    if (!response.ok) {
      const error: LoginError = await response.json();
      throw new Error(error.detail || "Login failed");
    }

    //reetorna los datos exitosos
    const data: LoginResponse = await response.json();
    return data;
  } catch (error) {
    console.error("Error en loginService:", error);
    throw error; // Lanza el error para manejarlo en LoginPage
  }
}
