"use client";

import { useEffect, useState } from "react";
import { PersonAddRounded } from "@mui/icons-material";
import Card from "../../../components/ui/Card";
import Link from "next/link";
import PatientCard from "../../../components/ui/PatientCard";
import { getPacientes } from "./[record]/page";
import { getPatientsService, Patient } from "@/services/patientsService";
import { useRouter } from "next/navigation";

export default function PacientesPage() {
  const [patients, setPatients] = useState<Patient[]>([]);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const router = useRouter();

  useEffect(() => {
    // Check authentication status
    const auth = JSON.parse(localStorage.getItem("isAuthenticated") || "false");
    setIsAuthenticated(auth);

    if (!auth) {
      // Redirect to login if not authenticated
      router.push("/login");
      return;
    }

    // Fetch patients
    const fetchPatients = async () => {
      try {
        const patientsData = await getPatientsService();
        setPatients(patientsData);
      } catch (error) {
        console.error("Error al cargar pacientes:", error);
      }
    };

    fetchPatients();
  }, [router]);

  if (!isAuthenticated) {
    return null; // Optionally show a loading spinner or a placeholder
  }

  return (
    <Card
      title="Pacientes"
      subtitle="Listado de pacientes"
      action={
        <Link href="/doctor/pacientes/crear">
          <button className="flex items-center space-x-2 font-bold text-[--primary-color] hover:text-[--primary-color-dark]">
            <PersonAddRounded />
            <span>Añadir paciente</span>
          </button>
        </Link>
      }
    >
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {patients.length > 0 ? (
          patients.map((patient, index) => (
            <PatientCard key={index} patient={patient} />
          ))
        ) : (
          <p>No hay pacientes disponibles.</p>
        )}
      </section>
    </Card>
  );
}
