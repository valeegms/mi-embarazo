"use client";

import Link from "next/link";
import Logo from "./ui/Logo";
import { usePathname, useRouter } from "next/navigation";
import Avatar from "./ui/Avatar";
import {
  DateRangeRounded,
  FaceRounded,
  GroupsRounded,
  HomeRounded,
  LogoutRounded,
} from "@mui/icons-material";

export default function Navbar({ role }: { role: string }) {
  const pathname = usePathname();
  const router = useRouter();

  const user_info = JSON.parse(localStorage.getItem("user_info") || "{}");
  const username = user_info.name;

  // Para el cierre de sesión :)
  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("user_info");
    router.push("/");
  };

  return (
    <nav className="bg-white shadow-lg">
      <div className="container mx-auto px-4">
        <article className="flex items-center justify-between py-4">
          <Logo width={150} height={150} />
          <section className="flex items-center space-x-16">
            <Link
              href={`/${role}/dashboard`}
              className={`${
                pathname === `/${role}/dashboard`
                  ? "text-[--primary-color] font-bold"
                  : "text-gray-400 hover:text-gray-500"
              } flex gap-x-1 `}
            >
              <HomeRounded />
              Inicio
            </Link>
            {role === "admin" && (
              <Link
                href={`/${role}/doctores`}
                className={`${
                  pathname === `/${role}/doctores`
                    ? "text-[--primary-color] font-bold"
                    : "text-gray-400 hover:text-gray-500"
                } flex gap-x-1`}
              >
                <FaceRounded />
                Doctores
              </Link>
            )}
            <Link
              href={`/${role}/citas`}
              className={`${
                pathname === `/${role}/citas`
                  ? "text-[--primary-color] font-bold"
                  : "text-gray-400 hover:text-gray-500"
              } flex gap-x-1`}
            >
              <DateRangeRounded />
              Citas
            </Link>
            <Link
              href={`/${role}/pacientes`}
              className={`${
                pathname === `/${role}/pacientes`
                  ? "text-[--primary-color] font-bold"
                  : "text-gray-400 hover:text-gray-500"
              } flex gap-x-1`}
            >
              <GroupsRounded />
              Pacientes
            </Link>
          </section>
          <Link
            className="flex items-center space-x-14"
            href={`/${role}/perfil`}
          >
            <div className="flex items-center space-x-2">
              <Avatar name={username} />
              <span className="font-medium"> {username} </span>
            </div>
            <button
              onClick={handleLogout}
              className="flex font-bold text-[--primary-color] hover:text-[--primary-color-dark]"
            >
              <LogoutRounded />
              Cerrar sesión
            </button>
          </Link>
        </article>
      </div>
    </nav>
  );
}
