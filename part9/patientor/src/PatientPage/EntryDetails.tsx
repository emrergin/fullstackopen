import {Entry} from '../types';


import HospitalEntryComponent from './HospitalEntry';
import OccupationalHealthcareEntryComponent from './OccupationalHealthcareEntry';
import HealthCheckEntryComponent from './HealthCheckEntry';

const assertNever = (value: never): never => {
    throw new Error(
      `Unhandled discriminated union member: ${JSON.stringify(value)}`
    );
  };
  
const EntryDetails = ({entry}:{entry:Entry})=>
{
    switch(entry.type){
        case "Hospital":
            return <HospitalEntryComponent entry={entry}/>;
        case "OccupationalHealthcare":
            return <OccupationalHealthcareEntryComponent entry={entry}/>;
        case "HealthCheck":
            return <HealthCheckEntryComponent entry={entry}/>;
        default:
            return assertNever(entry);  
    }

};

export default EntryDetails;