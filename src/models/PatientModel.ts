export interface PatientModel {
    id: string;
    record: string;
    name: string;
    personalData: PersonalData;
    currentPhone: string;
    doctorOptions: string[]; // Ajuste a tipo específico
    scheduleOptions: string[]; // Ajuste a tipo específico
    doctor: string;
    date: string;
    pregnancyData: PregnancyData;
    medicalHistory: MedicalHistory;
  }
  
  export interface PersonalData {
    name: string;
    gender: string;
    phone: string;
    age: number;
    birthDate: string;
    email: string;
    password: string;
    curp: string;
    maritalStatus: string;
    occupation: string;
    address: Address;
    street: string;
    municipality: string;
    locality: string;
    state: string;
  }
  
  export interface Address {
    street: string;
    municipality: string;
    locality: string;
    state: string;
    [key: string]: unknown; // Flexibilidad para más campos si es necesario
  }
  
  export interface PregnancyData {
    lastMenstruation: string;
    dueDate: string;
    gestationStage: string;
    previousPregnancies: number;
    abortions: number;
    pregnancyType: string;
    complication: string;
    observations: string;
  }
  
  export interface MedicalHistory {
    medicalConditions: string;
    gynecologicalHistory: string;
    allergies: string;
    familyHistory: string;
  }
  