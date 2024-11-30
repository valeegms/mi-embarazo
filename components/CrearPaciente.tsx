"use client";

import { Tab, Tabs, Button } from "@mui/material";
import React, { useState } from "react";
import DetailsTab from "./ui/PatientRecordTabs/DetailsTab";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { createPatient } from "@/src/services/pacienteService";
import { PatientModel } from "@/src/models/PatientModel";

export default function CrearPaciente() {
  const pathname = usePathname();
  const role = pathname.split("/")[1];

  const [tab, setTab] = useState(0);
  const [formData, setFormData] = useState<PatientModel>(new PatientModel());

  const savePatient = async () => {
    try {
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
      });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <Button
        onClick={savePatient}
        variant="contained"
        color="secondary"
        className="float-end"
      >
        Guardar
      </Button>
      <Link href={`/${role}/pacientes`} passHref>
        <Button variant="outlined" color="secondary" className="float-end me-2">
          Cancelar
        </Button>
      </Link>
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
