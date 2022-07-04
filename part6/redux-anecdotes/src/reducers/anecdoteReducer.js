import { createSlice } from '@reduxjs/toolkit'

const initialState = [];

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState,
  reducers: {
    createAnecdote(state, action) {
      state.push(action.payload)
      // .sort((a,b)=>b.votes-a.votes)
    },
    addVote(state, action) {
      const id = action.payload
      const anecdoteToChange = state.find(n => n.id === id)
      const changedAnecdote = { 
        ...anecdoteToChange, 
        votes: anecdoteToChange.votes+1 
      }
      return state.map(anecdote =>
        anecdote.id !== id ? anecdote : changedAnecdote 
      ).sort((a,b)=>b.votes-a.votes)  
    },
    appendAnecdote(state,action){
      state.push(action.payload).sort((a,b)=>b.votes-a.votes) 
    },
    setAnecdotes(state, action) {
      return action.payload.sort((a,b)=>b.votes-a.votes) 
    }
  },
})

export const { createAnecdote, addVote ,appendAnecdote, setAnecdotes} = anecdoteSlice.actions
export default anecdoteSlice.reducer