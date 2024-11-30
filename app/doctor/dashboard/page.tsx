"use client";

import { useEffect, useState } from "react";
import Card from "../../../components/ui/Card";
import Badge from "../../../components/ui/Badge";
import Appointment from "../../../components/ui/Appointment";
import { OpenInNewRounded } from "@mui/icons-material";

import ControlPrenatalForm from "../../../components/ControlPrenatalFrom";
import { Skeleton, Tooltip } from "@mui/material";
import {
  getAllAppointments,
  getAppointmentByDoctor,
  updateAppointmentDetails,
} from "@/src/services/citasService";
import {
  AppointmentDetailsModel,
  AppointmentModel,
} from "@/src/models/AppointmentModel";

const currentDate = new Date().toLocaleDateString("es-ES", {
  year: "numeric",
  month: "long",
  day: "numeric",
});

export default function DashboardPage() {
  const [appointments, setAppointments] = useState<AppointmentModel[]>([]);
  const [formData, setFormData] = useState<AppointmentModel>({
    _id: "",
    doctor: JSON.parse(localStorage.getItem("user_info") || "{}")._id,
    patient_name: "",
    record: "",
    date: "",
    time: "",
    date_type: "",
    status: "",
    patient: "",
    file: "",
    weight: 0,
    bloodPressure: "",
    fetalHeartRate: "",
    fetalStatus: "",
    observations: "",
    prescription: "",
  });
  const [isEditing, setIsEditing] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const [isSavingDetails, setIsSavingDetails] = useState(false);
  const [currentPatient, setCurrentPatient] =
    useState<null | AppointmentDetailsModel>(null);

  const handleEditClick = async () => {
    localStorage.setItem("currentPatientDetails", JSON.stringify(formData));
    setIsEditing((prev) => !prev);
  };

  useEffect(() => {
    setCurrentPatient(null);
    localStorage.removeItem("currentPatient");

    setIsLoading(true);
    const loadAppointments = async () => {
      const fetchedAppointments = await getAppointmentByDoctor();
      // const fetchedAppointments = await getAppointmentByDoctor("Confirmada");
      setAppointments(fetchedAppointments);
    };

    loadAppointments().finally(() => setIsLoading(false));
  }, []);

  appointments.sort((a, b) => (a.time > b.time ? 1 : -1));

  const handleAppointmentClick = async (appointment: AppointmentModel) => {
    if (currentPatient?.patient === appointment.patient) {
      formData._id = appointment._id;
      setIsSavingDetails(true);
      formData.status = "Finalizada";
      await updateAppointmentDetails(formData).finally(() =>
        setIsSavingDetails(false)
      );

      setCurrentPatient(null); // Ends the current appointment
      localStorage.removeItem("currentPatient");
      localStorage.removeItem("currentPatientDetails");
    } else {
      setCurrentPatient(appointment); // Starts a new appointment
      setFormData(
        new AppointmentDetailsModel(
          appointment._id,
          appointment.patient,
          appointment.patient_name,
          appointment.record,
          appointment.doctor,
          appointment.file,
          appointment.date,
          appointment.time,
          appointment.date_type,
          appointment.status,
          appointment.weight,
          appointment.bloodPressure,
          appointment.fetalHeartRate,
          appointment.fetalStatus,
          appointment.observations,
          appointment.prescription
        )
      );
      localStorage.setItem("currentPatient", JSON.stringify(appointment));
    }
  };

  return (
    <main>
      <h1 className="text-3xl font-bold">
        Bienvenido/a{" "}
        {JSON.parse(localStorage.getItem("user_info") || "{}").name},
      </h1>
      <p className="text-gray-400 font-light pt-1">
        Revisa la información general sobre el paciente y las próximas citas.
      </p>
      <article>
        <section className="flex space-x-8 pt-8">
          {isLoading ? (
            <Skeleton className="flex-1" height={"24rem"} />
          ) : (
            <Card
              title="Citas programadas"
              action={<Badge type="primary">{currentDate}</Badge>}
              className="flex-1"
            >
              <div className="space-y-4 h-96 overflow-auto">
                {appointments.length > 0 ? (
                  appointments.map((appointment, index) => (
                    <Appointment
                      key={index}
                      name={appointment.patient_name}
                      time={appointment.time}
                      isSavingDetails={isSavingDetails}
                      status={currentPatient === appointment}
                      onClick={() => handleAppointmentClick(appointment)}
                    />
                  ))
                ) : (
                  <p>No hay citas programadas</p>
                )}
              </div>
            </Card>
          )}
          {isLoading ? (
            <Skeleton className="flex-1" height={"24rem"} />
          ) : (
            <Card
              className="flex-1"
              title={
                currentPatient
                  ? `Notas de ${currentPatient?.patient_name}`
                  : "Notas"
              }
              action={
                currentPatient && (
                  <div className="space-x-2">
                    {/* <button
                      onClick={handleEditClick}
                      className="
                    bg-[--primary-color] text-white rounded-md py-1 px-4 hover:bg-[#db51d4]
                  "
                    >
                      {isEditing ? "Guardar" : "Editar"}
                    </button> */}
                    <Tooltip title="Ver expediente" placement="top-start">
                      <button
                        className="border border-[--primary-color] text-[--primary-color] rounded-md py-1 px-2 hover:bg-[#f7d0f4]"
                        aria-label="Ver expediente"
                        onClick={() =>
                          window.open(
                            `/doctor/pacientes/${currentPatient?.patient}`,
                            "_blank"
                          )
                        }
                      >
                        <OpenInNewRounded fontSize="inherit" />
                      </button>
                    </Tooltip>
                  </div>
                )
              }
            >
              {currentPatient && (
                <div className="h-96 overflow-auto">
                  <ControlPrenatalForm
                    formData={formData}
                    updateData={setFormData}
                    isEditing={isEditing}
                  />
                </div>
              )}
            </Card>
          )}
        </section>
      </article>
    </main>
  );
}
