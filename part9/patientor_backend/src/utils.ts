import { newPatient, Gender } from './types';

// type Fields = { name: unknown, ssn: unknown, dateOfBirth: unknown, gender: unknown, occupation: unknown };
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const toNewPatient = (object: any): newPatient => {

    const isString = (text: unknown): text is string => {
        return typeof text === 'string' || text instanceof String;
    };
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


    const isDate = (date: string): boolean => {
        return Boolean(Date.parse(date));
    };  
    
    const parseDate = (dateOfBirth: unknown): string => {
        if (!dateOfBirth || !isString(dateOfBirth) || !isDate(dateOfBirth)) {
            throw new Error('Incorrect or missing date: ' + dateOfBirth);
        }
        return dateOfBirth;
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
        occupation: parseOccupation(object.occupation)
    };

    return newEntry;
};

export default toNewPatient;