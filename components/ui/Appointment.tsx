interface AppointmentProps {
  name: string;
  time: string;
  status: boolean;  // Representa si la cita está activa o no
  action?: () => void; // Acción opcional para manejar eventos como terminar o iniciar la cita
  onClick?: () => void; // Acción opcional para manejar clics (como abrir el modal)
}

export default function Appointment({
  name,
  time,
  status,
  action,
  onClick,
}: AppointmentProps) {
  // Determinar el color de fondo basado en el estado de la cita
  const bgColor = status ? "bg-[#FFD6FD]" : "bg-[#FFE7FE]";

  return (
    <article className={`${bgColor} shadow-sm rounded-lg p-6 text-black`}>
      <section className="flex justify-between items-center w-full">
        <h3 className="text-lg font-light">{name}</h3>
        
        {/* Mostrar botón solo si onClick está presente */}
        {onClick && (
          <button
            onClick={onClick}
            className="px-2 bg-[--primary-color] text-white font-bold py-2 rounded-md"
          >
            {status ? "Terminar" : "Iniciar"}
          </button>
        )}
      </section>
      
      <p className="font-bold">{time}</p>
      
      {/* Mostrar acción adicional si se pasa */}
      {action && (
        <button
          onClick={action}
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md"
        >
          Realizar acción
        </button>
      )}
    </article>
  );
}
