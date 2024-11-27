import api from "./api"; // Asegúrate de que `api` esté configurado, o usa fetch si lo prefieres

export interface DashboardCounts {
  doctors: number;
  patients: number;
  appointments: number;
}

export const fetchDashboardCounts = async (): Promise<DashboardCounts> => {
  try {
    const response = await api.get("/dashboard/counts"); // Cambia el endpoint si es necesario
    return response.data as DashboardCounts; // Aseguramos que la respuesta sea del tipo esperado
  } catch (error) {
    console.error("Error fetching dashboard counts:", error);
    throw new Error("No se pudo obtener el conteo del dashboard");
  }
};
