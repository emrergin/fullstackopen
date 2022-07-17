import {OccupationalHealthcareEntry} from '../types';
import BaseEntry from './BaseEntry';
import { Typography} from "@material-ui/core";

const OccupationalHealthcareEntryComponent= ({entry}:{entry:OccupationalHealthcareEntry})=>{
    return (
        <BaseEntry entry={entry}> 
            {entry.employerName && <Typography>Employer: {entry.employerName}</Typography>}
            {entry.sickLeave && <Typography>Leave Days: {entry.sickLeave.startDate} - {entry.sickLeave?.endDate} </Typography>}
        </BaseEntry>
            
            );
};

export default OccupationalHealthcareEntryComponent;