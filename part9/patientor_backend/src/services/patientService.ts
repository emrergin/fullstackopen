import patientData from '../../data/patients';
import { v1 as uuid } from 'uuid';

import {Patient, patientWithoutSSN, newPatient,Entry,newEntry} from '../types';


// const getEntries = (): Array<Patient> => {
//   return patientData;
// };

const getEntriesWithoutSSN =
  ():Array<patientWithoutSSN> =>
  {
    return patientData.map(({id,name,dateOfBirth,gender,occupation})=>({
      id,
      name,
      dateOfBirth,
      gender,
      occupation,
      entries:[]
    }));
  };

const getSinglePatient = (id:string):Patient|undefined=>{
  const result:Patient|undefined = patientData.find(patient => patient.id === id);
  return result;
}; 

const addPatient = (entry:newPatient): Patient=>{
  const newPatient = {
    id: uuid(),
    ...entry
  };
  patientData.push(newPatient);
  return newPatient;
};

const addMedicalRecord = (entry:newEntry,id:string): Entry=>{
  const newEntry = {
    id: uuid(),
    ...entry
  };
  const patientToBeUpdated: Patient|undefined = patientData.find(patient=>patient.id===id);
  if(patientToBeUpdated){patientToBeUpdated.entries.push(newEntry);}
  return newEntry;
};

export default {
  getEntriesWithoutSSN,
  addPatient,
  getSinglePatient,
  addMedicalRecord
};