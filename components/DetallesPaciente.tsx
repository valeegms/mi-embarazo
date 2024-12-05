"use client";

import { getPatientById } from "@/src/services/pacienteService";
import Avatar from "./ui/Avatar";
import PatientRecord from "./ui/PatientRecord";
import { useEffect, useState } from "react";
import { PatientModel } from "@/src/models/PatientModel";

export default function DetallesPaciente({
  params,
}: {
  params: { record: string };
}) {
  const { record } = params;

  // Usa un estado inicial con valores por defecto compatibles con PatientModel.
  const [patient, setPatient] = useState<PatientModel>({
    id: "",
    record: "",
    name: "",
    personalData: {
      name: "",
      gender: "",
      phone: "",
      age: 0,
      birthDate: "",
      email: "",
      password: "",
      curp: "",
      maritalStatus: "",
      occupation: "",
      address: {
        street: "",
        municipality: "",
        locality: "",
        state: "",
      },
      street: "",
      municipality: "",
      locality: "",
      state: "",
    },
    currentPhone: "",
    doctorOptions: [],
    scheduleOptions: [],
    doctor: "",
    date: "",
    pregnancyData: {
      lastMenstruation: "",
      dueDate: "",
      gestationStage: "",
      previousPregnancies: 0,
      abortions: 0,
      pregnancyType: "",
      complication: "",
      observations: "",
    },
    medicalHistory: {
      medicalConditions: "",
      gynecologicalHistory: "",
      allergies: "",
      familyHistory: "",
    },
  });

  useEffect(() => {
    const fetchPatient = async () => {
      try {
        const fetchedPatient = await getPatientById(record);
        setPatient(fetchedPatient);
      } catch (error) {
        console.error("Error al obtener el paciente:", error);
      }
    };

    fetchPatient();
  }, [record]);

  const lastAppointmentDate = patient.date
    ? new Date(patient.date).toLocaleDateString("es-MX", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : "No disponible";

  return (
    <div>
      <section className="pb-4">
        <div className="flex gap-4 items-center">
          <Avatar name={patient.name || "Paciente"} />
          <h1 className="text-3xl font-bold">{patient.name || "Paciente"}</h1>
        </div>
        <p className="text-gray-400 pt-1">
          <span className="font-bold">Última cita:</span> {lastAppointmentDate}
        </p>
      </section>
      <PatientRecord patient={patient} />
    </div>
  );
}