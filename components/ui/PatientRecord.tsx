"use client";

import { Button, Tab, Tabs } from "@mui/material";
import DetailsTab from "./PatientRecordTabs/DetailsTab"; // Now includes both details and medical history
import ControlPrenatalTab from "./PatientRecordTabs/ControlPrenatalTab";
import { useState } from "react";

export default function PatientRecord({ patient }: { patient: any }) {
  const [tab, setTab] = useState(0);
  const [formData, setFormData] = useState(patient);
  const [isEditing, setIsEditing] = useState(false);

  const commonProps = {
    isEditing,
    formData,
    updateData: (data) => setFormData({ ...formData, ...data }),
  };

  const tabs = [
    {
      label: "Detalles",
      component: <DetailsTab value={tab} index={0} {...commonProps} />,
    },
    {
      label: "Control prenatal",
      component: <ControlPrenatalTab value={tab} index={1} {...commonProps} />,
    },
  ];

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
        {tabs.map((tabItem, index) => (
          <Tab key={index} value={index} label={tabItem.label} />
        ))}
      </Tabs>
      {tabs.map(
        (tabItem, index) =>
          tab === index && <div key={index}>{tabItem.component}</div>
      )}
    </div>
  );
}
