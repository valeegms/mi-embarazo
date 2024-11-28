import { PersonAddRounded } from "@mui/icons-material";
import Card from "./ui/Card";
import Link from "next/link";
import PatientCard from "./ui/PatientCard";
import { PatientModel } from "@/src/models/PatientModel";

export const patients: PatientModel[] = [
  {
    id: "1",
    record: "REC123456",
    name: "Ana López",
    personalData: {
      name: "Ana López",
      gender: "Femenino",
      phone: "555-123-4567",
      age: 30,
      birthDate: "1994-05-12",
      email: "ana.lopez@example.com",
      password: "password123",
      curp: "LOPA940512MDFXYZ01",
      maritalStatus: "Casada",
      occupation: "Ingeniera",
      address: { calle: "Av. Siempre Viva", numero: "742", colonia: "Centro" },
      street: "Centro",
      municipality: "Mérida",
      locality: "Mérida",
      state: "Yucatán",
    },
    current_phone: "555-123-4567",
    doctor_options: ["Dr. Pérez", "Dr. Martínez"],
    schedule_options: ["Mañana", "Tarde"],
    doctor: "Dr. Pérez",
    date: "2024-11-30",
    pregnancyData: {
      lastMenstruation: "2024-08-15",
      dueDate: "2024-05-20",
      gestationStage: "Segundo trimestre",
      previousPregnancies: 1,
      abortions: 0,
      pregnancyType: "Normal",
      complication: "Sin complicaciones",
      observations: "Control prenatal en curso",
    },
    medicalHistory: {
      medicalConditions: "Diabetes gestacional",
      gynecologicalHistory: "Cesárea previa",
      allergies: "Penicilina",
      familyHistory: "Historia familiar de hipertensión",
    },
  },
  {
    id: "2",
    record: "REC654322",
    name: "María Fernández",
    personalData: {
      name: "María Fernández",
      gender: "Femenino",
      phone: "555-321-9876",
      age: 40,
      birthDate: "1984-09-15",
      email: "maria.fernandez@example.com",
      password: "password456",
      curp: "FEMA840915MDFXYZ03",
      maritalStatus: "Divorciada",
      occupation: "Maestra",
      address: { calle: "Calle Primavera", numero: "25", colonia: "Las Rosas" },
      street: "Las Rosas",
      municipality: "Guadalajara",
      locality: "Guadalajara",
      state: "Jalisco",
    },
    current_phone: "555-321-9876",
    doctor_options: ["Dr. Ramírez", "Dra. López"],
    schedule_options: ["Mañana", "Tarde"],
    doctor: "Dra. López",
    date: "2024-12-01",
    pregnancyData: {
      lastMenstruation: "2024-09-01",
      dueDate: "2024-06-10",
      gestationStage: "Primer trimestre",
      previousPregnancies: 2,
      abortions: 0,
      pregnancyType: "Normal",
      complication: "Hipertensión leve",
      observations: "Requiere monitoreo de presión arterial",
    },
    medicalHistory: {
      medicalConditions: "Hipertensión arterial",
      gynecologicalHistory: "Dos cesáreas previas",
      allergies: "Aspirina",
      familyHistory: "Historia familiar de diabetes tipo 2",
    },
  },
  {
    id: "3",
    record: "REC789012",
    name: "Carla Gómez",
    personalData: {
      name: "Carla Gómez",
      gender: "Femenino",
      phone: "555-246-1357",
      age: 28,
      birthDate: "1996-03-14",
      email: "carla.gomez@example.com",
      password: "mypassword123",
      curp: "GOMC960314MDFXYZ03",
      maritalStatus: "Unión libre",
      occupation: "Estilista",
      address: {
        calle: "Boulevard Reforma",
        numero: "50",
        colonia: "Chapultepec",
      },
      street: "Chapultepec",
      municipality: "Puebla",
      locality: "Puebla",
      state: "Puebla",
    },
    current_phone: "555-246-1357",
    doctor_options: ["Dr. Hernández", "Dr. Jiménez"],
    schedule_options: ["Tarde", "Noche"],
    doctor: "Dr. Hernández",
    date: "2024-11-25",
    pregnancyData: {
      lastMenstruation: "2024-06-01",
      dueDate: "2024-03-15",
      gestationStage: "Tercer trimestre",
      previousPregnancies: 2,
      abortions: 1,
      pregnancyType: "Gemelar",
      complication: "Anemia leve",
      observations: "Recomendado aumento de hierro en dieta",
    },
    medicalHistory: {
      medicalConditions: "Asma",
      gynecologicalHistory: "Dos partos vaginales previos",
      allergies: "",
      familyHistory: "Historia familiar de asma",
    },
  },
];

export default async function PacientesPage({ role }: { role: string }) {
  return (
    <Card
      title="Pacientes"
      subtitle="Listado de pacientes"
      action={
        <Link href={`/${role}/pacientes/crear`}>
          <button className="flex items-center space-x-2 font-bold text-[--primary-color] hover:text-[--primary-color-dark]">
            <PersonAddRounded />
            <span>Añadir paciente</span>
          </button>
        </Link>
      }
    >
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {patients.map((patient, index) => (
          <PatientCard key={index} patient={patient} role={role} />
        ))}
      </section>
    </Card>
  );
}
