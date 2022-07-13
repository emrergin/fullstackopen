interface Result{
    periodLength: number;
    trainingDays: number;
    target: number;
    average: number;
    success: boolean;
    rating: 1|2|3;
    ratingDescription: string;
}

interface Input{
    hours:Array<number>;
    target:number 
}

const parseArguments = (args: Array<string>): Input => {
    if (args.length < 4) throw new Error('Not enough arguments');
    for (let i=2;i<args.length;i++){
        if (isNaN(Number(args[i]))){
            throw new Error('Provided values should be all numbers!');
        }
    }
    return {
    hours: args.slice(3).map(a=>Number(a)),
    target: Number(args[2])
    };
};

export const calculateExercises = (hours:Array<number>, target:number):Result =>{

    const ratingTexts:Array<string> = ['Meh.','So so', 'Great'];

    const sumArray = (numbers:Array<number>):number=>numbers.reduce((a,b)=>a+b,0);
    const averageArray = (numbers:Array<number>):number=>sumArray(numbers)/numbers.length;

    return{
        periodLength: hours.length,
        trainingDays: hours.filter(a=>a>0).length,
        success: averageArray(hours)>target,
        rating: Math.min(Math.floor(averageArray(hours)/target+1),2) as 1|2|3,
        ratingDescription: ratingTexts[Math.min(Math.floor(averageArray(hours)/target),2)],
        target,
        average:averageArray(hours)
    };
};
if (require.main === module){
try {
    const { hours, target } = parseArguments(process.argv);
    console.log(calculateExercises(hours, target));
  } catch (error: unknown) {
    let errorMessage = 'Something bad happened.';
    if (error instanceof Error) {
      errorMessage += ' Error: ' + error.message;
    }
    console.log(errorMessage);
  }
}