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
}: {
  patient: PatientModel;
  role: string;
}) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const handleRowClick = (record: string) => {
    window.open(`/${role}/pacientes/${record}`, "_blank");
  };

  const handleDelete = (record: string) => {
    // TODO: Implement delete patient
    console.log("Deleting patient with record: ", record);
    setIsModalOpen(true);
  };

  return (
    <article className="bg-white shadow-md rounded-lg p-6">
      <section className="flex items-center space-x-4">
        <Avatar name={patient.personalData.name} />
        <div>
          <h3 className="font-bold">{patient.personalData.name}</h3>
          <p className="text-sm text-gray-400">
            {patient.personalData.age} años |{" "}
            {patient.pregnancyData.gestationStage} meses de embarazo
          </p>
        </div>
      </section>
      <Divider className="mt-2" />
      <section className="justify-self-end mt-2">
        {role == "admin" && (
          <button
            className="text-red-600 font-bold hover:text-red-800"
            onClick={() => handleDelete(patient.record)}
          >
            <DeleteRounded />
          </button>
        )}
        <button
          className="text-[--primary-color] font-bold hover:text-[--primary-color-dark]"
          onClick={() => handleRowClick(patient.record)}
        >
          <OpenInNewRounded />
        </button>

        <DeleteModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          title="Eliminar paciente"
          message="¿Estás seguro que deseas eliminar este paciente? Esta acción no se
            puede deshacer."
        />
      </section>
    </article>
  );
}
