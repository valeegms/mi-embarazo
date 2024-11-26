"use client";

import { useEffect, useState } from "react";
import DoctorsTable from "../../../components/ui/DoctorsTable";
import DoctorsModal from "../../../components/ui/DoctorsModal";
import Input from "../../../components/ui/Input";
import DeleteModal from "../../../components/ui/DeleteModal";
import { DoctorModel } from "@/models/DoctorModel";
import { addDoctor, fetchDoctors, updateDoctor } from "@/services/doctor";

export default function DoctoresPage() {
  const [doctors, setDoctors] = useState<DoctorModel[]>([]);
  const [loading, setLoading] = useState(true);
  const [isDoctorsModalOpen, setIsDoctorsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [doctor, setDoctor] = useState<DoctorModel | undefined>(undefined);

  useEffect(() => {
    const loadDoctors = async () => {
      try {
        const data = (await fetchDoctors()) as DoctorModel[];
        setDoctors(data);
      } catch (error) {
        console.error("Error fetching doctors:", error);
      } finally {
        setLoading(false);
      }
    };

    loadDoctors();
  }, []);

  const handleNewDoctor = () => {
    setDoctor(undefined);
    setIsDoctorsModalOpen(true);
  };

  const handleEditDoctor = (doctor: (typeof doctors)[0]) => {
    setDoctor(doctor);
    setIsDoctorsModalOpen(true);
  };

  const handleSaveDoctor = async (newDoctor: DoctorModel) => {
    try {
      if (newDoctor.id) {
        // Update existing doctor
        const updatedDoctor = (await updateDoctor(
          newDoctor.id,
          newDoctor
        )) as DoctorModel;
        setDoctors((prevDoctors) =>
          prevDoctors.map((doctor) =>
            doctor.id === newDoctor.id ? updatedDoctor : doctor
          )
        );
      } else {
        // Add new doctor
        const createdDoctor = (await addDoctor(newDoctor)) as DoctorModel;
        setDoctors((prevDoctors) => [...prevDoctors, createdDoctor]);
      }
      alert("Doctor guardado exitosamente");
    } catch (error) {
      console.error("Error saving doctor:", error);
      alert("Error guardando el doctor.");
    } finally {
      setIsDoctorsModalOpen(false);
    }
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
      {loading && <p>Cargando doctores...</p>}
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
        onSave={handleSaveDoctor}
      />
    </main>
  );
}
