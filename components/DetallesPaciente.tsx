import Avatar from "./ui/Avatar";
import PatientRecord from "./ui/PatientRecord";

export async function getPacientes() {
  const res = await fetch("http://localhost:4000/patients");
  const patients = await res.json();

  return patients;
}

// obtener por id
export async function getPacienteById(record: string) {
  const res = await fetch(`http://localhost:4000/patients?record=${record}`);
  const patient = await res.json();

  return patient;
}

export default async function DetallesPaciente({
  params,
}: {
  params: { record: string };
}) {
  const { record } = params;
  const patient = await getPacienteById(record);

  const lastAppointmentDate = new Date(
    patient[0].lastAppointment.date
  ).toLocaleDateString("es-MX", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div>
      <section className="pb-4">
        <div className="flex gap-4 items-center">
          <Avatar name={patient[0].personalData.name} />
          <h1 className="text-3xl font-bold">{patient[0].personalData.name}</h1>
        </div>
        <p className="text-gray-400 pt-1">
          <span className="font-bold">Última cita:</span> {lastAppointmentDate}
        </p>
      </section>
      <PatientRecord patient={patient[0]} />
    </div>
  );
}
