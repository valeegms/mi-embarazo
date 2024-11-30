"use client";

import { getPatientById } from "@/src/services/pacienteService";
import Avatar from "./ui/Avatar";
import PatientRecord from "./ui/PatientRecord";
import { useEffect, useState } from "react";
import { PatientModel } from "@/src/models/PatientModel";
import { DateTime } from "luxon";
import { LinearProgress } from "@mui/material";
import { AppointmentDetailsModel } from "@/src/models/AppointmentModel";
import { getAppointmentByPatient } from "@/src/services/citasService";

export default function DetallesPaciente({
  params,
}: {
  params: { record: string };
}) {
  const { record } = params;
  const [patient, setPatient] = useState<PatientModel>(new PatientModel());
  const [appointmentDetails, setAppointmentDetails] =
    useState<AppointmentDetailsModel>({
      _id: "",
      doctor: "",
      patient: "",
      date: "",
      time: "",
      date_type: "",
      status: "",
      patient_name: "",
      record: "",
      file: "",
      weight: 0,
      bloodPressure: "",
      fetalHeartRate: "",
      fetalStatus: "",
      observations: "",
      prescription: "",
    });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (record) {
      const fetchPatient = async () => {
        const fetchedPatient = await getPatientById(record).finally(() => {
          setIsLoading(false);
        });
        setPatient(fetchedPatient);
      };

      fetchPatient();
    }
  }, []);

  useEffect(() => {
    const fetchAppointmentDetails = async () => {
      const fetchedAppointmentDetails = await getAppointmentByPatient(
        patient._id
      ).finally(() => {
        setIsLoading(false);
      });
      console.log("fetchedAppointmentDetails", fetchedAppointmentDetails);
      setAppointmentDetails(fetchedAppointmentDetails[0]);
    };

    if (patient) fetchAppointmentDetails();
  }, [patient]);

  const appointmentDate = DateTime.isDateTime(patient.last_appointment)
    ? patient.last_appointment
    : patient.date;
  const lastAppointmentDate = new Date(appointmentDate).toLocaleDateString(
    "es-MX",
    {
      year: "numeric",
      month: "long",
      day: "numeric",
    }
  );

  console.log("date", DateTime.isDateTime(lastAppointmentDate));

  return (
    <div>
      <section className="pb-4">
        <div className="flex gap-4 items-center">
          <Avatar name={patient.personalData.name} />
          <h1 className="text-3xl font-bold">{patient.personalData.name}</h1>
        </div>
        <p className="text-gray-400 pt-1">
          <span className="font-bold">Última cita:</span>{" "}
          {DateTime.isDateTime(lastAppointmentDate)
            ? lastAppointmentDate
            : "Sin citas"}
        </p>
      </section>
      <PatientRecord
        patient={patient}
        appointmentDetails={appointmentDetails}
      />
      {isLoading && (
        <LinearProgress
          color="secondary"
          sx={{ position: "fixed", top: 0, left: 0, right: 0 }}
        />
      )}
    </div>
  );
}
