import Card from "../Card";
import Input from "../Input";
import TextField from "../TextField";
import { TabPanelProps } from "./DetailsTab";

export default function ControlPrenatalTab(props: TabPanelProps) {
  const { formData, updateData, isEditing, value, index, ...other } = props;

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    updateData((prevData) => ({ ...prevData, [name]: value }));
  };

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Card title="Antecedentes médicos">
          <Input
            name="weight"
            label="Peso"
            type="text"
            disabled={!isEditing}
            value={formData.weight}
            onChange={handleChange}
          />
          <Input
            name="bloodPressure"
            label="Presión arterial"
            type="text"
            disabled={!isEditing}
            value={formData.bloodPressure}
            onChange={handleChange}
          />
          <Input
            name="fetalHeartRate"
            label="Frecuencia cardiaca fetal"
            type="text"
            disabled={!isEditing}
            value={formData.fetalHeartRate}
            onChange={handleChange}
          />
          <Input
            name="fetalStatus"
            label="Estado fetal"
            type="text"
            disabled={!isEditing}
            value={formData.fetalStatus}
            onChange={handleChange}
          />
          <TextField
            name="observations"
            label="Observaciones"
            disabled={!isEditing}
            value={formData.observations}
            onChange={handleChange}
          />
          <TextField
            name="prescription"
            label="Prescripción"
            disabled={!isEditing}
            value={formData.prescription}
            onChange={handleChange}
          />
        </Card>
      )}
    </div>
  );
}
