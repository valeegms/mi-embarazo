"use client";

import { useState, useEffect } from "react";
import AppointmentsTable from "@/components/ui/AppointmentsTable";
import CitasModal from "@/components/ui/CitasModal";
import Input from "@/components/ui/Input";
import DeleteModal from "@/components/ui/DeleteModal";
import { format, parse } from "date-fns";

export interface Appointment {
  record: string;
  patient: string;
  patient_name: string;
  doctor: string;
  file: string | null;
  date: string;
  time: string;
  date_type: string;
  status: string;
  weight: number;
  bloodPressure: string;
  fetalHeartRate: string;
  fetalStatus: string;
  observations: string;
  prescription: string;
}

const LOCAL_STORAGE_KEY = "appointments";

// Lista de citas proporcionada (solo para demostración inicial)
const APPOINTMENTS_LIST = [
  {
    record: "6748971a777c453dbdce3341_2024-11-28T00:00:00_3:35",
    patient: "6748971a777c453dbdce3341",
    patient_name: "John Doe",
    doctor: "67462520590b948ba552ab57",
    file: null,
    date: "2024-11-28T00:00:00",
    time: "3:35",
    date_type: "Nueva Cita",
    status: "Confirmada",
    weight: 0.0,
    bloodPressure: "",
    fetalHeartRate: "",
    fetalStatus: "",
    observations: "",
    prescription: "",
  }
];

export default function CitasPage({ role }: { role: "doctor" | "admin" }) {
  const [isCitasModalOpen, setIsCitasModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedAppointment, setSelectedAppointment] = useState<Appointment | undefined>(undefined);
  const [appointments, setAppointments] = useState<Appointment[]>([]);

  // Cargar las citas desde localStorage o usar las citas por defecto
  useEffect(() => {
    const storedAppointments = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (storedAppointments) {
      // Si hay citas en localStorage, las cargamos y las transformamos
      const parsedAppointments: Appointment[] = JSON.parse(storedAppointments);
      setAppointments(parsedAppointments);
    } else {
      // Si no hay citas en localStorage, usar las citas por defecto
      setAppointments(APPOINTMENTS_LIST);
    }
  }, []);

  // Función para limpiar citas antes de almacenarlas
  const cleanAppointment = (appointment: Appointment) => {
    return {
      ...appointment,
      file: appointment.file ? null : undefined, // Limpiar 'file' si no es necesario
    };
  };

  // Función para guardar citas en localStorage
  const saveAppointmentsToLocalStorage = (appointments: Appointment[]) => {
    // Limpiar cada cita antes de almacenarla
    const cleanedAppointments = appointments.map(cleanAppointment);

    // Guardar en localStorage
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(cleanedAppointments));
  };

  const handleNewAppointment = () => {
    setSelectedAppointment(undefined);
    setIsCitasModalOpen(true);
  };

  const handleEditAppointment = (appointment: Appointment) => {
    setSelectedAppointment(appointment);
    setIsCitasModalOpen(true);
  };

  const handleDeleteAppointment = (appointment: Appointment) => {
    const updatedAppointments = appointments.filter((appt) => appt.record !== appointment.record);
    setAppointments(updatedAppointments);
    saveAppointmentsToLocalStorage(updatedAppointments);
    setIsDeleteModalOpen(true);
  };

  const handleSaveAppointment = (editedAppointment: Appointment) => {
    
    setAppointments((prev) => {
      const index = prev.findIndex(
        (appt) => appt.record === editedAppointment.record
      );
      let updatedAppointments;
      if (index !== -1) {
        // Si la cita ya existe, la actualizamos
        updatedAppointments = [...prev];
        updatedAppointments[index] = editedAppointment;
      } else {
        // Si es una nueva cita, la agregamos
        updatedAppointments = [...prev, editedAppointment];
      }

      // Guardar las citas en localStorage después de la actualización
      saveAppointmentsToLocalStorage(updatedAppointments);

      return updatedAppointments;
    });
    
    setIsCitasModalOpen(false);
  };

  return (
    <main>
      <section className="flex justify-between items-center pb-2">
        <h1 className="text-3xl font-bold">Citas</h1>
        <button
          className="bg-[--primary-color] text-white rounded-md p-2 px-8"
          onClick={handleNewAppointment} // Este botón abre el modal para crear una nueva cita
        >
          Nueva cita
        </button>
      </section>
      <Input name="search" placeholder="Buscar cita" type="search" />

      <AppointmentsTable
        appointments={appointments}
        onEdit={handleEditAppointment}
        onDelete={handleDeleteAppointment}
        role={role}
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
        onSave={handleSaveAppointment} // Este es el botón que guarda la cita
      />
    </main>
  );
}
