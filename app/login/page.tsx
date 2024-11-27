"use client";

import Image from "next/image";
import Logo from "../../components/ui/Logo";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { loginService } from "../../src/services/loginService";
import { fetchProfile } from "@/services/perfilService";
import { UserModel } from "@/models/UserModel";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  // Expresión regular para validar formato del correo
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // Validación 1: Verificar si el correo está vacío
    if (!email) {
      setError("Por favor, ingresa tu correo.");
      return;
    }

    // Validación 2: Validar el formato del correo
    if (!emailRegex.test(email)) {
      setError("Por favor, ingresa un correo válido.");
      return;
    }

    // Validación 3: Verificar si la contraseña cumple con la longitud mínima
    if (password.length < 8) {
      setError("La contraseña debe tener al menos 8 caracteres.");
      return;
    }

    // Nueva lógica: Llamar al servicio de login
    try {
      const response = await loginService(email, password);

      // Guardar el token y redirigir al dashboard
      localStorage.setItem("accessToken", response.access_token);
      router.push("/doctor/dashboard");
    } catch (error: unknown) {
      // Manejo de error
      if (error instanceof Error) {
        setError(error.message || "Ocurrió un error al iniciar sesión.");
      } else {
        setError("Ocurrió un error inesperado.");
      }
    }

    try {
      const response = await fetchProfile();
      const user: UserModel = new UserModel(
        response._id,
        response.name,
        response.email,
        response.phone,
        response.role
      );
      localStorage.setItem("user_info", JSON.stringify(user));
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error("Error fetching user data:", error);
      }
    }

    /* SIMULACIÓN ANTERIOR DE LOGIN
    if (email && password) {
      // Simulación de inicio de sesión
      localStorage.setItem("isLoggedIn", "true");
      router.push("/doctor/dashboard");
    } else {
      setError("Invalid credentials");
    }
    */
  };

  return (
    <main className="h-screen">
      <article className="flex p-4 h-full space-x-8">
        <section className="relative w-1/2">
          <Image
            className="rounded-lg object-cover"
            src="/login.jpg"
            alt="Imagen de fondo"
            fill
          />
        </section>
        <section className="flex-1 flex flex-col">
          <Logo />
          <div className="px-14 flex-1 pt-40">
            <h1 className="text-3xl font-bold">¡Bienvenido/a de nuevo!</h1>
            <p className="text-gray-400 font-light pt-1">
              Ingresa tus credenciales para poder acceder al sitio.
            </p>
            <form onSubmit={handleSubmit} noValidate className="pt-4">
              <section className="space-y-8">
                <div className="space-y-1">
                  <label className="font-medium" htmlFor="email">
                    Correo electrónico
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    placeholder="ejemplo@ejemplo.com"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    className="p-2 border border-gray-200 rounded-md w-full"
                  />
                </div>

                {/* Input de contraseña */}
                <div className="space-y-1">
                  <label className="font-medium" htmlFor="password">
                    Contraseña
                  </label>
                  <input
                    type="password"
                    id="password"
                    name="password"
                    placeholder="*******"
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                    className="p-2 border border-gray-200 rounded-md w-full"
                  />
                </div>

                <button
                  type="submit"
                  className="bg-[--primary-color] text-white rounded-md p-2 w-full"
                >
                  Ingresar
                </button>
              </section>
            </form>

            {error && (
              <div className="text-red-500 mt-4">
                <p>{error}</p>
              </div>
            )}
          </div>
        </section>
      </article>
    </main>
  );
}
