import { useState, useEffect } from "react";
import { Appointment } from "@/pages/citas"; // Importa la interfaz Appointment

interface CitasModalProps {
  isOpen: boolean;
  onClose: () => void;
  appointment?: Appointment;
  onSave: (appointment: Appointment) => void; // El tipo de onSave es Appointment
}

const CitasModal = ({ isOpen, onClose, appointment, onSave }: CitasModalProps) => {
  const [formData, setFormData] = useState<Appointment>({
    record: "",
    patient: "",
    patient_name: "",
    doctor: "",
    file: null,
    date: "",
    time: "",
    date_type: "",
    status: "",
    weight: 0,
    bloodPressure: "",
    fetalHeartRate: "",
    fetalStatus: "",
    observations: "",
    prescription: "",
  });

  useEffect(() => {
    if (appointment) {
      setFormData(appointment);
    }
  }, [appointment]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Llamar a la función onSave al guardar la cita
    onSave(formData);
  };

  return (
    <div
      className={`fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center transition-opacity ${
        isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
      }`}
    >
      <div className="bg-white p-4 rounded-md shadow-lg w-1/3">
        <h2 className="text-xl font-bold mb-4">{appointment ? "Editar Cita" : "Nueva Cita"}</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label htmlFor="patient_name" className="text-sm font-bold text-gray-700">Nombre del paciente</label>
            <input
              type="text"
              id="patient_name"
              name="patient_name"
              value={formData.patient_name}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="record" className="text-sm font-bold text-gray-700">Expediente</label>
            <input
              type="text"
              id="record"
              name="record"
              value={formData.record}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="flex space-x-4">
            <div className="w-1/2 space-y-2">
              <label htmlFor="date" className="text-sm font-bold text-gray-700">Fecha de cita</label>
              <input
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                type="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
              />
            </div>

            <div className="w-1/2 space-y-2">
              <label htmlFor="time" className="text-sm font-bold text-gray-700">Hora de cita</label>
              <input
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                type="time"
                name="time"
                value={formData.time}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="flex space-x-4">
            <div className="w-1/2 space-y-2">
              <label htmlFor="date_type" className="text-sm font-bold text-gray-700">Tipo de cita</label>
              <select
                id="date_type"
                name="date_type"
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={formData.date_type}
                onChange={handleChange}
              >
                <option value="Nuevo paciente">Nuevo paciente</option>
                <option value="Virtual">Virtual</option>
                <option value="Presencial">Presencial</option>
              </select>
            </div>

            <div className="w-1/2 space-y-2">
              <label htmlFor="status" className="text-sm font-bold text-gray-700">Estado</label>
              <select
                id="status"
                name="status"
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={formData.status}
                onChange={handleChange}
              >
                <option value="Confirmada">Confirmada</option>
                <option value="Pendiente">Pendiente</option>
              </select>
            </div>
          </div>

          <div className="mt-6 flex justify-between">
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-500 text-white px-6 py-3 rounded-md hover:bg-gray-600"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="bg-blue-500 text-white px-6 py-3 rounded-md hover:bg-blue-600"
            >
              Guardar
            </button>
          </div>
        </form>

      </div>
    </div>
  );
};

export default CitasModal;

