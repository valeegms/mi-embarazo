"use client";

import { useState, useEffect } from "react";
import AppointmentsTable from "@/components/ui/AppointmentsTable";
import CitasModal from "@/components/ui/CitasModal";
import Input from "@/components/ui/Input";
import DeleteModal from "@/components/ui/DeleteModal";
import { format, parse } from "date-fns";
import { Appointment } from "@/src/services/doctorCitasService";
import {
  getAllAppointments,
  getAppointmentByDoctor,
} from "@/src/services/citasService";

const LOCAL_STORAGE_KEY = "appointments";

const citas: Appointment[] = [
  {
    patient_name: "Ana López",
    record: "REC123456",
    date: "2024-11-30",
    time: "10:00 AM",
    date_type: "Consulta general",
    status: "Confirmada",
    patient: "1",
  },
  {
    patient_name: "María Fernández",
    record: "REC654322",
    date: "2024-12-01",
    time: "02:00 PM",
    date_type: "Control prenatal",
    status: "Confirmada",
    patient: "2",
  },
  {
    patient_name: "Carla Gómez",
    record: "REC789012",
    date: "2024-11-25",
    time: "04:00 PM",
    date_type: "Control prenatal",
    status: "Confirmada",
    patient: "3",
  },
];

// Function to get the patient's name by their ID
async function getPatientNameById(patientId: string): Promise<string> {
  try {
    const res = await fetch(`http://localhost:8000/patients/${patientId}`);
    if (!res.ok) throw new Error("Error al obtener el paciente");
    const patient = await res.json();
    return patient.personalData?.name || "Nombre no disponible";
  } catch (error) {
    console.error("Error al obtener el nombre del paciente:", error);
    return "Error al obtener el nombre";
  }
}

export default function CitasPage({ role }: { role: "doctor" | "admin" }) {
  const [isCitasModalOpen, setIsCitasModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedAppointment, setSelectedAppointment] = useState<
    Appointment | undefined
  >(undefined);
  const [appointments, setAppointments] = useState<Appointment[]>([]);

  const updateAppointment = async (appointment: Appointment) => {
    const appointmentId = appointment.record;
    const accessToken = localStorage.getItem("accessToken");

    try {
      const response = await fetch(
        `http://localhost:8000/appointments/${appointmentId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
          body: JSON.stringify(appointment),
        }
      );

      if (!response.ok) {
        throw new Error("Error al actualizar la cita");
      }

      const updatedAppointment = await response.json();
      console.log("Cita actualizada con éxito", updatedAppointment);
    } catch (error) {
      console.error("Error al realizar la solicitud PUT:", error);
    }
  };

  // Fetch appointments and transform them
  useEffect(() => {
    setAppointments(citas);
    // const fetchAppointments = async () => {
    //   try {
    //     let fetchedAppointments;
    //     if (role === "doctor") {
    //       fetchedAppointments = await getAppointmentByDoctor();
    //     } else {
    //       fetchedAppointments = await getAllAppointments();
    //     }

    //     // Transform appointments
    //     const transformedAppointments = await Promise.all(
    //       fetchedAppointments.map(async (appointment) => {
    //         const formattedDate = new Date(appointment.date);
    //         const formattedDateString = formattedDate.toLocaleDateString(
    //           "es-ES",
    //           {
    //             year: "numeric",
    //             month: "2-digit",
    //             day: "2-digit",
    //           }
    //         );

    //         const normalizeTime = (time: string): string => {
    //           const hasAmPm = /[APap][Mm]$/.test(time);
    //           if (hasAmPm) {
    //             const parsedTime = parse(time, "hh:mm a", new Date());
    //             return format(parsedTime, "HH:mm");
    //           }
    //           return time;
    //         };

    //         const translateType = (type: string): string => {
    //           switch (type) {
    //             case "Consultation":
    //               return "Nuevo paciente";
    //             case "virtual":
    //               return "Virtual";
    //             case "presencial":
    //               return "Presencial";
    //             default:
    //               return type;
    //           }
    //         };

    //         const translateStatus = (status: string): string => {
    //           switch (status) {
    //             case "pending":
    //               return "Pendiente";
    //             case "Scheduled":
    //               return "Confirmada";
    //             default:
    //               return status;
    //           }
    //         };

    //         return {
    //           ...appointment,
    //           date: formattedDateString,
    //           time: normalizeTime(appointment.time),
    //           type: translateType(appointment.date_type),
    //           status: translateStatus(appointment.status),
    //         };
    //       })
    //     );

    //     setAppointments(transformedAppointments);
    //   } catch (error) {
    //     console.error("Error al obtener las citas:", error);
    //   }
    // };

    // fetchAppointments();
  }, []);

  useEffect(() => {
    // Save appointments to localStorage whenever they change
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(appointments));
  }, [appointments]);

  const handleNewAppointment = () => {
    setSelectedAppointment(undefined);
    setIsCitasModalOpen(true);
  };

  const handleEditAppointment = (appointment: Appointment) => {
    setSelectedAppointment(appointment);
    setIsCitasModalOpen(true);
  };

  const handleDeleteAppointment = (appointment: Appointment) => {
    setAppointments((prev) =>
      prev.filter((appt) => appt.record !== appointment.record)
    );
    setIsDeleteModalOpen(true);
  };

  const handleSaveAppointment = (editedAppointment: Appointment) => {
    setAppointments((prev) => {
      const index = prev.findIndex(
        (appt) => appt.record === editedAppointment.record
      );
      if (index !== -1) {
        const updated = [...prev];
        updated[index] = editedAppointment;

        updateAppointment(editedAppointment);

        return updated;
      }
      return [...prev, editedAppointment]; // Add new appointment
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
        role={role} // Asegúrate de pasar role aquí
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
