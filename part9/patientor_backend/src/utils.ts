import { newPatient, Gender, newEntry ,singleDateAndCriteria,dateInterval,HealthCheckRating} from './types';

const isString = (text: unknown): text is string => {
    return typeof text === 'string' || text instanceof String;
};

const isDate = (date: string): boolean => {
    return Boolean(Date.parse(date));
};  

const isStringArray = (list: unknown): list is string[] =>{
    if (!Array.isArray(list)){return false;}
    let bool = true;
    list.forEach(arrayMember =>
        {
            if (!isString(arrayMember)){
                bool=false;
            }
        });
    return bool;
};

const parseDate = (dateOfBirth: unknown): string => {
    if (!dateOfBirth || !isString(dateOfBirth) || !isDate(dateOfBirth)) {
        throw new Error('Incorrect or missing date: ' + dateOfBirth);
    }
    return dateOfBirth;
};

// type Fields = { name: unknown, ssn: unknown, dateOfBirth: unknown, gender: unknown, occupation: unknown };
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const toNewPatient = (object: any): newPatient => {

    const parseName = (name: unknown): string => {
    if (!name || !isString(name)) {
        throw new Error('Incorrect or missing name');
    }  
    return name;
    };

    const parseSsn = (ssn: unknown): string => {
        if (!ssn || !isString(ssn)) {
            throw new Error('Incorrect or missing SSN');
        }  
        return ssn;
    };

    const parseOccupation = (occupation: unknown): string => {
        if (!occupation || !isString(occupation)) {
            throw new Error('Incorrect or missing occupation');
        }  
        return occupation;
    };

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const isGender = (param: any): param is Gender => {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
        return Object.values(Gender).includes(param);
    };

    const parseGender = (gender: unknown): Gender => {
        if (!gender || !isGender(gender)) {
            throw new Error('Incorrect or missing gender: ' + gender);
        }
        return gender;
    };

    const newEntry: newPatient = {
        name : parseName(object.name),
        dateOfBirth : parseDate(object.dateOfBirth),
        ssn: parseSsn(object.ssn),
        gender: parseGender(object.gender),
        occupation: parseOccupation(object.occupation),
        entries: []
    };

    return newEntry;
};

export default toNewPatient;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const toNewEntry=(object:any):newEntry=>{
    const parseDescription = (description: unknown): string => {
        if (!description || !isString(description)) {
            throw new Error('Misformatted or missing description.');
        }  
        return description;
        };
    const parseSpecialist = (specialist: unknown): string => {
        if (!specialist || !isString(specialist)) {
            throw new Error('Misformatted or missing specialist.');
        }  
        return specialist;
        };
    

    const diagnosisParser = (stringArray: unknown): string[]|undefined =>{
        if (stringArray===undefined){
            return undefined;
        }
        if (!isStringArray(stringArray)){
            throw new Error('Misformatted diagnoses.');
        }            
        return stringArray;        
    };
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const dischargeParser = (discharge: any): singleDateAndCriteria => {
        if (!discharge || !discharge.criteria || !isString(discharge.criteria)) {
            throw new Error('Misformatted or missing discharge.');
        }  
        discharge.date = parseDate(discharge.date);
        return discharge as singleDateAndCriteria;
        };

    const parseEmployer = (employer: unknown): string|undefined => {
        if(employer===undefined){return undefined;}        
        if (!isString(employer)) {
            throw new Error('Misformatted employer.');
        }  
        return employer;
        };
// eslint-disable-next-line @typescript-eslint/no-explicit-any
    const parseLeave = (leave: any): dateInterval|undefined => {
        if (leave===undefined){return undefined;}
        if (!isString(leave.startDate)||
            !isString(leave.endDate)){
                throw new Error('Misformatted leave days.');
            }       
        else if(     
            !isDate(leave.startDate as string)||            
            !isDate(leave.endDate as string)) {
                throw new Error('Misformatted leave days.');
        }  
        return leave as dateInterval;
        };



    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const isHRating = (param: any): param is HealthCheckRating => {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
        return Object.values(HealthCheckRating).includes(Number(param));
    };

    const healthParser = (rate: unknown): HealthCheckRating => {
        if (rate===undefined || !isHRating(rate)) {
            throw new Error('Incorrect or missing rate: ' + rate);
        }
        return rate;
    };


    
    switch(object.type){
        case "Hospital":
            const newHospitalEntry: newEntry = {
                description : parseDescription(object.description),
                date : parseDate(object.date),
                specialist: parseSpecialist(object.specialist),
                diagnosisCodes: diagnosisParser(object.diagnosisCodes),
                type: "Hospital" ,
                discharge: dischargeParser(object.discharge)
            };
            return newHospitalEntry;
        case "OccupationalHealthcare":
            const newOccupationEntry: newEntry = {
                description : parseDescription(object.description),
                date : parseDate(object.date),
                specialist: parseSpecialist(object.specialist),
                diagnosisCodes: diagnosisParser(object.diagnosisCodes),
                type: "OccupationalHealthcare" ,
                employerName: parseEmployer(object.employerName),
                sickLeave: parseLeave(object.sickLeave)
            };
            return newOccupationEntry;
        case "HealthCheck":
            const newCheckEntry: newEntry = {
                description : parseDescription(object.description),
                date : parseDate(object.date),
                specialist: parseSpecialist(object.specialist),
                diagnosisCodes: diagnosisParser(object.diagnosisCodes),
                type: "HealthCheck" ,
                healthCheckRating: healthParser(object.healthCheckRating)
            };
            return newCheckEntry;
        default:
            throw new Error('No type is given.');
    }    
};

