"use client";

import { useState } from "react";
import AppointmentsTable from "../../../components/ui/AppointmentsTable";
import { username } from "../layout";
import CitasModal from "../../../components/ui/CitasModal";
import Card from "../../../components/ui/Card";
import {
  CalendarTodayRounded,
  FaceRounded,
  GroupRounded,
} from "@mui/icons-material";
import DeleteModal from "../../../components/ui/DeleteModal";

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

export default function DashboardPage() {
  const [isCitaModalOpen, setIsCitaModalOpen] = useState(false);
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
    setIsCitaModalOpen(true);
  };

  const handleEditAppointment = (appointment: (typeof appointments)[0]) => {
    setAppointment(appointment);
    setIsCitaModalOpen(true);
  };

  const handleDeleteAppointment = (appointment: (typeof appointments)[0]) => {
    // TODO: Delete appointment
    console.log("Deleting appointment", appointment);
    setIsDeleteModalOpen(true);
  };

  return (
    <main>
      <h1 className="text-3xl font-bold">Bienvenido/a {username},</h1>
      <p className="text-gray-400 font-light pt-1">
        Revisa la información general sobre el paciente y las próximas citas.
      </p>
      <section className="flex gap-4 my-6">
        <Card className="flex-1 py-10">
          <div className="flex justify-between items-center">
            <div>
              <small className="font-semibold">Doctores</small>
              <h2 className="text-5xl font-bold text-black">10</h2>
            </div>
            <FaceRounded className="text-[--primary-color] text-6xl" />
          </div>
        </Card>
        <Card className="flex-1 py-10">
          <div className="flex justify-between items-center">
            <div>
              <small className="font-semibold">Pacientes</small>
              <h2 className="text-5xl font-bold text-black">50</h2>
            </div>
            <GroupRounded className="text-[--primary-color] text-6xl" />
          </div>
        </Card>
        <Card className="flex-1 py-10">
          <div className="flex justify-between items-center">
            <div>
              <small className="font-semibold">Citas</small>
              <h2 className="text-5xl font-bold text-black">100</h2>
            </div>
            <CalendarTodayRounded className="text-[--primary-color] text-6xl" />
          </div>
        </Card>
      </section>
      <button
        className="bg-[--primary-color] text-white rounded-md p-2 px-8 float-right mb-4"
        onClick={handleNewAppointment}
      >
        Agendar nueva cita
      </button>
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
        isOpen={isCitaModalOpen}
        onClose={() => setIsCitaModalOpen(false)}
        appointment={appointment}
      />
    </main>
  );
}
