export default function Avatar({ name }: { name: string | null | undefined }) {
  const getInitials = (name: string | null | undefined) => {
    if (!name) {
      return "NA"; // Default initials when no name is provided
    }
    const [firstName, lastName] = name.split(" ");
    return `${firstName?.charAt(0) || ""}${lastName?.charAt(0) || ""}`.toUpperCase();
  };

  return (
    <div className="avatar">
      <span>{getInitials(name)}</span>
    </div>
  );
}

