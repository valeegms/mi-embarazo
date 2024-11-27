const API_BASE_URL = "http://localhost:8000";

export interface Patient {
  _id: string;
  record: string | null;
  name: string | null;
  personalData: {
    name: string;
    gender: string | null;
    phone: string | null;
    age: number | null;
    birthDate: string | null;
    email: string | null;
    password: string | null;
    curp: string | null;
    maritalStatus: string | null;
    occupation: string | null;
    address: string | null;
  };
  current_phone: string | null;
  doctor_options: string[] | null;
  schedule_options: string[] | null;
  doctor: string | null;
  date: string | null;
}

export async function getPatientsService(): Promise<Patient[]> {
  const accessToken = localStorage.getItem("accessToken");

  try {
    // Realiza una solicitud GET al endpoint para obtener los pacientes
    const response = await fetch(`${API_BASE_URL}/patients`, {
      method: "GET",
      headers: {
        "Authorization": `Bearer ${accessToken}`, // Incluye el token de autorización
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Error al obtener la lista de pacientes");
    }

    const data: Patient[] = await response.json();
    return data;
  } catch (error) {
    console.error("Error en getPatientsService:", error);
    throw error;
  }
}
