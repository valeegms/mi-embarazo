"use client";

import { useState } from "react";
import { username } from "../layout";
import Card from "../../../components/ui/Card";
import Badge from "../../../components/ui/Badge";
import Appointment from "../../../components/ui/Appointment";
import { OpenInNewRounded } from "@mui/icons-material";

import ControlPrenatalForm from "../../../components/ControlPrenatalFrom";

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

const initialFormData = {
  weight: "",
  bloodPressure: "",
  fetalHeartRate: "",
  fetalStatus: "",
  observations: "",
  prescription: "",
};

export default function DashboardPage() {
  const [appointments, setAppointments] = useState(appointmentsArray);
  const [formData, setFormData] = useState(initialFormData);
  const [isEditing, setIsEditing] = useState(false);

  const handleEditClick = () => setIsEditing((prev) => !prev);

  appointments.sort((a, b) => (a.time > b.time ? 1 : -1));

  const [currentPatient, setCurrentPatient] = useState<null | {
    name: string;
    time: string;
    status: boolean;
    tipo: string;
    lastAppointment: string;
    record: string;
  }>(null);

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
            className="flex-1"
            title={
              currentPatient ? `Notas de ${currentPatient?.name}` : "Notas"
            }
            action={
              currentPatient && (
                <div className="space-x-2">
                  <button
                    onClick={handleEditClick}
                    className="
                    bg-[--primary-color] text-white rounded-md py-1 px-4 hover:bg-[#db51d4]
                  "
                  >
                    {isEditing ? "Guardar" : "Editar"}
                  </button>
                  <Tooltip title="Ver expediente" placement="top-start">
                    <button
                      className="border border-[--primary-color] text-[--primary-color] rounded-md py-1 px-2 hover:bg-[#f7d0f4]"
                      aria-label="Ver expediente"
                      onClick={() =>
                        window.open(
                          `/doctor/pacientes/${currentPatient?.record}`,
                          "_blank"
                        )
                      }
                    >
                      <OpenInNewRounded fontSize="inherit" />
                    </button>
                  </Tooltip>
                </div>
              )
            }
          >
            {currentPatient && (
              <div className="h-96 overflow-auto">
                <ControlPrenatalForm
                  formData={formData}
                  updateData={setFormData}
                  isEditing={isEditing}
                />
              </div>
            )}
          </Card>
        </section>
      </article>
    </main>
  );
}
