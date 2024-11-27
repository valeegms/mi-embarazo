"use client";

import { useState, useEffect } from "react";
import CitasPage from "../../../components/CitasPage";
import Card from "../../../components/ui/Card";
import { fetchDashboardCounts } from "@/services/adminDashboardService";
import {
  CalendarTodayRounded,
  FaceRounded,
  GroupRounded,
} from "@mui/icons-material";

export default function DashboardPage() {
  const [counts, setCounts] = useState({
    doctors: 0,
    patients: 0,
    appointments: 0,
  });

  useEffect(() => {
    const loadCounts = async () => {
      try {
        const data = await fetchDashboardCounts();
        setCounts(data);
      } catch (error) {
        console.error("Error fetching dashboard counts:", error);
      }
    };

    loadCounts();
  }, []);

  return (
    <main>
      <h1 className="text-3xl font-bold">Bienvenido/a,</h1>
      <p className="text-gray-400 font-light pt-1">
        Revisa la información general sobre el paciente y las próximas citas.
      </p>
      <section className="flex gap-4 my-6">
        <Card className="flex-1 py-10">
          <div className="flex justify-between items-center">
            <div>
              <small className="font-semibold">Doctores</small>
              <h2 className="text-5xl font-bold text-black">{counts.doctors}</h2>
            </div>
            <FaceRounded className="text-[--primary-color] text-6xl" />
          </div>
        </Card>
        <Card className="flex-1 py-10">
          <div className="flex justify-between items-center">
            <div>
              <small className="font-semibold">Pacientes</small>
              <h2 className="text-5xl font-bold text-black">{counts.patients}</h2>
            </div>
            <GroupRounded className="text-[--primary-color] text-6xl" />
          </div>
        </Card>
        <Card className="flex-1 py-10">
          <div className="flex justify-between items-center">
            <div>
              <small className="font-semibold">Citas</small>
              <h2 className="text-5xl font-bold text-black">
                {counts.appointments}
              </h2>
            </div>
            <CalendarTodayRounded className="text-[--primary-color] text-6xl" />
          </div>
        </Card>
      </section>
      {/* Reutilizamos CitasPage */}
      <CitasPage role="admin" />
    </main>
  );
}
