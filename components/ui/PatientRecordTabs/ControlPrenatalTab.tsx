"use client";
import Image from "next/image";

import Card from "../Card";
import ControlPrenatalForm from "../../ControlPrenatalFrom";
import { TabPanelProps } from "./DetailsTab";
import { DateField, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterLuxon } from "@mui/x-date-pickers/AdapterLuxon";
import { useState } from "react";
import { DateTime } from "luxon";
import { ChevronLeftRounded, ChevronRightRounded } from "@mui/icons-material";

//TODO: implement navigation of appointments
export default function ControlPrenatalTab(props: TabPanelProps) {
  const {
    value,
    index,
    formData,
    updateData,
    isEditing,
    isLoading,
    appointments,
  } = props;
  console.log("ControlPrenatalTab -> isLoading", isLoading);
  const [date, setDate] = useState(DateTime.now());

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
              <div className="flex items-center">
                <button
                  disabled={!isEditing}
                  className="text-gray-500 rounded-md border-l border-t border-b border-t-gray-300 border-b-gray-300 rounded-r-none border-l-gray-300 bg-white p-[0.45rem] hover:bg-gray-100 active:bg-gray-200 disabled:bg-gray-200"
                  onClick={() => setDate(date.minus({ days: 1 }))}
                >
                  <ChevronLeftRounded />
                </button>
                <LocalizationProvider dateAdapter={AdapterLuxon}>
                  <DateField
                    disabled={!isEditing}
                    value={date}
                    onChange={(newValue) => setDate(newValue)}
                  />
                </LocalizationProvider>
                <button
                  disabled={!isEditing}
                  className="text-gray-500 rounded-md border-r border-t border-b border-t-gray-300 border-b-gray-300 rounded-l-none border-r-gray-300 bg-white p-[0.45rem] hover:bg-gray-100 active:bg-gray-200 disabled:bg-gray-200"
                  onClick={() => setDate(date.plus({ days: 1 }))}
                >
                  <ChevronRightRounded />
                </button>
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
