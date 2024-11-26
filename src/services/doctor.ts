// src/services/doctorService.ts

import { DoctorModel } from "@/models/DoctorModel";
import api from "./api"; // Axios or |fetch setup

// Fetch all doctors
export const fetchDoctors = async () => {
  const response = await api.get("/doctors");
  return response.data;
};

// Add a new doctor
export const addDoctor = async (doctor: DoctorModel) => {
  const response = await api.post("/doctors", doctor);
  return response.data;
};

// Update a doctor
export const updateDoctor = async (id: string, doctor: DoctorModel) => {
  const response = await api.put(`/doctors/${id}`, doctor);
  return response.data;
};

// Delete a doctor
export const deleteDoctor = async (id: string) => {
  const response = await api.delete(`/doctors/${id}`);
  return response.data;
};
