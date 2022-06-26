import { useState } from 'react'

const Anecdote = ({anecdote,vote}) =>{
  return (
  <>
    <div>
      {anecdote}
    </div>
    <div>Has {vote} votes.</div>
  </>
  )
}

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.'
  ]
   
  const [selected, setSelected] = useState(0);
  const [scores, setScores] = useState(new Uint8Array(anecdotes.length));

  const pickRandomQuote = () =>{
    let newIndex = Math.floor(Math.random()*anecdotes.length);
    setSelected(newIndex);
  }

  const voteForTheCurrent = () =>{
    const copyScores = [...scores];
    copyScores[selected]+=1;
    setScores(copyScores);
  }

  const getTheBestQuote = () => {
    let currentMax = -Infinity;
    let currentIndex=-1;
    for (let i=0;i<scores.length;i++){
      if (scores[i]>currentMax){
        currentIndex=i;
        currentMax=scores[i];
      }
    }
    return currentIndex;
  }


  return (
    <div>
      <h1>Anecdote of the day</h1>
      <Anecdote anecdote={anecdotes[selected]} vote={scores[selected]}/>
      <button onClick={voteForTheCurrent}>Vote</button>
      <button onClick={pickRandomQuote}>New Quote</button>
      <h1>Anecdote with most votes</h1>
      <Anecdote anecdote={anecdotes[getTheBestQuote()]} vote={scores[getTheBestQuote()]}/>
    </div>
  )
}

export default App