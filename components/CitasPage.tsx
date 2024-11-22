"use client";

import { useState, useEffect } from "react";
import AppointmentsTable from "./ui/AppointmentsTable";
import CitasModal from "./ui/CitasModal";
import Input from "./ui/Input";
import DeleteModal from "./ui/DeleteModal";

const LOCAL_STORAGE_KEY = "appointments";

export default function CitasPage({  }: { role: "doctor" | "admin" }) {
  const [isCitasModalOpen, setIsCitasModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedAppointment, setSelectedAppointment] = useState<
    | {
        name: string;
        record: string;
        date: string;
        time: string;
        type: string;
        status: string;
      }
    | undefined
  >(undefined);

  const [appointments, setAppointments] = useState<
    {
      name: string;
      record: string;
      date: string;
      time: string;
      type: string;
      status: string;
    }[]
  >([]);

  // Load appointments from localStorage when the component mounts
  useEffect(() => {
    const storedAppointments = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (storedAppointments) {
      setAppointments(JSON.parse(storedAppointments));
    }
  }, []);

  // Save appointments to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(appointments));
  }, [appointments]);

  const handleNewAppointment = () => {
    setSelectedAppointment(undefined);
    setIsCitasModalOpen(true);
  };

  const handleEditAppointment = (appointment: typeof appointments[0]) => {
    setSelectedAppointment(appointment);
    setIsCitasModalOpen(true);
  };

  const handleDeleteAppointment = (appointment: typeof appointments[0]) => {
    setAppointments((prev) =>
      prev.filter((appt) => appt.record !== appointment.record)
    );
    setIsDeleteModalOpen(true);
  };

  const handleSaveAppointment = (editedAppointment: typeof appointments[0]) => {
    setAppointments((prev) => {
      const index = prev.findIndex(
        (appt) => appt.record === editedAppointment.record
      );
      if (index !== -1) {
        // Update existing appointment
        const updated = [...prev];
        updated[index] = editedAppointment;
        return updated;
      }
      // Add new appointment
      return [...prev, editedAppointment];
    });
    setIsCitasModalOpen(false);
  };

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
      <Input name="search" placeholder="Buscar cita" type="search" />

      <AppointmentsTable
        appointments={appointments}
        onEdit={handleEditAppointment}
        onDelete={handleDeleteAppointment}
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
        onSave={handleSaveAppointment}
      />
    </main>
  );
}
