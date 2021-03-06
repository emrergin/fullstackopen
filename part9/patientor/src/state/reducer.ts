import { State } from "./state";
import { Patient, Diagnosis,Entry } from "../types";

interface EntryWithPatientId{
  content: Entry;
  id: string;
}

export type Action =
  | {
      type: "SET_PATIENT_LIST";
      payload: Patient[];
    }
  | {
      type: "ADD_PATIENT";
      payload: Patient;
    }
  | {
    type:"ADD_PATIENT_SECRET";
    payload: Patient;
    }
  | {
    type:"SET_DIAGNOSIS_LIST";
    payload: Diagnosis[];
    }
  |{
    type: "ADD_ENTRY";
    payload: EntryWithPatientId
  };

export const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "SET_PATIENT_LIST":
      return {
        ...state,
        patients: {
          ...action.payload.reduce(
            (memo, patient) => ({ ...memo, [patient.id]: patient }),
            {}
          ),
          ...state.patients
        }
      };
    case "ADD_PATIENT":
      return {
        ...state,
        patients: {
          ...state.patients,
          [action.payload.id]: action.payload
        }
      };
    case "ADD_PATIENT_SECRET":
      return {
        ...state,
        patientsSecret: {
          ...state.patientsSecret,
          [action.payload.id]: action.payload
        }
      };
      case "SET_DIAGNOSIS_LIST":
        return {
          ...state,
          diagnoses: action.payload
        };
    case "ADD_ENTRY":
      const updatedPatient=state.patientsSecret[action.payload.id];
      updatedPatient.entries.push(action.payload.content);
      return {
        ...state,
        patientsSecret: {
          ...state.patientsSecret,
          [action.payload.id]: updatedPatient
        }
      };      
    default:
      return state;
  }
};

export const setPatientList = (list:Patient[]):Action =>{
  return{
    type:  "SET_PATIENT_LIST",
    payload: list
  };
};

export const sendNewPatient = (newPatient:Patient):Action =>{
  return{
    type:  "ADD_PATIENT",
    payload: newPatient
  };
};

export const getSecretPatient = (newPatient:Patient):Action =>{
  return{
    type:  "ADD_PATIENT_SECRET",
    payload: newPatient
  };
};

export const setDiagnosesList = (list: Diagnosis[]):Action =>{
  return{
    type:  "SET_DIAGNOSIS_LIST",
    payload: list
  };
};

export const sendNewEntry = (list: EntryWithPatientId):Action =>{
  return{
    type:  "ADD_ENTRY",
    payload: list
  };
};