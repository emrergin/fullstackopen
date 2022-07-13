interface Categories {
    class: string;
    lowerRange: number;
}

interface Input{
    height: number;
    mass: number;
}

const parseArguments = (args: Array<string>): Input => {
    if (args.length < 4) throw new Error('Not enough arguments');
    if (args.length > 4) throw new Error('Too many arguments');
  
    if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
      return {
        height: Number(args[2]),
        mass: Number(args[3])
      };
    } else {
      throw new Error('Provided values were not numbers!');
    }
};

export const calculateBmi=(height:number,mass:number):string=>{

    const bmi:number = mass/((height/100)**2);
    const bmiCategories: Array<Categories> =
    [
        {class:"Underweight (severe)",lowerRange:0},
        {class:"Underweight (moderate)",lowerRange:6},
        {class:"Underweight (mild)",lowerRange:17},
        {class:"Normal",lowerRange:18.5},
        {class:"Overweight",lowerRange:25},
        {class:"Obese (Class I)",lowerRange:30},
        {class:"Obese (Class II)",lowerRange:35},
        {class:"Obese (Class III)",lowerRange:40}
    ];
    
    for (let i:number=bmiCategories.length-1;i>=0;i--){
        if (bmi>bmiCategories[i].lowerRange){
            return bmiCategories[i].class;
        }
    }
    return '';
};

if (require.main === module){
try {
    const { height, mass } = parseArguments(process.argv);
    console.log(calculateBmi(height, mass));
  } catch (error: unknown) {
    let errorMessage = 'Something bad happened.';
    if (error instanceof Error) {
      errorMessage += ' Error: ' + error.message;
    }
    console.log(errorMessage);
  }
}
// export {calculateBmi};