import { PersonAddRounded } from "@mui/icons-material";
import Card from "./ui/Card";
import Link from "next/link";
import PatientCard from "./ui/PatientCard";

const patients = [
  {
    "_id": "67463e59df9cb544def7eaff",
    "record": "2025-001",
    "name": "Chappel Roan",
    "personalData": {
      "name": "Chappel Roan",
      "gender": "male",
      "phone": "9123487893",
      "age": 23,
      "birthDate": "2001-12-13",
      "email": "chappelroan@hotmail.com",
      "password": "chappel1234",
      "curp": "CHRO010101HDFRML09",
      "maritalStatus": "single",
      "occupation": "doctor",
      "address": "123 Main St, Springfield, IL",
      "street": "123 Main St",
      "municipality": "Springfield",
      "locality": "Central",
      "state": "IL"
    },
    "last_appointment_id": "6748c9fd291482ee22af1a34",
    "last_appointment": "2024-11-28",
    "current_phone": "9991234567",
    "doctor_options": ["doctor1", "doctor2"],
    "schedule_options": ["2024-12-01T10:00:00", "2024-12-02T11:00:00"],
    "doctor": "doctor1",
    "date": "2024-12-01",
    "pregnancyData": null,
    "medicalHistory": null
  },
  {
    "_id": "674696da871bdb5cfa4b1fbe",
    "record": "2025-002",
    "name": "John Doe",
    "personalData": {
      "name": "John Doe",
      "gender": "male",
      "phone": "18273728273",
      "age": 54,
      "birthDate": "1969-03-27",
      "email": "mariahcarey@example.com",
      "password": "mariah1234",
      "curp": "MACE690327HDFRML09",
      "maritalStatus": "married",
      "occupation": "singer",
      "address": "456 Melody Ave, New York, NY",
      "street": "456 Melody Ave",
      "municipality": "New York",
      "locality": "Manhattan",
      "state": "NY"
    },
    "last_appointment_id": "6748c9fd291482ee22af1a35",
    "last_appointment": "2024-11-25",
    "current_phone": "9999876543",
    "doctor_options": ["doctor3", "doctor4"],
    "schedule_options": ["2024-12-05T10:00:00", "2024-12-06T14:00:00"],
    "doctor": "doctor3",
    "date": "2024-12-05",
    "pregnancyData": null,
    "medicalHistory": null
  },
  {
    "_id": "67469788e31a7f598166dbc2",
    "record": "2025-003",
    "name": "Taylor Swift",
    "personalData": {
      "name": "Taylor Swift",
      "gender": "male",
      "phone": "9980736275",
      "age": 36,
      "birthDate": "1947-03-25",
      "email": "ts1989@example.com",
      "password": "elton1234",
      "curp": "ELJO470325HDFRML09",
      "maritalStatus": "married",
      "occupation": "musician",
      "address": "789 Music Blvd, Los Angeles, CA",
      "street": "789 Music Blvd",
      "municipality": "Los Angeles",
      "locality": "Hollywood",
      "state": "CA"
    },
    "last_appointment_id": "6748c9fd291482ee22af1a36",
    "last_appointment": "2024-11-22",
    "current_phone": "9988765432",
    "doctor_options": ["doctor5", "doctor6"],
    "schedule_options": ["2024-12-10T09:00:00", "2024-12-11T15:00:00"],
    "doctor": "doctor5",
    "date": "2024-12-10",
    "pregnancyData": null,
    "medicalHistory": null
  },
  {
    "_id": "6746b5f5113de4cbf099bbc5",
    "record": "2025-004",
    "name": "Lady Gaga",
    "personalData": {
      "name": "Lady Gaga",
      "gender": "female",
      "phone": "9876543210",
      "age": 38,
      "birthDate": "1986-03-28",
      "email": "ladygaga@example.com",
      "password": "gaga1234",
      "curp": "LAGA860328HDFRML09",
      "maritalStatus": "single",
      "occupation": "singer",
      "address": "101 Fame St, Los Angeles, CA",
      "street": "101 Fame St",
      "municipality": "Los Angeles",
      "locality": "Downtown",
      "state": "CA"
    },
    "last_appointment_id": "6748c9fd291482ee22af1a37",
    "last_appointment": "2024-11-18",
    "current_phone": "9871234567",
    "doctor_options": ["doctor7", "doctor8"],
    "schedule_options": ["2024-12-12T10:00:00", "2024-12-13T14:30:00"],
    "doctor": "doctor7",
    "date": "2024-12-12",
    "pregnancyData": null,
    "medicalHistory": null
  },
  {
    "_id": "6746b588113de4cbf099bbc5",
    "record": "2029-004",
    "name": "Lenin Gael",
    "personalData": {
      "name": "Lenin Gael",
      "gender": "male",
      "phone": "9876543210",
      "age": 23,
      "birthDate": "1986-03-28",
      "email": "lg@dealer.com",
      "password": "gaga1234",
      "curp": "LAGA860328HDFRML09",
      "maritalStatus": "single",
      "occupation": "singer",
      "address": "101 Fame St, Los Angeles, CA",
      "street": "101 Fame St",
      "municipality": "Los Angeles",
      "locality": "Downtown",
      "state": "CA"
    },
    "last_appointment_id": "6748c9fd291482ee22af1a37",
    "last_appointment": "2024-11-18",
    "current_phone": "9871234567",
    "doctor_options": ["doctor7", "doctor8"],
    "schedule_options": ["2024-12-12T10:00:00", "2024-12-13T14:30:00"],
    "doctor": "doctor7",
    "date": "2024-12-12",
    "pregnancyData": null,
    "medicalHistory": null
  }
];


export default function PacientesPage({ role }: { role: string }) {
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

