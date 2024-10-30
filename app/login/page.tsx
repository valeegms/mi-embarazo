"use client";

import Image from "next/image";
import Logo from "../../components/ui/Logo";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // Mock login check (for now, you can just assume it's successful)
    if (email && password) {
      // Set a flag in localStorage to simulate a "logged-in" user
      localStorage.setItem("isLoggedIn", "true");

      // Redirect to the dashboard
      router.push("/doctor/dashboard");
    } else {
      setError("Invalid credentials");
    }
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
              Ingresa a tus credenciales para poder acceder al sitio.
            </p>
            <form onSubmit={handleSubmit} className="pt-4">
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
                  onClick={() => router.push("/forgot-password")}
                  className="text-[--primary-color] text-sm font-medium block place-self-end underline hover:text-[--primary-color-dark]"
                  style={{ marginTop: "1rem" }}
                >
                  ¿Olvidaste tu contraseña?
                </button>

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
