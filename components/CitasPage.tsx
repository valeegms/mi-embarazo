"use client";

import { useState } from "react";
import AppointmentsTable from "./ui/AppointmentsTable";
import CitasModal from "./ui/CitasModal";
import Input from "./ui/Input";
import DeleteModal from "./ui/DeleteModal";

// TODO: Replace with real data
const appointments = [
  {
    name: "Chapell Roan",
    record: "EXP-2345",
    date: "22 de octubre",
    time: "14:30",
    type: "Nuevo paciente",
    status: "Confirmada",
  },
  {
    name: "Shanik Berman",
    record: "EXP-6789",
    date: "22 de octubre",
    time: "17:30",
    type: "Seguimiento",
    status: "Confirmada",
  },
  {
    name: "Shanik Berman",
    record: "EXP-6789",
    date: "22 de octubre",
    time: "19:00",
    type: "Seguimiento",
    status: "Cancelada",
  },
];

export default function CitasPage({ role }: { role: "doctor" | "admin" }) {
  const [isCitasModalOpen, setIsCitasModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [appointment, setAppointment] = useState<
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

  const handleNewAppointment = () => {
    setAppointment(undefined);
    setIsCitasModalOpen(true);
  };

  const handleEditAppointment = (appointment: (typeof appointments)[0]) => {
    setAppointment(appointment);
    setIsCitasModalOpen(true);
  };

  const handleDeleteAppointment = (appointment: (typeof appointments)[0]) => {
    // TODO: Delete appointment
    setIsDeleteModalOpen(true);
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
        appointment={appointment}
      />
    </main>
  );
}
