"use client";

import { Button, Tab, Tabs } from "@mui/material";
import { useState } from "react";
import DetailsTab from "./PatientRecordTabs/DetailsTab";
import MedicalHistoryTab from "./PatientRecordTabs/MedicalHistoryTab";
import ControlPrenatalTab from "./PatientRecordTabs/ControlPrenatalTab";

export default function PatientRecord({ patient }: { patient: any }) {
  const [tab, setTab] = useState(0);
  const [formData, setFormData] = useState(patient);
  const [isEditing, setIsEditing] = useState(false);

  const savePatient = async () => {
    setIsEditing(!isEditing);
    await fetch(`http://localhost:4000/patients/${formData.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    })
      .then((res) => res.json())
      .then((data) => console.log(data));
  };

  return (
    <div>
      <Button
        onClick={savePatient}
        variant="contained"
        color="secondary"
        className="float-end"
      >
        {isEditing ? "Guardar" : "Editar"}
      </Button>
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
        isEditing={isEditing}
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
        isEditing={isEditing}
        formData={formData.medicalHistory}
        updateData={(data) =>
          setFormData((prevData) => ({ ...prevData, prenatalControl: [data] }))
        }
      />
      <ControlPrenatalTab
        value={tab}
        index={2}
        isEditing={isEditing}
        formData={formData.prenatalControl}
        updateData={(data) =>
          setFormData((prevData) => ({ ...prevData, prenatalControl: [data] }))
        }
      />
    </div>
  );
}
