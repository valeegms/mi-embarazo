import Input from "../Input";
import Card from "../Card";
import TextField from "../TextField";

export interface TabPanelProps {
  index: number;
  value: number;
  formData: any;
  updateData: any;
  isEditing?: boolean;
}

export default function DetailsTab(props: TabPanelProps) {
  const { formData, updateData, isEditing, value, index, ...other } = props;

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    updateData({ [name]: value });
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
        <article className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-6">
          <Card title="Información personal">
            <section className="grid grid-cols-2 gap-4">
              <Input
                name="name"
                label="Nombre"
                type="text"
                disabled={!isEditing}
                onChange={handleChange}
                value={formData.personalData.name}
              />
              <Input
                name="maritalStatus"
                label="Estado civil"
                type="text"
                disabled={!isEditing}
                onChange={handleChange}
                value={formData.personalData.maritalStatus}
              />
              <Input
                name="gender"
                label="Género"
                type="text"
                disabled={!isEditing}
                onChange={handleChange}
                value={formData.personalData.gender}
              />
              <Input
                name="occupation"
                label="Ocupación"
                type="text"
                disabled={!isEditing}
                onChange={handleChange}
                value={formData.personalData.occupation}
              />
              <Input
                name="phone"
                label="Teléfono"
                type="text"
                disabled={!isEditing}
                onChange={handleChange}
                value={formData.personalData.phone}
              />
              <Input
                name="street"
                label="Dirección"
                type="text"
                disabled={!isEditing}
                className="row-span-2"
                onChange={handleChange}
                value={formData.personalData.address.street}
              />
              <Input
                name="age"
                label="Edad"
                type="number"
                disabled={!isEditing}
                onChange={handleChange}
                value={formData.personalData.age}
              />
              <Input
                name="birthDate"
                label="Fecha de nacimiento"
                type="date"
                disabled={!isEditing}
                onChange={handleChange}
                value={formData.personalData.birthDate}
              />
              <Input
                name="municipality"
                label="Municipio"
                type="text"
                disabled={!isEditing}
                onChange={handleChange}
                value={formData.personalData.address.municipality}
              />
              <Input
                name="locality"
                label="Localidad"
                type="text"
                disabled={!isEditing}
                onChange={handleChange}
                value={formData.personalData.address.locality}
              />
              <Input
                name="state"
                label="Estado"
                type="text"
                disabled={!isEditing}
                onChange={handleChange}
                value={formData.personalData.address.state}
              />
              <Input
                name="email"
                label="Correo electrónico"
                type="email"
                disabled={!isEditing}
                onChange={handleChange}
                value={formData.personalData.email}
              />
              <Input
                name="curp"
                label="CURP"
                type="text"
                disabled={!isEditing}
                onChange={handleChange}
                value={formData.personalData.curp}
              />
            </section>
          </Card>
          <Card title="Datos del embarazo">
            <section className="grid grid-cols-2 gap-4">
              <Input
                name="lastMenstruation"
                label="Fecha de última menstruación"
                type="date"
                disabled={!isEditing}
                value={formData.pregnancyData.lastMenstruation}
                onChange={handleChange}
              />
              <Input
                name="dueDate"
                label="Fecha probable de parto"
                type="date"
                disabled={!isEditing}
                value={formData.pregnancyData.dueDate}
                onChange={handleChange}
              />
              <Input
                name="gestationStage"
                label="Edad gestacional (semana)"
                type="number"
                disabled={!isEditing}
                value={formData.pregnancyData.gestationStage}
                onChange={handleChange}
              />
              <Input
                name="previousPregnancies"
                label="Número de embarazo"
                type="number"
                disabled={!isEditing}
                value={formData.pregnancyData.previousPregnancies + 1}
                onChange={handleChange}
              />
              <Input
                name="abortions"
                label="Número de abortos"
                type="number"
                disabled={!isEditing}
                value={formData.pregnancyData.abortions}
                onChange={handleChange}
              />
              <Input
                name="pregnancyType"
                label="Tipo de embarazo"
                type="text"
                disabled={!isEditing}
                value={formData.pregnancyData.pregnancyType}
                onChange={handleChange}
              />
              <TextField
                name="complications"
                label="Complicaciones"
                className="col-span-2"
                disabled={!isEditing}
                value={formData.pregnancyData.complications}
                onChange={handleChange}
              />
              <TextField
                name="observations"
                label="Observaciones"
                className="col-span-2"
                disabled={!isEditing}
                value={formData.pregnancyData.observations}
                onChange={handleChange}
              />
            </section>
          </Card>
        </article>
      )}
    </div>
  );
}
