import express from 'express';
import bodyParser from 'body-parser';
import  {calculateBmi}  from './bmiCalculator';
import {calculateExercises} from './exerciseCalculator';
const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/bmi', (_req, res) => {
    const height = Number(_req.query.height);
    const weight = Number(_req.query.weight);
    if (isNaN(height) || isNaN(weight)) {
        res.status(400).send({
            message: "malformatted parameters"
         });
        return;
    }
    const responseObject= {
        weight, height,
        bmi: calculateBmi(height,weight)
    };
    res.send(responseObject);
  });

app.post('/exercises', (_req, res) => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
    const daily_exercises=_req.body.daily_exercises;
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
    const target=_req.body.target;
    if (!daily_exercises || !target) {
        res.status(400).send({
          error: "parameters missing"
         });
        return;
    }
    if (!Array.isArray(daily_exercises) || isNaN(Number(target))) {
        res.status(400).send({
        error: "malformatted parameters"
       });
      return;
    } 
    daily_exercises.forEach(a=>{
      if (isNaN(Number(a))){
        res.status(400).send({
          error: "malformatted parameters"
         });
         return;
      }
    });
    const responseObject= 
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-argument
    calculateExercises(daily_exercises,target);
    
    res.send(responseObject);
  });

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});