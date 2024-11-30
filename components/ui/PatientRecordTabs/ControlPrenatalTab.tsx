"use client";

import Card from "../Card";
import ControlPrenatalForm from "../../ControlPrenatalFrom";
import { TabPanelProps } from "./DetailsTab";

export default function ControlPrenatalTab(props: TabPanelProps) {
  const { value, index, formData, updateData, isEditing } = props;

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
          <ControlPrenatalForm
            formData={formData}
            updateData={updateData}
            isEditing={isEditing!}
          />
        </Card>
      )}
    </div>
  );
}
