import { AppointmentDetailsModel, AppointmentModel } from "../models/AppointmentModel";
import { API_BASE_URL, getHeaders } from "./apiConfig";

export interface AppointmentsError {
  detail: string;
}

export async function getAllAppointments(): Promise<AppointmentModel[]> {
  try {
    const response = await fetch(`${API_BASE_URL}/appointments`, {
      method: "GET",
      headers: getHeaders(),
    });

    // Verifica si la respuesta es exitosa
    if (!response.ok) {
      const error: AppointmentsError = await response.json();
      throw new Error(error.detail || "Failed to fetch appointments");
    }

    // Convierte la respuesta a JSON y la retorna como un arreglo de citas
    const appointments: AppointmentModel[] = await response.json();
    console.log("Lista de citas:", appointments);
    return appointments;
  } catch (error) {
    console.error("Error al obtener citas:", error);
    throw error; // Relanza el error para manejo adicional
  }
}

export async function getAppointmentByDoctor(status?: string): Promise<AppointmentModel[]> {
  try {
    const response = await fetch(`${API_BASE_URL}/appointments/doctors`, {
      method: "GET",
      headers: getHeaders(),
    });

    // Verifica si la respuesta es exitosa
    if (!response.ok) {
      const error: AppointmentsError = await response.json();
      throw new Error(error.detail || "Failed to fetch appointments");
    }

    // Convierte la respuesta a JSON y la retorna como un arreglo de citas
    const appointments: AppointmentModel[] = await response.json();
    if(status) {
      return appointments.filter((appointment) => appointment.status === status);
    }
    console.log("Lista de citas:", appointments);
    return appointments;
  } catch (error) {
    console.error("Error al obtener citas:", error);
    throw error; // Relanza el error para manejo adicional
  }
}

export async function saveAppointmentDetails(appointment: AppointmentDetailsModel) {
  try {
    const response = await fetch(`${API_BASE_URL}/appointments`, {
      method: "POST",
      headers: getHeaders(),
      body: JSON.stringify(appointment),
    });

    if (!response.ok) {
      throw new Error("Error creating appointment");
    }

    return await response.json();
  } catch (error) {
    console.error("Error al crear detalles de cita:", error);
    throw error; // Relanza el error para manejo adicional
  }
}

export async function saveAppointmentId(patientId: unknown, appointment_id: unknown, appointment_date: string) {
  try {
    const response = await fetch(`${API_BASE_URL}/patients/${patientId}/appointments`, {
      method: "PUT",
      headers: getHeaders(),
      body: JSON.stringify({ appointment_id, appointment_date }),
    });

    if (!response.ok) {
      throw new Error("Error saving appointment ID");
    }

    return await response.json();
  } catch (error) {
    console.error("Error al guardar ID de cita:", error);
    throw error; // Relanza el error para manejo adicional
  }
}

export async function updateAppointmentDetails(id: string, appointment: AppointmentDetailsModel) {
  try {
    const response = await fetch(`${API_BASE_URL}/appointments/${id}`, {
      method: "PUT",
      headers: getHeaders(),
      body: JSON.stringify(appointment),
    });

    if (!response.ok) {
      throw new Error("Error updating appointment");
    }

    return await response.json();
  } catch (error) {
    console.error("Error al obtener citas:", error);
    throw error; // Relanza el error para manejo adicional
  }
}

