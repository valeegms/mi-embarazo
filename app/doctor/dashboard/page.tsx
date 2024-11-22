"use client";

import { useState } from "react";
import { username } from "../layout";
import Card from "../../../components/ui/Card";
import Badge from "../../../components/ui/Badge";
import Appointment from "../../../components/ui/Appointment";
import { OpenInNewRounded } from "@mui/icons-material";
import { Button, IconButton, Tooltip } from "@mui/material";

import Input from "../../../components/ui/Input";
import TextField from "../../../components/ui/TextField";

const currentDate = new Date().toLocaleDateString("es-ES", {
  year: "numeric",
  month: "long",
  day: "numeric",
});

const appointmentsArray = [
  {
    name: "Emanuela Bagundo Chavez",
    time: "16:00",
    status: false,
    tipo: "Seguimiento",
    lastAppointment: "12 de octubre del 2024",
    record: "3454",
  },
  {
    name: "Hebertina de Jesús Negron May",
    time: "17:30",
    status: false,
    tipo: "Primera consulta",
    lastAppointment: "3 de septiembre del 2024",
    record: "3455",
  },
  // ... other appointments
];

export default function DashboardPage() {
  const [appointments, setAppointments] = useState(appointmentsArray);
  const [newNote, setNewNote] = useState("");
  const [isNoteSaved, setIsNoteSaved] = useState(false);

  appointments.sort((a, b) => (a.time > b.time ? 1 : -1));

  const [currentPatient, setCurrentPatient] = useState<null | {
    name: string;
    time: string;
    status: boolean;
    tipo: string;
    lastAppointment: string;
    record: string;
  }>(null);

  const handleNewNote = (e: any) => {
    if (e.target.textContent === "Editar") {
      setIsNoteSaved(false);
      return;
    }
    setNewNote(newNote);
    setIsNoteSaved(true);
  };

  const handleAppointmentClick = (appointment) => {
    if (currentPatient?.name === appointment.name) {
      setCurrentPatient(null); // Ends the current appointment
    } else {
      setCurrentPatient(appointment); // Starts a new appointment
    }
  };

  return (
    <main>
      <h1 className="text-3xl font-bold">Bienvenido/a {username},</h1>
      <p className="text-gray-400 font-light pt-1">
        Revisa la información general sobre el paciente y las próximas citas.
      </p>
      <article>
        <section className="flex space-x-8 pt-8">
          <Card
            title="Citas programadas"
            action={<Badge type="primary">{currentDate}</Badge>}
            className="flex-1"
          >
            <div className="space-y-4 h-96 overflow-auto">
              {appointments.length > 0 ? (
                appointments.map((appointment, index) => (
                  <Appointment
                    key={index}
                    name={appointment.name}
                    time={appointment.time}
                    status={currentPatient?.name === appointment.name}
                    onClick={() => handleAppointmentClick(appointment)}
                  />
                ))
              ) : (
                <p>No hay citas programadas</p>
              )}
            </div>
          </Card>
          <Card
            title={
              currentPatient?.name ||
              "No hay pacientes en consulta en este momento"
            }
            subtitle={"Última cita el " + currentPatient?.lastAppointment}
            action={
              currentPatient && (
                <div className="space-x-1">
                  <Badge type="secondary">{currentPatient?.tipo}</Badge>
                  <Tooltip title="Ver expediente" placement="top-start">
                    <IconButton
                      aria-label="Ver expediente"
                      size="small"
                      style={{ color: "var(--primary-color)" }}
                      onClick={() => window.open(`/doctor/pacientes/${currentPatient?.record}`,"_blank") //aqui te lleva al expediente
                      }
                    >
                      <OpenInNewRounded fontSize="inherit" />
                    </IconButton>
                  </Tooltip>
                </div>
              )
            }
            className="flex-1"
          >
            {currentPatient ? (
              <div className="space-y-4 px-4">
                <Input
                  name="etapa-gestacion"
                  label="Etapa de gestación"
                  type="text"
                  value="12 semanas"
                  disabled
                />
                <Input
                  name="fecha-estimada-parto"
                  label="Fecha estimada de parto"
                  type="date"
                  value="2022-12-12"
                  disabled
                />
                <TextField
                  name="observaciones-pasadas"
                  label="Observaciones pasadas"
                  value="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam eget nunc nec nisl ultricies ultricies. Nullam eget nunc nec nisl ultricies"
                  disabled
                />
              </div>
            ) : (
              <p className="text-gray-400">
                No hay pacientes en consulta en este momento
              </p>
            )}
          </Card>
        </section>
        {currentPatient && (
          <section className={` pt-8`}>
            <TextField
              name="nueva-nota"
              label={`Nueva nota para ${currentPatient?.name}`}
              value={newNote}
              disabled={isNoteSaved}
              onChange={(e) => setNewNote(e.target.value)}
            />
            <div className="flex gap-x-6 ">
              <Button
                className="flex-1"
                variant="contained"
                color="secondary"
                onClick={(e) => handleNewNote(e)}
              >
                {isNoteSaved ? "Editar" : "Guardar"}
              </Button>
            </div>
          </section>
        )}
      </article>
    </main>
  );
}
