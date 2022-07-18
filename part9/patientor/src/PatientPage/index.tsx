import React from "react";
import axios from "axios";
import { Box,Typography,Button } from "@material-ui/core";
import AddPatientModal from "../AddPatientModal";
import { useParams } from "react-router-dom";
import { apiBaseUrl } from "../constants";
import { useStateValue } from "../state";
import { Patient } from "../types";
import FemaleIcon from '@mui/icons-material/Female';
import MaleIcon from '@mui/icons-material/Male';
import {getSecretPatient,sendNewEntry} from '../state/reducer';
import Entries from './Entries';
import {Entry} from '../types';
import { EntryFormValues } from "../AddPatientModal/AddEntryForm";

type UnionOmit<T, K extends string | number | symbol> = T extends unknown ? Omit<T, K> : never;
type valuesSent = UnionOmit<Entry, "id">;

const PatientPage = () => {
    const [{patientsSecret},dispatch] = useStateValue();
    const [modalOpen, setModalOpen] = React.useState<boolean>(false);
    const [error, setError] = React.useState<string>();

    const { id } = useParams<{ id: string }>();

    const openModal = (): void => setModalOpen(true);

    const closeModal = (): void => {
      setModalOpen(false);
      setError(undefined);
    };

    const submitNewEntry = async (values:EntryFormValues) => {
        const convertToSubtype = (values:EntryFormValues):valuesSent=>{

          switch (values.type){
            case 'HealthCheck':
              return  {
                description: values.description,
                date:values.date,
                specialist: values.specialist,
                diagnosisCodes: values.diagnosisCodes,
                type: values.type,
                healthCheckRating : values.healthCheckRating
              };
              // return (result);
            case 'Hospital':
              return {
                description: values.description,
                date:values.date,
                specialist: values.specialist,
                diagnosisCodes: values.diagnosisCodes,
                type: values.type,
                discharge : values.discharge
              };
              // return (result);
            case 'OccupationalHealthcare':
              return {
                description: values.description,
                date:values.date,
                specialist: values.specialist,
                diagnosisCodes: values.diagnosisCodes,
                type: values.type,
                employerName : values.employerName,
                sickLeave : values.sickLeave
              };
              // return (result);
            default:
              throw new Error(
                `Mishandled input : ${JSON.stringify(values.type)}`
              );         
          }
        };
        try {
          if (id){
            const { data: newEntry } = await axios.post<Entry>(
              `${apiBaseUrl}/patients/${id}`,
              convertToSubtype(values)
            );
            dispatch(sendNewEntry({content: newEntry, id}));
          }
          closeModal();
        } catch (e: unknown) {
          if (axios.isAxiosError(e)) {
            console.error(e?.response?.data || "Unrecognized axios error");
            setError(String(e?.response?.data) || "Unrecognized axios error");
          } else {
            console.error("Unknown error", e);
            setError("Unknown error");
          }
        }
      };

    React.useEffect(() => {
        if ((id && patientsSecret[id])||!id){
            return;
        }  

      const fetchPatientSecret = async () => {
        try {
          const { data: patientSecret } = await axios.get<Patient>(
            `${apiBaseUrl}/patients/${id}`
          );
            dispatch(getSecretPatient(patientSecret));
            // console.log(patientSecret);
        } catch (e) {
          console.error(e);
        }
      };
      void fetchPatientSecret();
    }, [dispatch]);
    if (id && !patientsSecret[id]){
        return (
                <Typography align="center" variant="h6">
                    No such patient exists.
                </Typography>
        );
    }
    else if (id && patientsSecret[id]){
    return (
        <div className="App">
            <Box mt={4}>
                <Typography align="left" variant="h4">
                    {patientsSecret[id].name}                
                    {patientsSecret[id].gender==="female" && <FemaleIcon fontSize="inherit" />}
                    {patientsSecret[id].gender==="male" && <MaleIcon fontSize="inherit" />}
                </Typography>
                <Typography align="left" variant="body1">
                    ssn: {patientsSecret[id].ssn}
                </Typography>
                <Typography align="left" variant="body1">
                    occupation: {patientsSecret[id].occupation}
                </Typography>
                <Entries entries={patientsSecret[id].entries}/>                
            </Box>
            <AddPatientModal
                message="Add a new entry"
                modalOpen={modalOpen}
                onSubmit={submitNewEntry}
                error={error}
                onClose={closeModal}
            />
            <Box mt={4}>
                <Button variant="contained" color="primary" onClick={() => openModal()}>
                    Add New Entry
                </Button>
            </Box>
        </div>
    );
    }
    return <div>Error</div>;
};

export default PatientPage;
