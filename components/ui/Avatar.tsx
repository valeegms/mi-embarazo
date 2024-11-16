export default function Avatar({
  name,
  className,
}: {
  name: string;
  className?: string;
}) {
  const getInitials = (name: string) => {
    const [firstName, lastName] = name.split(" ");
    return `${firstName.charAt(0)}${lastName.charAt(0)}`;
  };

  return (
    <div
      className={`${className} flex items-center justify-center text-xs ${
        className?.includes("w-") && className.includes("h-")
          ? className
          : "w-8 h-8"
      } bg-purple-300 text-purple-600 rounded-full`}
    >
      <span className="font-semibold">{getInitials(name)}</span>
    </div>
  );
}
