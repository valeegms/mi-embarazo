"use client";

import { Tab, Tabs, Button } from "@mui/material";
import React, { useEffect, useState } from "react";
import DetailsTab from "./ui/PatientRecordTabs/DetailsTab";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { createPatient } from "@/src/services/pacienteService";
import { PatientModel } from "@/src/models/PatientModel";
import { DoctorModel } from "@/src/models/DoctorModel";
import { fetchDoctors } from "@/src/services/adminDoctoresService";

export default function CrearPaciente() {
  const pathname = usePathname();
  const router = useRouter();
  const role = pathname.split("/")[1];
  const [isLoading, setIsLoading] = useState(false);
  const [doctors, setDoctors] = useState<DoctorModel[]>([]);

  const [tab, setTab] = useState(0);
  const [formData, setFormData] = useState<PatientModel>(new PatientModel());

  const fetchDoctorsAdmin = async () => {
    try {
      const fetchedDoctors = await fetchDoctors();
      setDoctors(fetchedDoctors);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (role === "admin") {
      fetchDoctorsAdmin();
    }
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFormData((prevData) => ({
      ...prevData,
      doctor: e.target.value,
    }));
  };

  const savePatient = async () => {
    try {
      // setIsLoading(true);
      formData.record = `EXP-${Math.floor(Math.random() * 1000000)}`;

      if (role == "doctor") {
        formData.doctor = JSON.parse(localStorage.getItem("user_info")!)
          ._id as string;
      }

      const formDataWithoutId = { ...formData };
      delete formDataWithoutId._id;

      console.log(formDataWithoutId);

      await createPatient(formDataWithoutId).finally(() => {
        setFormData(new PatientModel()); // Clear form
        router.push(`/${role}/pacientes`);
        setIsLoading(false);
      });
    } catch (error) {
      console.error(error);
    }
  };
  //TODO: finish selecting doctor as admin
  return (
    <div>
      {role === "admin" && (
        <select
          value={formData.doctor}
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 rounded-md"
          name="doctors"
        >
          <option value="">Selecciona un doctor</option>
          {doctors.map((doctor) => (
            <option key={doctor.id} value={doctor.id}>
              {doctor.name}
            </option>
          ))}
        </select>
      )}
      <div className="flex gap-4 justify-end">
        <Link href={`/${role}/pacientes`} passHref>
          <Button variant="outlined" color="secondary" disabled={isLoading}>
            Cancelar
          </Button>
        </Link>
        <Button
          onClick={savePatient}
          variant="contained"
          color="secondary"
          disabled={isLoading}
        >
          {isLoading ? "Guardando..." : "Guardar"}
        </Button>
      </div>
      <Tabs
        value={tab}
        textColor="secondary"
        indicatorColor="secondary"
        className="mb-6"
        onChange={(e, newValue) => setTab(newValue)}
      >
        <Tab value={0} label="Detalles" />
        {/* <Tab value={1} label="Historial" /> */}
      </Tabs>
      <DetailsTab
        value={tab}
        index={0}
        isEditing
        formData={formData}
        updateData={(data: PatientModel) => {
          setFormData((prevData) => ({
            ...prevData,
            personalData: { ...prevData.personalData, ...data },
            pregnancyData: { ...prevData.pregnancyData, ...data },
          }));
        }}
      />

      {/* <ControlPrenatalTab
        value={tab}
        index={1}
        isEditing
        formData={formData.prenatalControl[0]}
        updateData={(data) => updateFormData("prenatalControl", [data])}
      /> */}
    </div>
  );
}
