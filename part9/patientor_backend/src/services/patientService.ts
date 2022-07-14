import patientData from '../../data/patients.json';
import { v1 as uuid } from 'uuid';

import {Patient, patientWithoutSSN, newPatient} from '../types';


const getEntries = (): Array<Patient> => {
  return patientData;
};

const getEntriesWithoutSSN =
  ():Array<patientWithoutSSN> =>
  {
    return patientData.map(({id,name,dateOfBirth,gender,occupation})=>({
      id,
      name,
      dateOfBirth,
      gender,
      occupation
    }));
  };

const addPatient = (entry:newPatient): Patient=>{
  const newPatient = {
    id: uuid(),
    ...entry
  };
  patientData.push(newPatient);
  return newPatient;
};

export default {
  getEntries,
  getEntriesWithoutSSN,
  addPatient
};