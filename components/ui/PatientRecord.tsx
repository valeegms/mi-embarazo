"use client";

import { Button, Tab, Tabs } from "@mui/material";
import DetailsTab from "./PatientRecordTabs/DetailsTab"; // Now includes both details and medical history
import ControlPrenatalTab from "./PatientRecordTabs/ControlPrenatalTab";
import { useEffect, useState } from "react";
import { PatientModel } from "@/src/models/PatientModel";
import { savePatientDetails } from "@/src/services/pacienteService";
import { AppointmentDetailsModel } from "@/src/models/AppointmentModel";
import { DateTime } from "luxon";
import { updateAppointmentDetails } from "@/src/services/citasService";

export default function PatientRecord({
  patient,
  appointmentDetails,
  isPatientLoading,
}: {
  patient: PatientModel;
  appointmentDetails: AppointmentDetailsModel[];
  isPatientLoading: boolean;
}) {
  const [tab, setTab] = useState(0);
  const [formData, setFormData] = useState<PatientModel>(new PatientModel());
  const [controlPrenatalformData, setcontrolPrenatalFormData] =
    useState<AppointmentDetailsModel>(
      new AppointmentDetailsModel(
        "",
        "",
        "",
        "",
        JSON.parse(localStorage.getItem("user_info") || "{}")._id,
        null!,
        DateTime.now().toISODate(),
        DateTime.now().toFormat("HH:mm"),
        "Nuevo paciente",
        "Confirmada",
        0,
        "",
        "",
        "",
        "",
        ""
      )
    );
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

  const detailsTabProps = {
    isEditing,
    formData,
    updateData,
  };

  // TODO: implement appointments as a list
  const controlPrenatalProps = {
    isEditing,
    formData: controlPrenatalformData,
    updateData: setcontrolPrenatalFormData,
    isLoading: isPatientLoading,
    appointments: appointmentDetails,
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

  useEffect(() => {
    if (patient) {
      setcontrolPrenatalFormData(
        appointmentDetails[appointmentDetails.length - 1]
      );
      setFormData(patient);
    } else {
    }
  }, [patient]);

  const handleSaveButton = async () => {
    if (isEditing) {
      try {
        setIsLoading(true);

        const formDataWithoutId = { ...formData };
        delete formDataWithoutId._id;

        const controlPrenatalformDataWithoutId = { ...controlPrenatalformData };
        delete controlPrenatalformDataWithoutId._id;

        await savePatientDetails(patient._id!, formDataWithoutId);
        if (appointmentDetails.length > 0)
          await updateAppointmentDetails(controlPrenatalformDataWithoutId);
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
      <div className="flex gap-4 justify-end">
        {isEditing && (
          <Button
            variant="outlined"
            color="secondary"
            onClick={() => setIsEditing(false)}
            disabled={isLoading || isPatientLoading}
          >
            Cancelar
          </Button>
        )}
        <Button
          onClick={handleSaveButton}
          variant="contained"
          color="secondary"
          disabled={isLoading || isPatientLoading}
        >
          {isEditing ? (isLoading ? "Guardando..." : "Guardar") : "Editar"}
        </Button>
      </div>
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
