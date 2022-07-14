export interface Diagnose {
    code: string;
    name: string;
    latin?: string;
  }

export interface Patient {
    id: string;
    name: string;
    dateOfBirth: string;
    ssn: string;
    gender: string;
    occupation: string;
  }

export enum Gender {
  Male = 'male',
  Female = 'female',
  Other = 'other'
}

export type patientWithoutSSN = Omit<Patient, 'ssn'>;

export type newPatient = Omit<Patient, 'id'>;