import { PersonAddRounded } from "@mui/icons-material";
import Card from "../../../components/ui/Card";
import Link from "next/link";
import PatientCard from "../../../components/ui/PatientCard";
import { getPacientes } from "./[record]/page";
import { redirect } from "next/navigation";

export default async function PacientesPage() {
  const patients = await getPacientes();

  const isAuthenticated = JSON.parse(localStorage.getItem('isAuthenticated') || 'false');
  
  if (!isAuthenticated) {
    // Redirect to login if the user is not authenticated
    redirect("/login");
  }

  return (
    <Card
      title="Pacientes"
      subtitle="Listado de pacientes"
      action={
        <Link href="/doctor/pacientes/crear">
          <button className="flex items-center space-x-2 font-bold text-[--primary-color] hover:text-[--primary-color-dark]">
            <PersonAddRounded />
            <span>Añadir paciente</span>
          </button>
        </Link>
      }
    >
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {patients.map((patient, index) => (
          <PatientCard key={index} patient={patient} />
        ))}
      </section>
    </Card>
  );
}
