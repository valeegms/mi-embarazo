export class DoctorModel {
    id: string;
    name: string;
    speciality: string;
    email: string;
    phone: string;
    gender: string;
    office: string;
    license: string;
    password?: string;

    constructor(id: string, name: string, speciality: string, email: string, phone: string, gender: string, office: string, license: string, password?: string) {
        this.id = id;
        this.name = name;
        this.speciality = speciality;
        this.email = email;
        this.phone = phone;
        this.gender = gender;
        this.office = office;
        this.license = license;
        this.password = password;
    }

}