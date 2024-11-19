import { Modal } from "@mui/material";
import Input from "./Input";
import { useEffect, useState } from "react";

type Doctor = {
  name: string;
  speciality: string;
  email: string;
  phone: string;
  gender: string;
  office: string;
  license: string;
  password?: string;
};

export default function DoctorsModal({
  isOpen,
  onClose,
  doctor,
}: {
  isOpen: boolean;
  onClose: () => void;
  doctor?: Doctor;
}) {
  const [formData, setFormData] = useState<Doctor>({
    name: "",
    speciality: "",
    email: "",
    phone: "",
    gender: "Masculino",
    office: "",
    license: "",
  });

  useEffect(() => {
    if (doctor) {
      setFormData(doctor);
    } else {
      // Reset form for new doctor records
      setFormData({
        name: "",
        speciality: "",
        email: "",
        phone: "",
        gender: "Masculino",
        office: "",
        license: "",
      });
    }
  }, [doctor]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Submitted Data: ", formData);
    onClose();
  };

  return (
    <Modal open={isOpen} onClose={onClose}>
      <div className="bg-white p-8 w-8/12 mx-auto mt-20 rounded-md">
        <h2 className="text-2xl font-bold">
          {doctor ? "Editar doctor" : "Nuevo doctor"}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          <Input
            label="Nombre"
            name="name"
            type="text"
            value={formData.name}
            onChange={handleChange}
          />
          <div className="flex space-x-2">
            <Input
              label="Especialidad"
              name="speciality"
              type="text"
              className="flex-1"
              value={formData.speciality}
              onChange={handleChange}
            />
            <Input
              label="Cédula Profesional"
              name="license"
              type="text"
              className="flex-1"
              value={formData.license}
              onChange={handleChange}
            />
          </div>
          <div className="flex space-x-2">
            <Input
              label="Correo"
              name="email"
              type="email"
              className="flex-1"
              value={formData.email}
              onChange={handleChange}
            />
            <Input
              label="Teléfono"
              name="phone"
              type="tel"
              className="flex-1"
              value={formData.phone}
              onChange={handleChange}
            />
          </div>
          <Input
            label="Contraseña"
            name="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
          />
          {doctor && (
            <div className="flex space-x-2">
              <Input
                label="Nueva Contraseña"
                name="newPassword"
                type="password"
                className="flex-1"
                value={formData.password}
                onChange={handleChange}
              />
              <Input
                label="Confirmar Contraseña"
                name="confirmPassword"
                type="password"
                className="flex-1"
                value={formData.password}
                onChange={handleChange}
              />
            </div>
          )}
          <div className="flex space-x-2">
            <div className="space-y-1 flex-1">
              <label
                className="text-[#8b8b8b] text-sm font-bold"
                htmlFor="gender"
              >
                Género
              </label>
              <select
                id="gender"
                name="gender"
                className="p-2 border border-gray-200 rounded-md w-full"
                value={formData.gender}
                onChange={handleChange}
              >
                <option value="Masculino">Masculino</option>
                <option value="Femenino">Femenino</option>
              </select>
            </div>
            <Input
              className="flex-1"
              label="Consultorio"
              name="office"
              type="text"
              value={formData.office}
              onChange={handleChange}
            />
          </div>

          <section className="flex space-x-2">
            <button
              type="submit"
              className="bg-[--primary-color] text-white rounded-md p-2 w-full"
            >
              Guardar
            </button>
            <button
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
