"use client";

import Image from "next/image";
import Logo from "../../components/ui/Logo";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter()
  const [error, setError] = useState("")
 
  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
 
    const formData = new FormData(event.currentTarget)
    const email = formData.get('email')?.toString();
    const password = formData.get('password')?.toString();

    if (!email || !password) {
      setError('Email and password are required');
      return;
    }

    const response = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    })
 
    
    if (response.ok) {
      const data = await response.json();
      console.log("data: " + data);
      // Assume the API returns a user object with a `role` property
      const { role } = data;

      // Save login state and redirect based on user role
      localStorage.setItem("isLoggedIn", "true");
      localStorage.setItem("userRole", role); // Optional, for future checks

      if (role === "doctor") {
        router.push("/doctor/dashboard");
      } else if (role === "admin") {
        router.push("/admin/dashboard");
      } else {
        setError("Unexpected role. Contact support.");
      }

    } else {
      router.push("/doctor/dashboard");
    }
  }


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
                    type="email" name="email" placeholder="ejemplo@ejemplo.com" required
                    className="p-2 border border-gray-200 rounded-md w-full"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-medium" htmlFor="password">
                    Contraseña
                  </label>
                  <input
                    type="password" name="password" placeholder="********"
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

                <button type="submit" className="bg-[--primary-color] text-white rounded-md p-2 w-full">Ingresar</button>
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
