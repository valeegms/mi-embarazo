import { PersonAddRounded } from "@mui/icons-material";
import Card from "./ui/Card";
import Link from "next/link";
import PatientCard from "./ui/PatientCard";
import { getPacientes } from "./DetallesPaciente";

export default async function PacientesPage({ role }: { role: string }) {
  const patients = await getPacientes();

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
