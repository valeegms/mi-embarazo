"use client";

import { Divider } from "@mui/material";
import Avatar from "./Avatar";
import { DeleteRounded, OpenInNewRounded } from "@mui/icons-material";
import { useState } from "react";
import DeleteModal from "./DeleteModal";
import { PatientModel } from "@/src/models/PatientModel";

export default function PatientCard({
  patient,
  role,
  handleDelete,
  doctor,
}: {
  patient: PatientModel;
  role: string;
  handleDelete: (patient: PatientModel) => void;
  doctor: string;
}) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleRowClick = (patient: PatientModel) => {
    console.log("Opening patient record: ", patient);
    window.open(`/${role}/pacientes/${patient._id}`, "_blank");
  };

  return (
    <article className="bg-white shadow-md rounded-lg p-6">
      <section className="flex items-center space-x-4">
        <Avatar name={patient.personalData.name} />
        <div>
          <h3 className="font-bold">{patient.personalData.name}</h3>
          <p className="text-sm text-gray-400">
            {patient.personalData.age} años |{" "}
            {patient.pregnancyData.gestationStage} semanas de embarazo
          </p>
        </div>
      </section>
      <Divider className="mt-2" />
      <section className="justify-self-end mt-2">
        {role == "admin" && (
          <>
            <small>Doctor asignado:</small>
            <span>{doctor}</span>

            <button
              className="text-red-600 font-bold hover:text-red-800"
              onClick={() => setIsModalOpen(true)}
            >
              <DeleteRounded />
            </button>
          </>
        )}
        <button
          className="text-[--primary-color] font-bold hover:text-[--primary-color-dark]"
          onClick={() => handleRowClick(patient)}
        >
          <OpenInNewRounded />
        </button>

        <DeleteModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          handleDelete={() => handleDelete(patient)}
          title="Eliminar paciente"
          message="¿Estás seguro que deseas eliminar este paciente? Esta acción no se
            puede deshacer."
        />
      </section>
    </article>
  );
}
