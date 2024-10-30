import { Search } from "@mui/icons-material";

export default function Input({
  name,
  label,
  type,
  value,
  onChange,
  placeholder,
  disabled,
  className,
}: {
  name: string;
  label?: string;
  type: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  disabled?: boolean;
  className?: string;
}) {
  return (
    <div className={`${className} py-2 flex flex-col`}>
      {label && (
        <label className="text-[#8b8b8b] text-sm font-bold" htmlFor={name}>
          {label}
        </label>
      )}
      <div className="relative">
        <input
          name={name}
          className={`${
            disabled
              ? "border-gray-400 bg-transparent text-gray-500 bg-gray-200"
              : "text-black  p-2"
          } border py-2 px-2 rounded-md font-medium focus:outline-none w-full ${
            type === "search" ? "pl-10" : ""
          }`}
          type={type}
          id={label}
          value={value}
          onChange={onChange}
          disabled={disabled}
          placeholder={placeholder}
        />
        {type === "search" ? (
          <Search className="absolute left-2 top-2 text-[#8b8b8b]" />
        ) : (
          ""
        )}
      </div>
      {/* <input
        name={name}
        className={`${
          disabled ? "border-none bg-transparent" : "border-gray-300 p-2"
        } border text-black rounded-md font-medium focus:outline-none`}
        type={type}
        id={label}
        value={value}
        onChange={onChange}
        disabled={disabled}
        placeholder={placeholder}
      /> */}
    </div>
  );
}
