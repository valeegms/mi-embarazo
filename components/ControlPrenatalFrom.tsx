import React from "react";
import Input from "./ui/Input";
import TextField from "./ui/TextField";
import { AppointmentDetailsModel } from "@/src/models/AppointmentModel";
import { PregnancyData } from "@/src/models/PatientModel";

interface ControlPrenatalFormProps {
  formData: AppointmentDetailsModel;
  updateData: (data: (prevData: any) => any) => void;
  isEditing: boolean;
}

export default function ControlPrenatalForm({
  formData,
  updateData,
  isEditing,
}: ControlPrenatalFormProps) {
  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    updateData((prevData) => ({ ...prevData, [name]: value }));
  };

  return (
    <>
      <Input
        name="weight"
        label="Peso"
        type="text"
        disabled={!isEditing}
        value={formData.weight}
        onChange={handleChange}
      />
      <Input
        name="bloodPressure"
        label="Presión arterial"
        type="text"
        disabled={!isEditing}
        value={formData.bloodPressure}
        onChange={handleChange}
      />
      <Input
        name="fetalHeartRate"
        label="Frecuencia cardiaca fetal"
        type="text"
        disabled={!isEditing}
        value={formData.fetalHeartRate}
        onChange={handleChange}
      />
      <Input
        name="fetalStatus"
        label="Estado fetal"
        type="text"
        disabled={!isEditing}
        value={formData.fetalStatus}
        onChange={handleChange}
      />
      <TextField
        name="observations"
        label="Observaciones"
        disabled={!isEditing}
        value={formData.observations}
        onChange={handleChange}
      />
      <TextField
        name="prescription"
        label="Prescripción"
        disabled={!isEditing}
        value={formData.prescription}
        onChange={handleChange}
      />
    </>
  );
}
