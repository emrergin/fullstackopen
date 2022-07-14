"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const patients_json_1 = __importDefault(require("../../data/patients.json"));
const getEntries = () => {
    return patients_json_1.default;
};
// const addDiary = () => {
//   return null;
// };
exports.default = {
    getEntries
};
