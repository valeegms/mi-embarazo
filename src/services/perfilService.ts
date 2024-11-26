import api from "./api";

export const fetchProfile = async (id: string, role:string) => {
  try {
    //solicitud al backend con el email y password
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/doctors/by_id`, {
      method: "GET",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/x-www-form-urlencoded",
        "Authorization": `Bearer ${localStorage.getItem("accessToken")}`,
      },
    //   body: new URLSearchParams({
    //     username: email,
    //     password: password,
    //   }),
    });

    //se valida si la respuesta fue exitosa
    if (!response.ok) {
      const error: string = await response.json();
      throw new Error(error || "Fetch doctor failed");
    }

    //reetorna los datos exitosos
    const data: string = await response.json();
    return data;
  } catch (error) {
    console.error("Error en perfilService:", error);
    throw error; // Lanza el error para manejarlo en LoginPage
  }
}