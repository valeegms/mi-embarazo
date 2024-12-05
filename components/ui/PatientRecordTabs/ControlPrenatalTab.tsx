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
import { useDebounce } from "@/hooks/useDebounce";

export default function ControlPrenatalTab(props: TabPanelProps) {
  const {
    value,
    index,
    formData,
    updateData,
    isPatientLoading,
    appointments,
    setIsAppointmentDataChanged,
  } = props;

  const [date, setDate] = useState(
    formData.date ? DateTime.fromISO(formData.date) : DateTime.now()
  );
  const [error, setError] = useState("");
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

  const handleDateChange = (newValue: DateTime | null) => {
    if (newValue) {
      const matchingAppointment = appointments?.find(
        (appointment) =>
          DateTime.fromISO(appointment.date).toISODate() ===
          newValue.toISODate()
      );

      if (matchingAppointment) {
        setDate(newValue);
        updateData(matchingAppointment);
        setError("");
      } else {
        setError("No hay registros para esta fecha.");
        setTimeout(() => {
          setError("");
        }, 3000);
      }
    }
  };

  const debouncedHandleDateChange = useDebounce(handleDateChange, 300);

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
                      disabled={isFirstDate()}
                      className="text-gray-500 rounded-md border-l border-t border-b border-t-gray-300 border-b-gray-300 rounded-r-none border-l-gray-300 bg-white p-[0.45rem] hover:bg-gray-100 active:bg-gray-200 disabled:bg-gray-200"
                      onClick={handlePreviousDate}
                    >
                      <ChevronLeftRounded />
                    </button>
                    <LocalizationProvider dateAdapter={AdapterLuxon}>
                      <DateField
                        value={date}
                        onChange={(newValue) => {
                          if (newValue) debouncedHandleDateChange(newValue);
                        }}
                      />
                    </LocalizationProvider>
                    <button
                      disabled={isLastDate()}
                      className="text-gray-500 rounded-md border-r border-t border-b border-t-gray-300 border-b-gray-300 rounded-l-none border-r-gray-300 bg-white p-[0.45rem] hover:bg-gray-100 active:bg-gray-200 disabled:bg-gray-200"
                      onClick={handleNextDate}
                    >
                      <ChevronRightRounded />
                    </button>
                  </>
                )}
              </div>
              {error && (
                <p className="text-red-500 text-xs font-bold text-center">
                  {error}
                </p>
              )}
              <ControlPrenatalForm
                formData={formData}
                updateData={updateData}
                isEditable={false}
                setIsAppointmentDataChanged={setIsAppointmentDataChanged}
              />
            </>
          ) : (
            <div>
              {isPatientLoading && !formData._id ? (
                <ControlPrenatalForm
                  formData={formData}
                  updateData={updateData}
                  isEditable={false}
                  setIsAppointmentDataChanged={setIsAppointmentDataChanged}
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
