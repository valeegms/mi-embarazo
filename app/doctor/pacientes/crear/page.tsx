"use client";

import { Tab, Tabs, Button } from "@mui/material";
import React, { useState } from "react";
import DetailsTab from "../../../../components/ui/PatientRecordTabs/DetailsTab";
import MedicalHistoryTab from "../../../../components/ui/PatientRecordTabs/MedicalHistoryTab";
import ControlPrenatalTab from "../../../../components/ui/PatientRecordTabs/ControlPrenatalTab";
import Link from "next/link";

export default function NewPatientPage() {
  const [tab, setTab] = useState(0);
  const [formData, setFormData] = useState({
    id: "",
    record: "",
    personalData: {
      name: "",
      gender: "",
      phone: "",
      age: null,
      birthDate: "",
      email: "",
      curp: "",
      maritalStatus: "",
      occupation: "",
      address: {
        street: "",
        municipality: "",
        locality: "",
        state: "",
      },
    },
    pregnancyData: {
      gestationStage: "",
      dueDate: "",
      previousPregnancies: null,
      pregnancyType: "",
      complications: "",
      observations: "",
    },
    lastAppointment: {
      date: "",
      time: "",
      weight: "",
      bloodPressure: "",
      fetalHeartRate: "",
      fetalStatus: "",
      prescription: "",
      observations: "",
    },
    nextAppointment: {
      date: "",
      time: "",
      appointmentType: "",
      doctor: "",
      appointmentStatus: "",
    },
    prenatalControl: [
      {
        date: "",
        time: "",
        weight: "",
        bloodPressure: "",
        fetalHeartRate: "",
        fetalStatus: "",
        prescription: "",
        observations: "",
      },
    ],
    medicalHistory: {
      medicalConditions: "",
      gynecologicalHistory: "",
      allergies: "",
      familyHistory: "",
    },
  });

  const updateFormData = (section, updatedData) => {
    setFormData((prevData) => ({
      ...prevData,
      [section]: { ...prevData[section], ...updatedData },
    }));
  };

  const savePatient = async () => {
    try {
      const response = await fetch(`http://localhost:4000/patients`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })
        .then((res) => res.json())
        .then((data) => console.log(data));

      //   if (!response.ok) throw new Error("Failed to save patient data");

      // Provide feedback or navigate
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
      <Link href="/doctor/pacientes" passHref>
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
        <Tab value={1} label="Historial" />
        <Tab value={2} label="Control prenatal" />
      </Tabs>
      <DetailsTab
        value={tab}
        index={0}
        isEditing
        formData={{
          personalData: formData.personalData,
          pregnancyData: formData.pregnancyData,
        }}
        updateData={(data) => {
          setFormData((prevData) => ({
            ...prevData,
            personalData: { ...prevData.personalData, ...data },
            pregnancyData: { ...prevData.pregnancyData, ...data },
          }));
        }}
      />
      <MedicalHistoryTab
        value={tab}
        index={1}
        isEditing
        formData={formData.medicalHistory}
        updateData={(data) => updateFormData("medicalHistory", data)}
      />
      <ControlPrenatalTab
        value={tab}
        index={2}
        isEditing
        formData={formData.prenatalControl[0]}
        updateData={(data) => updateFormData("prenatalControl", [data])}
      />
    </div>
  );
}
