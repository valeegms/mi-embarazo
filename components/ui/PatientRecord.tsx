"use client";

import { Button, LinearProgress, Tab, Tabs } from "@mui/material";
import DetailsTab from "./PatientRecordTabs/DetailsTab"; // Now includes both details and medical history
import ControlPrenatalTab from "./PatientRecordTabs/ControlPrenatalTab";
import { useEffect, useState } from "react";
import { PatientModel } from "@/src/models/PatientModel";
import { savePatientDetails } from "@/src/services/pacienteService";
import { AppointmentDetailsModel } from "@/src/models/AppointmentModel";

export default function PatientRecord({
  patient,
  appointmentDetails,
}: {
  patient: PatientModel;
  appointmentDetails: AppointmentDetailsModel;
}) {
  const [tab, setTab] = useState(0);
  const [formData, setFormData] = useState<PatientModel>(new PatientModel());
  const [controlPrenatalformData, setcontrolPrenatalFormData] =
    useState<AppointmentDetailsModel>({});
  const [isLoading, setIsLoading] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const updateData = (data: PatientModel) => {
    setFormData((prevData) => ({
      ...prevData,
      personalData: { ...prevData.personalData, ...data },
      pregnancyData: { ...prevData.pregnancyData, ...data },
      medicalHistory: { ...prevData.medicalHistory, ...data },
    }));
  };

  const updateControlPrenatalData = (data: AppointmentDetailsModel) => {
    setcontrolPrenatalFormData((prevData) => ({
      ...prevData,
      ...data,
    }));
  };

  const detailsTabProps = {
    isEditing,
    formData,
    updateData,
  };

  const controlPrenatalProps = {
    isEditing,
    formData: controlPrenatalformData,
    updateData: updateControlPrenatalData,
  };

  const tabs = [
    {
      label: "Detalles",
      component: <DetailsTab value={tab} index={0} {...detailsTabProps} />,
    },
    {
      label: "Control prenatal",
      component: (
        <ControlPrenatalTab value={tab} index={1} {...controlPrenatalProps} />
      ),
    },
  ];

  // useEffect to set the patient data to the form data
  useEffect(() => {
    if (patient) {
      setcontrolPrenatalFormData(appointmentDetails);
      setFormData(patient);
      setIsLoading(false);
    } else {
      setIsLoading(true);
    }
  }, [patient]);

  const handleSaveButton = async () => {
    if (isEditing) {
      try {
        setIsLoading(true);

        await savePatientDetails(formData._id!, formData!);
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
        <LinearProgress
          color="secondary"
          sx={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
          }}
        />
      )}
    </div>
  );
}
