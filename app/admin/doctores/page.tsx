"use client";

import { useState } from "react";
import DoctorsTable from "../../../components/ui/DoctorsTable";
import DoctorsModal from "../../../components/ui/DoctorsModal";
import Input from "../../../components/ui/Input";
import DeleteModal from "../../../components/ui/DeleteModal";

const doctors = [
  {
    name: "Dr. Juan Perez",
    speciality: "Pediatra",
    email: "juanp@doctor.com",
    phone: "1234567890",
    gender: "Masculino",
    office: "A-123",
    license: "123456",
  },
  {
    name: "Dra. Maria Lopez",
    speciality: "Ginecologa",
    email: "marial@doctor.com",
    phone: "0987654321",
    gender: "Femenino",
    office: "B-456",
    license: "654321",
  },
  {
    name: "Dr. Carlos Ramirez",
    speciality: "Cardiologo",
    email: "carlosr@doctor.com",
    phone: "1230984567",
    gender: "Masculino",
    office: "C-789",
    license: "456789",
  },
];

export default function DoctoresPage() {
  const [isDoctorsModalOpen, setIsDoctorsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [doctor, setDoctor] = useState<
    | {
        name: string;
        speciality: string;
        email: string;
        phone: string;
        gender: string;
        office: string;
        license: string;
      }
    | undefined
  >(undefined);

  const handleNewDoctor = () => {
    setDoctor(undefined);
    setIsDoctorsModalOpen(true);
  };

  const handleEditDoctor = (doctor: (typeof doctors)[0]) => {
    setDoctor(doctor);
    setIsDoctorsModalOpen(true);
  };

  const handleDeleteDoctor = (doctor: (typeof doctors)[0]) => {
    // TODO: Delete doctor
    setIsDeleteModalOpen(true);
  };

  return (
    <main>
      <section className="flex justify-between items-center pb-2">
        <h1 className="text-3xl font-bold">Doctores</h1>
        <button
          className="bg-[--primary-color] text-white rounded-md p-2 px-8"
          onClick={handleNewDoctor}
        >
          Nuevo doctor
        </button>
      </section>
      <Input name="search" placeholder="Buscar cita" type="search" />
      <DoctorsTable
        doctors={doctors}
        onEditDoctor={handleEditDoctor}
        onDeleteDoctor={handleDeleteDoctor}
      />

      <DeleteModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        title="Eliminar doctor"
        message="¿Estás seguro que deseas eliminar este doctor? Esta acción no se puede deshacer."
      />

      <DoctorsModal
        isOpen={isDoctorsModalOpen}
        onClose={() => setIsDoctorsModalOpen(false)}
        doctor={doctor}
      />
    </main>
  );
}
