export default function Appointment({
  name,
  time,
  status,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  action,
  onClick,
}: {
  name: string;
  time: string;
  status: boolean;
  action?: () => void;
  onClick?: () => void;
}) {
  const bgColor = status ? "bg-[#FFD6FD]" : "bg-[#FFE7FE]";

  return (
    <article className={`${bgColor} shadow-sm rounded-lg p-6 text-black`}>
      <section className="flex justify-between items-center w-full">
        <h3 className="text-lg font-light">{name}</h3>
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
    </article>
  );
}
