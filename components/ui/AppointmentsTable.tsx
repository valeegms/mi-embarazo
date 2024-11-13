import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import Badge from "./Badge";
import { DeleteRounded, Edit } from "@mui/icons-material";

type Appointment = {
  name: string;
  record: string;
  date: string;
  time: string;
  type: string;
  status: string;
};

type AppointmentsTableProps = {
  appointments: Appointment[];
  onEdit: (appointment: Appointment) => void;
  onDelete: (appointment: Appointment) => void;
};

const getTypeChipColor = (
  type: string
): { color: "warning" | "secondary" | "primary" } => {
  switch (type) {
    case "Nuevo paciente":
      return { color: "warning" };
    case "Seguimiento":
      return { color: "secondary" };
    default:
      return { color: "primary" };
  }
};

const getStatusChipColor = (
  status: string
): { color: "success" | "danger" | "primary" } => {
  switch (status) {
    case "Confirmada":
      return { color: "success" };
    case "Cancelada":
      return { color: "danger" };
    default:
      return { color: "primary" };
  }
};

export default function AppointmentsTable({
  appointments,
  onEdit,
  onDelete,
}: AppointmentsTableProps) {
  return (
    <TableContainer component={Paper} className="pt-6">
      <Table aria-label="appointments table">
        <TableHead>
          <TableRow>
            <TableCell>
              <strong>Nombre del paciente</strong>
            </TableCell>
            <TableCell>
              <strong>No. Expediente</strong>
            </TableCell>
            <TableCell>
              <strong>Fecha de cita</strong>
            </TableCell>
            <TableCell>
              <strong>Hora de cita</strong>
            </TableCell>
            <TableCell>
              <strong>Tipo de cita</strong>
            </TableCell>
            <TableCell>
              <strong>Estado</strong>
            </TableCell>
            <TableCell></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {appointments.map((appointment, index) => (
            <TableRow key={index}>
              <TableCell>{appointment.name}</TableCell>
              <TableCell>{appointment.record}</TableCell>
              <TableCell>{appointment.date}</TableCell>
              <TableCell>{appointment.time}</TableCell>
              <TableCell>
                <Badge type={getTypeChipColor(appointment.type).color}>
                  {appointment.type}
                </Badge>
              </TableCell>
              <TableCell>
                <Badge type={getStatusChipColor(appointment.status).color}>
                  {appointment.status}
                </Badge>
              </TableCell>
              <TableCell>
                <div className="flex gap-4">
                  <button
                    className="bg-yellow-100 px-2 py-1 rounded text-yellow-800 hover:bg-yellow-600 hover:bg-opacity-25"
                    onClick={() => onEdit(appointment)}
                  >
                    <Edit />
                  </button>
                  <button
                    className="bg-red-100 px-2 py-1 rounded text-red-800 hover:bg-red-600 hover:bg-opacity-25"
                    onClick={() => onDelete(appointment)}
                  >
                    <DeleteRounded />
                  </button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
