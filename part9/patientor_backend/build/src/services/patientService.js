"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const patients_json_1 = __importDefault(require("../../data/patients.json"));
const uuid_1 = require("uuid");
const getEntries = () => {
    return patients_json_1.default;
};
const getEntriesWithoutSSN = () => {
    return patients_json_1.default.map(({ id, name, dateOfBirth, gender, occupation }) => ({
        id,
        name,
        dateOfBirth,
        gender,
        occupation
    }));
};
const addPatient = (entry) => {
    const newPatient = Object.assign({ id: (0, uuid_1.v1)() }, entry);
    patients_json_1.default.push(newPatient);
    return newPatient;
};
exports.default = {
    getEntries,
    getEntriesWithoutSSN,
    addPatient
};
