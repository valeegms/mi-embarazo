"use client";

import { Button, Skeleton, Tab, Tabs } from "@mui/material";
import DetailsTab from "./PatientRecordTabs/DetailsTab"; // Now includes both details and medical history
import ControlPrenatalTab from "./PatientRecordTabs/ControlPrenatalTab";
import { useEffect, useState } from "react";
import { PatientModel } from "@/src/models/PatientModel";
import { savePatientDetails } from "@/src/services/pacienteService";

export default function PatientRecord({ patient }: { patient: PatientModel }) {
  const [tab, setTab] = useState(0);
  const [formData, setFormData] = useState<PatientModel>(new PatientModel());
  const [isLoading, setIsLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    if (patient) {
      setFormData(patient);
      console.log("Patient data:", formData);
      setIsLoading(false);
    } else {
      setIsLoading(true);
    }
  }, [patient]);

  const commonProps = {
    isEditing,
    formData,
    updateData: (patient: PatientModel) =>
      setFormData({ ...formData, ...patient }),
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

  const handleSaveButton = async () => {
    if (isEditing) {
      try {
        setIsLoading(true);

        await savePatientDetails(formData!.id, formData!);
      } catch (error) {
        console.error("Error saving patient details:", error);
      } finally {
        setIsLoading(false);
        setIsEditing(false);
      }
    } else {
      setIsEditing(true);
    }
  };

  return (
    <div>
      <Button
        onClick={handleSaveButton}
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
      {!isLoading ? (
        tabs.map(
          (tabItem, index) =>
            tab === index && <div key={index}>{tabItem.component}</div>
        )
      ) : (
        <Skeleton variant="rectangular" height={400} />
      )}
    </div>
  );
}
