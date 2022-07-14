import express from 'express';
import cors from 'cors';

import patientRouter from './routes/patients';
import diagnoseRouter from './routes/diagnoses';

const app = express();
app.use(express.json());
app.use(cors());

const PORT = 3001;


app.use('/api/patients', patientRouter);
app.use('/api/diagnoses', diagnoseRouter);

app.get('/api/ping', (_req, res) => {
  console.log('someone pinged here');
  res.send('pong');
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});