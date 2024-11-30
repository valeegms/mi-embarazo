"use client";

import { useState, useEffect } from "react";
import AppointmentsTable from "@/components/ui/AppointmentsTable";
import CitasModal from "@/components/ui/CitasModal";
import Input from "@/components/ui/Input";
import DeleteModal from "@/components/ui/DeleteModal";
import {
  getAllAppointments,
  getAppointmentByDoctor,
} from "@/src/services/citasService";
import { AppointmentModel } from "@/src/models/AppointmentModel";
import { getAllPatients } from "@/src/services/pacienteService";
import { PatientModel } from "@/src/models/PatientModel";

const LOCAL_STORAGE_KEY = "appointments";

export default function CitasPage({ role }: { role: "doctor" | "admin" }) {
  const [isLoading, setIsLoading] = useState(true);
  const [isCitasModalOpen, setIsCitasModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedAppointment, setSelectedAppointment] = useState<
    AppointmentModel | undefined
  >(undefined);
  const [appointments, setAppointments] = useState<AppointmentModel[]>([]);
  const [availablePatients, setAvailablePatients] = useState<PatientModel[]>(
    []
  );
  const [shouldRefetch, setShouldRefetch] = useState(false);
  const [searchQuery, setSearchQuery] = useState<string>("");

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const [appointmentsData, patientsData] = await Promise.all([
          getAllAppointments(),
          getAllPatients(),
        ]);
        setAppointments(appointmentsData);
        setAvailablePatients(patientsData);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [shouldRefetch]);

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(appointments));
  }, [appointments]);

  const handleNewAppointment = () => {
    setSelectedAppointment(undefined);
    setIsCitasModalOpen(true);
  };

  const handleEditAppointment = (appointment: AppointmentModel) => {
    setSelectedAppointment(appointment);
    setIsCitasModalOpen(true);
  };

  //TODO: Implementar función handleDeleteAppointment
  const handleDeleteAppointment = (appointment: AppointmentModel) => {
    setAppointments((prev) =>
      prev.filter((appt) => appt.record !== appointment.record)
    );
    setIsDeleteModalOpen(true);
  };

  const filteredAppointments = appointments.filter((appointment) => {
    const patientName = appointment.patient_name.toLowerCase();
    const appointmentDate = appointment.date.toLowerCase();
    const status = appointment.status.toLowerCase();
    const record = appointment.record.toLowerCase();
    const searchTerm = searchQuery.toLowerCase();

    // Check if search term matches any of the relevant fields
    return (
      patientName.includes(searchTerm) ||
      appointmentDate.includes(searchTerm) ||
      status.includes(searchTerm) ||
      record.includes(searchTerm)
    );
  });

  return (
    <main>
      <section className="flex justify-between items-center pb-2">
        <h1 className="text-3xl font-bold">Citas</h1>
        <button
          className="bg-[--primary-color] text-white rounded-md p-2 px-8"
          onClick={handleNewAppointment}
        >
          Nueva cita
        </button>
      </section>
      <Input
        name="search"
        placeholder="Buscar cita"
        type="search"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />

      <AppointmentsTable
        appointments={filteredAppointments}
        onEdit={handleEditAppointment}
        onDelete={handleDeleteAppointment}
        role={role} // Asegúrate de pasar role aquí
        isLoading={isLoading}
      />

      <DeleteModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        title="Eliminar cita"
        message="¿Estás seguro que deseas eliminar esta cita? Esta acción no se puede deshacer."
      />

      <CitasModal
        isOpen={isCitasModalOpen}
        onClose={() => setIsCitasModalOpen(false)}
        appointment={selectedAppointment}
        availablePatients={availablePatients}
        setShouldRefetch={setShouldRefetch}
      />
    </main>
  );
}
