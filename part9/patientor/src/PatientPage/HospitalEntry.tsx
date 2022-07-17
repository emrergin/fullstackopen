import {HospitalEntry} from '../types';
import BaseEntry from './BaseEntry';
import { Typography} from "@material-ui/core";

const HospitalEntryComponent= ({entry}:{entry:HospitalEntry})=>{
    return (
        <BaseEntry entry={entry}> 
            {entry.discharge && <Typography> Released: {entry.discharge.date} - {entry.discharge.criteria} </Typography>}
        </BaseEntry>
            );
};

export default HospitalEntryComponent;