"use client";

import { Divider } from "@mui/material";
import Avatar from "./Avatar";
import { OpenInNewRounded } from "@mui/icons-material";

export default function PatientCard({ patient }: { patient: any }) {
  
  const handleRowClick = (record: string) => {
    console.log(record);
    window.open(`/doctor/pacientes/${record}`, "_blank");
  };

  console.log("paciente: ", patient);

  return (
    <article className="bg-white shadow-md rounded-lg p-6">
      <section className="flex items-center space-x-4">
        <Avatar name={patient.personalData.name} />
        <div>
          <h3 className="font-bold">{patient.personalData.name}</h3>
          <p className="text-sm text-gray-400">
            {patient.personalData.age} años |{" "}
          </p>
        </div>
      </section>
      <Divider className="mt-2" />
      <section className="justify-self-end mt-2">
        <button
          className="text-[--primary-color] font-bold hover:text-[--primary-color-dark]"
          onClick={() => handleRowClick(patient.record)}
        >
          <OpenInNewRounded />
        </button>
      </section>
    </article>
  );
}
