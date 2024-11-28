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
  const [patient, setPatient] = useState<PatientModel>(new PatientModel());

  useEffect(() => {
    const fetchPatient = async () => {
      const fetchedPatient = await getPatientById(record);
      setPatient(fetchedPatient);
    };

    fetchPatient();
  }, []);

  const lastAppointmentDate = new Date(patient.date).toLocaleDateString(
    "es-MX",
    {
      year: "numeric",
      month: "long",
      day: "numeric",
    }
  );

  return (
    <div>
      <section className="pb-4">
        <div className="flex gap-4 items-center">
          <Avatar name={patient.name} />
          <h1 className="text-3xl font-bold">{patient.name}</h1>
        </div>
        <p className="text-gray-400 pt-1">
          <span className="font-bold">Última cita:</span> {lastAppointmentDate}
        </p>
      </section>
      <PatientRecord patient={patient} />
    </div>
  );
}
