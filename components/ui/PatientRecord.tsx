"use client";

import { Button, Skeleton, Tab, Tabs } from "@mui/material";
import DetailsTab from "./PatientRecordTabs/DetailsTab"; // Now includes both details and medical history
import ControlPrenatalTab from "./PatientRecordTabs/ControlPrenatalTab";
import { useEffect, useState } from "react";
import { PatientModel } from "@/src/models/PatientModel";
import { savePatientDetails } from "@/src/services/pacienteService";

export default function PatientRecord({ patient }: { patient: PatientModel }) {
  const [tab, setTab] = useState(0);
  const [formData, setFormData] = useState<PatientModel | null>(null); // Start with null state
  const [isLoading, setIsLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  

  useEffect(() => {
    if (patient) {
      setFormData(patient);
      setIsLoading(false); // Stop loading once patient data is set
    } else {
      setIsLoading(true);
    }
  }, [patient]); // Depend on `patient` to update formData when it changes

  const commonProps = {
    isEditing,
    formData,
    updateData: (updatedPatient: PatientModel) => setFormData({ ...formData!, ...updatedPatient }), // Ensure formData is not null before updating
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
        if (formData?.id) {
          await savePatientDetails(formData.id, formData);
        }
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
