import React from "react";
import axios from "axios";
import { Box,Typography } from "@material-ui/core";
import { useParams } from "react-router-dom";
import { apiBaseUrl } from "../constants";
import { useStateValue } from "../state";
import { Patient } from "../types";
import FemaleIcon from '@mui/icons-material/Female';
import MaleIcon from '@mui/icons-material/Male';
import {getSecretPatient} from '../state/reducer';
import Entries from './Entries';

const PatientPage = () => {
    const [{patientsSecret},dispatch] = useStateValue();
    const { id } = useParams<{ id: string }>();
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
        </div>
    );
    }
    return <div>Error</div>;
};

export default PatientPage;
