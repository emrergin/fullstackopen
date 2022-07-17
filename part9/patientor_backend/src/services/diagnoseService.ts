import diagnoseData from '../../data/diagnoses.json';

import {Diagnosis} from '../types';

const diagnoses: Array<Diagnosis> = diagnoseData;

const getEntries = () => {
  return diagnoses;
};

// const addDiary = () => {
//   return null;
// };

export default {
  getEntries
};