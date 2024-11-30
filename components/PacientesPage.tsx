"use client";

import { PersonAddRounded } from "@mui/icons-material";
import Card from "./ui/Card";
import Link from "next/link";
import PatientCard from "./ui/PatientCard";
import { PatientModel } from "@/src/models/PatientModel";
import { useEffect, useState } from "react";
import {
  getAllPatients,
  getPatientsByDoctor,
} from "@/src/services/pacienteService";
import { LinearProgress } from "@mui/material";

export default function PacientesPage({ role }: { role: string }) {
  const [patients, setPatients] = useState<PatientModel[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const fetchedPatients = await getPatientsByDoctor().finally(() => {
          setIsLoading(false);
        });
        setPatients(fetchedPatients);
      } catch (error) {
        console.error(error);
      }
    };

    fetchPatients();
  }, []);
  return (
    <Card
      title="Pacientes"
      subtitle="Listado de pacientes"
      action={
        <Link href={`/${role}/pacientes/crear`}>
          <button className="flex items-center space-x-2 font-bold text-[--primary-color] hover:text-[--primary-color-dark]">
            <PersonAddRounded />
            <span>Añadir paciente</span>
          </button>
        </Link>
      }
    >
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {isLoading && (
          <LinearProgress
            color="secondary"
            sx={{ width: "75rem", height: "0.5rem", borderRadius: "0.25rem" }}
          />
        )}
        {patients.map(
          (patient: PatientModel, index) =>
            patient.personalData.name != null && (
              <PatientCard key={index} patient={patient} role={role} />
            )
        )}
      </section>
    </Card>
  );
}
