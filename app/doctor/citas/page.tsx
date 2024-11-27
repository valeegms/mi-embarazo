"use client";

import { useState, useEffect } from "react";
import AppointmentsTable from "@/components/ui/AppointmentsTable";
import CitasModal from "@/components/ui/CitasModal";
import Input from "@/components/ui/Input";
import DeleteModal from "@/components/ui/DeleteModal";
import { format, parse } from "date-fns";
import { doctorCitasService, Appointment } from "@/services/doctorCitasService";

const LOCAL_STORAGE_KEY = "appointments";

// Function to get the patient's name by their ID
async function getPatientNameById(patientId: string): Promise<string> {
  const res = await fetch(`http://localhost:8000/patients/${patientId}`);
  const patient = await res.json();
  return patient.personalData?.name || "Nombre no disponible";
}

export default function CitasPage({}: { role: "doctor" | "admin" }) {
  const [isCitasModalOpen, setIsCitasModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedAppointment, setSelectedAppointment] = useState<Appointment | undefined>(undefined);
  const [appointments, setAppointments] = useState<Appointment[]>([]);

  const updateAppointment = async (appointment: Appointment) => {
    const appointmentId = appointment.record;
    const accessToken = localStorage.getItem("accessToken");
    
    try {
      const response = await fetch(`http://localhost:8000/appointments/${appointmentId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`, // Include the token
        },
        body: JSON.stringify(appointment),
      });

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
    const fetchAppointments = async () => {
      try {
        const doctorId = "673e14067c3287ff191e3fc8"; // Replace with dynamic doctor ID
        const fetchedAppointments = await doctorCitasService(doctorId);

        // Transform appointments
        const transformedAppointments = await Promise.all(
          fetchedAppointments.map(async (appointment) => {
            const patientName = await getPatientNameById(appointment.name);

            const formattedDate = new Date(appointment.date);
            const formattedDateString = formattedDate.toLocaleDateString("es-ES", {
              year: "numeric",
              month: "2-digit",
              day: "2-digit",
            });

            const normalizeTime = (time: string): string => {
              const hasAmPm = /[APap][Mm]$/.test(time);
              if (hasAmPm) {
                const parsedTime = parse(time, "hh:mm a", new Date());
                return format(parsedTime, "HH:mm");
              }
              return time;
            };

            const translateType = (type: string): string => {
              switch (type) {
                case "Consultation":
                  return "Nuevo paciente";
                case "virtual":
                  return "Virtual";
                case "presencial":
                  return "Presencial";
                default:
                  return type;
              }
            };

            const translateStatus = (status: string): string => {
              switch (status) {
                case "pending":
                  return "Pendiente";
                case "Scheduled":
                  return "Confirmada";
                default:
                  return status;
              }
            };

            return {
              name: patientName,
              record: appointment.record,
              date: formattedDateString,
              time: normalizeTime(appointment.time),
              type: translateType(appointment.type),
              status: translateStatus(appointment.status),
            };
          })
        );

        setAppointments(transformedAppointments); // Set the transformed appointments
      } catch (error) {
        console.error("Error al obtener las citas:", error);
      }
    };

    fetchAppointments();
  }, []);

  useEffect(() => {
    // Save appointments to localStorage whenever they change
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
    setAppointments((prev) => prev.filter((appt) => appt.record !== appointment.record));
    setIsDeleteModalOpen(true);
  };

  const handleSaveAppointment = (editedAppointment: typeof appointments[0]) => {
    setAppointments((prev) => {
      const index = prev.findIndex((appt) => appt.record === editedAppointment.record);
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
