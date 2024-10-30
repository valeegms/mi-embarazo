import Card from "../Card";
import { TabPanelProps } from "./DetailsTab";
import TextField from "../TextField";

export default function MedicalHistoryTab(props: TabPanelProps) {
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
          <section className="gap-4">
            <TextField
              name="medicalConditions"
              label="Condiciones médicas"
              disabled={!isEditing}
              value={formData.medicalConditions}
              onChange={handleChange}
            />
            <TextField
              name="gynecologicalHistory"
              label="Historia ginecológica"
              disabled={!isEditing}
              value={formData.gynecologicalHistory}
              onChange={handleChange}
            />
            <TextField
              name="allergies"
              label="Alergias"
              disabled={!isEditing}
              value={formData.allergies}
              onChange={handleChange}
            />
            <TextField
              name="familyHistory"
              label="Historial Familiar"
              disabled={!isEditing}
              value={formData.familyHistory}
              onChange={handleChange}
            />
          </section>
        </Card>
      )}
    </div>
  );
}
