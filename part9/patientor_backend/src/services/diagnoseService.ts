import diagnoseData from '../../data/diagnoses.json';

import {Diagnose} from '../types';

const diagnoses: Array<Diagnose> = diagnoseData;

const getEntries = () => {
  return diagnoses;
};

// const addDiary = () => {
//   return null;
// };

export default {
  getEntries
};