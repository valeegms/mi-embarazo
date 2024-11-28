const API_BASE_URL = "http://localhost:8000";

export type Appointment = {
  name: string;
  record: string;
  date: string;
  time: string;
  date_type: string;
  status: string;
  patient: string;  // Propiedad "patient" obligatoria
};


export interface AppointmentsError {
  detail: string;
}

export async function doctorCitasService(doctorId: string): Promise<Appointment[]> {
  try {

    console.log("Doctor: " + doctorId);
    
    const accessToken = localStorage.getItem("access_token"); // Lee el token del almacenamiento local
    if (!accessToken) {
      throw new Error("Access token no encontrado");
    }else{
        console.log("Token encontrado.")
    }


    // Realiza una solicitud GET al endpoint específico para las citas de un doctor
    const response = await fetch(`${API_BASE_URL}/appointments/doctors`, {
      method: "GET",
      headers: {
        "Authorization": `Bearer ${accessToken}`, // Incluye el token aquí
        "Content-Type": "application/json",
      },
    });

    // Verifica si la respuesta es exitosa
    if (!response.ok) {
      const error: AppointmentsError = await response.json();
      throw new Error(error.detail || "Failed to fetch appointments");
    }

    // Convierte la respuesta a JSON y la retorna como un arreglo de citas
    const appointments: Appointment[] = await response.json();
    console.log("Lista de citas:", appointments);
    return appointments;
  } catch (error) {
    console.error("Error al obtener citas:", error);
    throw error; // Relanza el error para manejo adicional
  }
}