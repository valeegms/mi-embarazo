export default function Avatar({ name }: { name: string }) {
  const getInitials = (name: string) => {
    const [firstName, lastName] = name.split(" ");
    return `${firstName.charAt(0)}${lastName.charAt(0)}`;
  };

  return (
    <div className="flex items-center justify-center w-8 h-8 bg-purple-300 text-purple-600 rounded-full">
      <span className="text-xs font-semibold">{getInitials(name)}</span>
    </div>
  );
}
