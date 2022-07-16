"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const types_1 = require("./types");
// type Fields = { name: unknown, ssn: unknown, dateOfBirth: unknown, gender: unknown, occupation: unknown };
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const toNewPatient = (object) => {
    const isString = (text) => {
        return typeof text === 'string' || text instanceof String;
    };
    const parseName = (name) => {
        if (!name || !isString(name)) {
            throw new Error('Incorrect or missing name');
        }
        return name;
    };
    const parseSsn = (ssn) => {
        if (!ssn || !isString(ssn)) {
            throw new Error('Incorrect or missing SSN');
        }
        return ssn;
    };
    const parseOccupation = (occupation) => {
        if (!occupation || !isString(occupation)) {
            throw new Error('Incorrect or missing occupation');
        }
        return occupation;
    };
    const isDate = (date) => {
        return Boolean(Date.parse(date));
    };
    const parseDate = (dateOfBirth) => {
        if (!dateOfBirth || !isString(dateOfBirth) || !isDate(dateOfBirth)) {
            throw new Error('Incorrect or missing date: ' + dateOfBirth);
        }
        return dateOfBirth;
    };
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const isGender = (param) => {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
        return Object.values(types_1.Gender).includes(param);
    };
    const parseGender = (gender) => {
        if (!gender || !isGender(gender)) {
            throw new Error('Incorrect or missing gender: ' + gender);
        }
        return gender;
    };
    const newEntry = {
        name: parseName(object.name),
        dateOfBirth: parseDate(object.dateOfBirth),
        ssn: parseSsn(object.ssn),
        gender: parseGender(object.gender),
        occupation: parseOccupation(object.occupation)
    };
    return newEntry;
};
exports.default = toNewPatient;
