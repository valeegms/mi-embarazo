import { API_BASE_URL, getHeaders, handleResponse } from "./apiConfig";
import { PatientModel } from "@/src/models/PatientModel";

export async function getPacientes(): Promise<PatientModel[]> {
  console.log(API_BASE_URL);
  try {
    const res = await fetch(`${API_BASE_URL}/patients`);
    if (!res.ok) {
      throw new Error("Error al obtener la lista de pacientes");
    }
    return await res.json();
  } catch (error) {
    console.error("Error en getPacientes:", error);
    throw error;
  }
}



export async function getPatientById(id: string) {
    try {
        const response = await fetch(`${API_BASE_URL}/patients/${id}`, {
          method: "GET",
          headers: getHeaders(),
        });
    
        // Verifica si la respuesta es exitosa
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.detail || "Failed to fetch appointments");
      }

      // Convierte la respuesta a JSON y la retorna como un arreglo de citas
      const patient: PatientModel = await response.json();
      return patient;
      } catch (error) {
        console.error("Error al obtener citas:", error);
        throw error;
      }
}

export async function savePatientDetails(id: string, patient: PatientModel) {
  try {
    const response = await fetch(`${API_BASE_URL}/patients/${id}`, {
      method: "PUT",
      headers: getHeaders(),
      body: JSON.stringify(patient),
    });

    return handleResponse(response);
  } catch (error) {
    console.error("Error al obtener citas:", error);
    throw error; // Relanza el error para manejo adicional
  }
}