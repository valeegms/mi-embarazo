"use client";

import { useState } from "react";
import AppointmentsTable from "../../../components/ui/AppointmentsTable";
import CitasModal from "../../../components/ui/CitasModal";
import Input from "../../../components/ui/Input";
import { redirect } from "next/navigation";


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

export default function CitasPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
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

  const isAuthenticated = JSON.parse(localStorage.getItem('isAuthenticated') || 'false');
  
  if (!isAuthenticated) {
    // Redirect to login if the user is not authenticated
    redirect("/login");
  }
  
  const handleNewAppointment = () => {
    setAppointment(undefined);
    setIsModalOpen(true);
  };

  const handleEditAppointment = (appointment: (typeof appointments)[0]) => {
    setAppointment(appointment);
    setIsModalOpen(true);
  };

  const handleDeleteAppointment = (appointment: (typeof appointments)[0]) => {
    // TODO: Delete appointment
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

      <CitasModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        appointment={appointment}
      />
    </main>
  );
}
