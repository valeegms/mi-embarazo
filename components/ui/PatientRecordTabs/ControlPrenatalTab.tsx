"use client";
import Image from "next/image";

import Card from "../Card";
import ControlPrenatalForm from "../../ControlPrenatalFrom";
import { TabPanelProps } from "./DetailsTab";
import { DateField, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterLuxon } from "@mui/x-date-pickers/AdapterLuxon";
import { useEffect, useState } from "react";
import { DateTime } from "luxon";
import { ChevronLeftRounded, ChevronRightRounded } from "@mui/icons-material";

export default function ControlPrenatalTab(props: TabPanelProps) {
  const {
    value,
    index,
    formData,
    updateData,
    isEditing,
    isLoading,
    appointments,
    setIsAppointmentDataChanged,
  } = props;

  const [date, setDate] = useState(
    formData.date ? DateTime.fromISO(formData.date) : DateTime.now()
  );

  useEffect(() => {
    if (appointments) {
      const currentAppointment = appointments.find(
        (appointment) => appointment.date === formData.date
      );
      if (currentAppointment) {
        setDate(DateTime.fromISO(currentAppointment.date));
      }
    }
  }, [formData.date, appointments]);

  const handleNextDate = () => {
    const currentIndex = appointments!.findIndex(
      (appointment) =>
        DateTime.fromISO(appointment.date).toFormat("yyyy-MM-dd") ===
        date.toISODate()
    );
    if (currentIndex >= 0 && currentIndex < appointments!.length - 1) {
      const nextDate = DateTime.fromISO(appointments![currentIndex + 1].date);
      setDate(nextDate);
      updateData(appointments![currentIndex + 1]);
      setIsAppointmentDataChanged(true);
    }
  };

  const handlePreviousDate = () => {
    const currentIndex = appointments!.findIndex(
      (appointment) =>
        DateTime.fromISO(appointment.date).toFormat("yyyy-MM-dd") ===
        date.toISODate()
    );
    if (currentIndex > 0) {
      const prevDate = DateTime.fromISO(appointments![currentIndex - 1].date);
      setDate(prevDate);
      updateData(appointments![currentIndex - 1]);
      setIsAppointmentDataChanged(true);
    }
  };

  const isFirstDate = () => {
    return (
      appointments!.length > 0 &&
      DateTime.fromISO(appointments![0].date).toFormat("yyyy-MM-dd") ===
        date.toISODate()
    );
  };

  const isLastDate = () => {
    return (
      appointments!.length > 0 &&
      DateTime.fromISO(appointments![appointments!.length - 1].date).toFormat(
        "yyyy-MM-dd"
      ) === date.toISODate()
    );
  };

  return (
    <div
      className="flex-1"
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
    >
      {value === index && (
        <Card>
          {formData._id ? (
            <>
              <div className="flex items-center justify-center">
                {appointments && (
                  <>
                    <button
                      disabled={!isEditing || isFirstDate()}
                      className="text-gray-500 rounded-md border-l border-t border-b border-t-gray-300 border-b-gray-300 rounded-r-none border-l-gray-300 bg-white p-[0.45rem] hover:bg-gray-100 active:bg-gray-200 disabled:bg-gray-200"
                      onClick={handlePreviousDate}
                    >
                      <ChevronLeftRounded />
                    </button>
                    <LocalizationProvider dateAdapter={AdapterLuxon}>
                      <DateField
                        disabled={!isEditing}
                        value={date}
                        onChange={(newValue) => {
                          if (newValue) setDate(newValue);
                        }}
                      />
                    </LocalizationProvider>
                    <button
                      disabled={!isEditing || isLastDate()}
                      className="text-gray-500 rounded-md border-r border-t border-b border-t-gray-300 border-b-gray-300 rounded-l-none border-r-gray-300 bg-white p-[0.45rem] hover:bg-gray-100 active:bg-gray-200 disabled:bg-gray-200"
                      onClick={handleNextDate}
                    >
                      <ChevronRightRounded />
                    </button>
                  </>
                )}
              </div>
              <ControlPrenatalForm
                formData={formData}
                updateData={updateData}
                isEditing={isEditing!}
              />
            </>
          ) : (
            <div>
              {isLoading && !formData._id ? (
                <ControlPrenatalForm
                  formData={formData}
                  updateData={updateData}
                  isEditing={isEditing!}
                />
              ) : (
                <div className="text-center text-gray-500 mt-4 place-self-center">
                  <Image
                    src="/controlPrenatal-placeholder.svg"
                    alt="No hay datos"
                    width={350}
                    height={350}
                  />
                  <p className="text-center text-gray-500 mt-4">
                    No hay datos de control prenatal.
                  </p>
                </div>
              )}
            </div>
          )}
        </Card>
      )}
    </div>
  );
}
