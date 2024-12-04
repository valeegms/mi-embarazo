"use client";

import { PersonAddRounded } from "@mui/icons-material";
import Card from "./ui/Card";
import Link from "next/link";
import PatientCard from "./ui/PatientCard";
import { PatientModel } from "@/src/models/PatientModel";
import { useEffect, useState } from "react";
import {
  deletePatient,
  getAllPatients,
  getPatientsByDoctor,
} from "@/src/services/pacienteService";
import { LinearProgress } from "@mui/material";
import { DoctorModel } from "@/src/models/DoctorModel";
import { fetchDoctors } from "@/src/services/adminDoctoresService";
import Input from "./ui/Input";

export default function PacientesPage({ role }: { role: string }) {
  const [patients, setPatients] = useState<PatientModel[]>([]);
  const [doctors, setDoctors] = useState<DoctorModel[]>([]);

  const [searchQuery, setSearchQuery] = useState<string>("");

  const [isLoading, setIsLoading] = useState(true);
  //TODO: finish styling doctor input
  const fetchData = async () => {
    try {
      const patientPromise =
        role === "doctor" ? getPatientsByDoctor() : getAllPatients();
      const doctorPromise =
        role === "admin" ? fetchDoctors() : Promise.resolve([]);

      // Combine both API calls
      const [fetchedPatients, fetchedDoctors] = await Promise.all([
        patientPromise,
        doctorPromise,
      ]);

      setPatients(fetchedPatients);
      setDoctors(fetchedDoctors);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleDelete = async (patient: PatientModel) => {
    try {
      setPatients(patients.filter((p) => p._id !== patient._id));
      await deletePatient(patient);
      fetchData();
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const filteredPatients = patients.filter((patient) => {
    const fullName = patient.personalData.name.toLowerCase();
    const doctorName =
      doctors
        .find((doc) => doc.id === patient.doctor)
        ?.name.toLocaleLowerCase() || "";
    const record = patient.record.toLowerCase();
    const searchTerm = searchQuery.toLowerCase();

    return (
      fullName.includes(searchTerm) ||
      doctorName.includes(searchTerm) ||
      record.includes(searchTerm)
    );
  });

  return (
    <Card
      title="Pacientes"
      subtitle={`(${filteredPatients.length}) pacientes`}
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
        <Input
          name="search"
          placeholder="Buscar paciente por nombre, doctor o expediente"
          className="col-span-full"
          type="search"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        {isLoading && (
          <LinearProgress
            color="secondary"
            sx={{ width: "75rem", height: "0.5rem", borderRadius: "0.25rem" }}
          />
        )}
        {filteredPatients.map(
          (patient: PatientModel, index) =>
            patient.personalData.name != null && (
              <PatientCard
                key={index}
                patient={patient}
                doctor={
                  doctors.find((doc) => doc.id === patient.doctor)?.name || ""
                }
                role={role}
                handleDelete={handleDelete}
              />
            )
        )}
      </section>
    </Card>
  );
}
