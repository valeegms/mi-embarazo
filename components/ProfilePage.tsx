"use client";

import React, { useState } from "react";
import Avatar from "./ui/Avatar";
import { username } from "../app/doctor/layout";
import Input from "./ui/Input";

export default function ProfilePage({ role }: { role: string }) {
  const [isEditing, setIsEditing] = useState(false); // Toggle between view and edit modes

  // Dummy user data (replace this with real data later)
  const [userData, setUserData] = useState({
    userName: username,
    userEmail: "johndoe@example.com",
    userRole: "doctor",
    userPhone: "123-456-7890",
    userPassword: "password",
  });

  // Handle input changes in edit mode
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData((prevData) => ({ ...prevData, [name]: value }));
  };

  // Simulate saving changes (console.log for now)
  const saveChanges = () => {
    console.log("Saved user data:", userData);
    setIsEditing(false); // Exit edit mode
    alert("Changes saved successfully!"); // Feedback
  };

  return (
    <main className="min-h-screen flex flex-col items-center p-6">
      {/* Header Section */}
      <header className="w-full max-w-4xl bg-white shadow-md rounded-lg p-6 mb-6 flex items-center gap-4">
        <Avatar
          className="w-24 h-24 text-4xl"
          name={userData.userName || "U"}
        />
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Mi perfil</h1>
          <p className="text-gray-500 mt-2">
            Administra tu información personal y datos de la cuenta.
          </p>
        </div>
      </header>

      <section className="w-full max-w-4xl bg-white shadow-md rounded-lg p-6 flex flex-col md:flex-row gap-6">
        <div className="flex-grow">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            Detalles de la cuenta
          </h2>
          <div className="space-y-4">
            <div className="flex justify-between gap-4 items-center">
              <Input
                label="Nombre"
                name="userName"
                type="text"
                className="flex-1"
                value={userData.userName}
                onChange={handleInputChange}
                disabled={!isEditing}
              />
              {role == "admin" && (
                <div className="flex-1 py-2">
                  <label
                    className="text-[#8b8b8b] text-sm font-bold"
                    htmlFor="userRole"
                  >
                    Rol
                  </label>
                  {isEditing ? (
                    <select
                      name="userRole"
                      value={userData.userRole}
                      onChange={handleInputChange}
                      className="p-2 border border-gray-200 rounded-md w-full"
                    >
                      <option value="admin">Admin</option>
                      <option value="doctor">Doctor</option>
                    </select>
                  ) : (
                    <p className="text-gray-800 p-2 w-2/3 capitalize">
                      {userData.userRole}
                    </p>
                  )}
                </div>
              )}
            </div>

            <div className="flex justify-between gap-4">
              <Input
                label="Correo"
                name="userEmail"
                type="email"
                className="w-full"
                value={userData.userEmail}
                onChange={handleInputChange}
                disabled={!isEditing}
              />
              <Input
                label="Teléfono"
                name="userRole"
                type="text"
                className="w-full"
                value={userData.userPhone}
                onChange={handleInputChange}
                disabled={!isEditing}
              />
            </div>
            <Input
              label="Contraseña actual"
              name="userPassword"
              type="password"
              value={userData.userPassword}
              onChange={handleInputChange}
              disabled={!isEditing}
            />
            <div className="flex justify-between gap-4">
              <Input
                label="Nueva contraseña"
                name="newPassword"
                type="password"
                className="flex-1"
                onChange={handleInputChange}
                disabled={!isEditing}
              />
              <Input
                label="Confirmar contraseña"
                name="confirmPassword"
                type="password"
                className="flex-1"
                onChange={handleInputChange}
                disabled={!isEditing}
              />
            </div>
          </div>
        </div>
      </section>

      <footer className="pt-6 w-full max-w-4xl flex gap-4">
        {isEditing ? (
          <>
            <button
              onClick={saveChanges}
              className="flex-1 bg-[--primary-color] text-white rounded-md p-2 w-full transition"
            >
              Save Changes
            </button>
            <button
              onClick={() => setIsEditing(false)}
              className="flex-1 bg-red-100 text-red-700 rounded-md p-2 w-full hover:bg-red-200 transition"
            >
              Cancel
            </button>
          </>
        ) : (
          <button
            onClick={() => setIsEditing(true)}
            className="flex-1 bg-[--primary-color] text-white rounded-md p-2 w-full transition"
          >
            Edit Profile
          </button>
        )}
      </footer>
    </main>
  );
}
