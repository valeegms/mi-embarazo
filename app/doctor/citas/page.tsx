"use client";

import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import CitasModal from "../../../components/ui/CitasModal";
import { Edit } from "@mui/icons-material";
import Badge from "../../../components/ui/Badge";
import { useState } from "react";
import Input from "../../../components/ui/Input";

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

// Badge color mapping
const getTypeChipColor = (
  type: string
): { color: "warning" | "secondary" | "primary" } => {
  switch (type) {
    case "Nuevo paciente":
      return { color: "warning" }; // Yellow
    case "Seguimiento":
      return { color: "secondary" }; // Light Blue
    default:
      return { color: "primary" };
  }
};

const getStatusChipColor = (
  status: string
): { color: "success" | "danger" | "primary" } => {
  switch (status) {
    case "Confirmada":
      return { color: "success" }; // Green
    case "Cancelada":
      return { color: "danger" }; // Red
    default:
      return { color: "primary" };
  }
};

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

  const handleNewAppointment = () => {
    setAppointment(undefined);
    setIsModalOpen(true);
  };

  const handleEditAppointment = (appointment: (typeof appointments)[0]) => {
    setAppointment(appointment);
    setIsModalOpen(true);
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

      <TableContainer component={Paper} className="pt-6">
        <Table aria-label="appointments table">
          <TableHead>
            <TableRow>
              <TableCell>
                <strong>Nombre del paciente</strong>
              </TableCell>
              <TableCell>
                <strong>No. Expediente</strong>
              </TableCell>
              <TableCell>
                <strong>Fecha de cita</strong>
              </TableCell>
              <TableCell>
                <strong>Hora de cita</strong>
              </TableCell>
              <TableCell>
                <strong>Tipo de cita</strong>
              </TableCell>
              <TableCell>
                <strong>Estado</strong>
              </TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {appointments.map((appointment, index) => (
              <TableRow key={index}>
                <TableCell>{appointment.name}</TableCell>
                <TableCell>{appointment.record}</TableCell>
                <TableCell>{appointment.date}</TableCell>
                <TableCell>{appointment.time}</TableCell>
                <TableCell>
                  <Badge type={getTypeChipColor(appointment.type).color}>
                    {appointment.type}
                  </Badge>
                </TableCell>
                <TableCell>
                  <Badge type={getStatusChipColor(appointment.status).color}>
                    {appointment.status}
                  </Badge>
                </TableCell>
                <TableCell>
                  <button
                    className="bg-yellow-100 px-2 py-1 rounded text-yellow-800 hover:bg-yellow-600 hover:bg-opacity-25"
                    onClick={() => handleEditAppointment(appointment)}
                  >
                    <Edit />
                  </button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <CitasModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        appointment={appointment}
      />
    </main>
  );
}
