import { Modal } from "@mui/material";
import Input from "./Input";
import { useEffect, useState } from "react";

export default function CitasModal({
  isOpen,
  onClose,
  appointment,
  onSave,
}: {
  isOpen: boolean;
  onClose: () => void;
  appointment?: {
    name: string;
    record: string;
    date: string;
    time: string;
    type: string;
    status: string;
  };
  onSave: (updatedAppointment: {
    name: string;
    record: string;
    date: string;
    time: string;
    type: string;
    status: string;
  }) => void; // Callback to save the appointment
}) {
  const [formData, setFormData] = useState({
    name: "",
    record: "",
    date: "",
    time: "",
    type: "Nuevo paciente",
    status: "Confirmada",
  });

  useEffect(() => {
    if (appointment) {
      setFormData(appointment);
    } else {
      // Reset form for new appointments
      setFormData({
        name: "",
        record: "",
        date: "",
        time: "",
        type: "Nuevo paciente",
        status: "Confirmada",
      });
    }
  }, [appointment]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData); // Notify parent about the changes
    onClose(); // Close the modal
  };

  return (
    <Modal open={isOpen} onClose={onClose}>
      <div className="bg-white p-8 w-[30rem] mx-auto mt-20 rounded-md">
        <h2 className="text-2xl font-bold">
          {appointment ? "Editar cita" : "Nueva cita"}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          <label
            className="text-[#8b8b8b] text-sm font-bold"
            htmlFor="paciente"
          >
            Nombre
          </label>
          <select
            id="paciente"
            name="name"
            className="p-2 border border-gray-200 rounded-md w-full"
            onChange={handleChange}
            value={formData.name}
            disabled={appointment !== undefined}
          >
            {appointment ? (
              <option value={appointment.name}>{appointment.name}</option>
            ) : (
              <option value="">Seleccionar paciente</option>
            )}
            <option value="María González">María González</option>
            <option value="José Pérez">José Pérez</option>
            <option value="Ana García">Ana García</option>
            <option value="Carlos López">Carlos López</option>
          </select>
          <Input
            label="Expediente"
            name="record"
            type="text"
            value={formData.record}
            onChange={handleChange}
            disabled={appointment !== undefined}
          />
          <div className="flex space-x-2">
            <Input
              className="flex-1"
              label="Fecha de cita"
              name="date"
              type="date"
              value={formData.date}
              onChange={handleChange}
            />
            <Input
              className="flex-1"
              label="Hora de cita"
              name="time"
              type="time"
              value={formData.time}
              onChange={handleChange}
            />
          </div>
          <div className="flex space-x-2">
            <div className="space-y-1 flex-1">
              <label
                className="text-[#8b8b8b] text-sm font-bold"
                htmlFor="type"
              >
                Tipo de cita
              </label>
              <select
                id="type"
                name="type"
                className="p-2 border border-gray-200 rounded-md w-full"
                value={formData.type}
                onChange={handleChange}
              >
                <option value="Consultation">Nuevo paciente</option>
                <option value="virtual">Virtual</option>
                <option value="presencial">Presencial</option>
              </select>
            </div>
            <div className="space-y-1 flex-1">
              <label
                className="text-[#8b8b8b] text-sm font-bold"
                htmlFor="status"
              >
                Estado
              </label>
              <select
                id="status"
                name="status"
                className="p-2 border border-gray-200 rounded-md w-full"
                value={formData.status}
                onChange={handleChange}
              >
                <option value="pending">Pending</option>
                <option value="Scheduled">Scheduled</option>
              </select>
            </div>
          </div>
          <section className="flex space-x-2">
            <button
              type="submit"
              className="bg-[--primary-color] text-white rounded-md p-2 w-full"
            >
              Guardar
            </button>
            <button
              type="button"
              onClick={onClose}
              className="bg-red-100 text-red-700 rounded-md p-2 w-full hover:bg-red-200"
            >
              Cancelar
            </button>
          </section>
        </form>
      </div>
    </Modal>
  );
}