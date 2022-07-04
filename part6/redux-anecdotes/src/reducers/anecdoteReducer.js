import { createSlice } from '@reduxjs/toolkit'
import anecdoteService from '../services/anecdotes'

const initialState = [];

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState,
  reducers: {
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
      state.push(action.payload) 
    },
    setAnecdotes(state, action) {
      return action.payload.sort((a,b)=>b.votes-a.votes) 
    }
  },
})

export const {  addVote ,appendAnecdote, setAnecdotes} = anecdoteSlice.actions

export const initializeAnecdotes = () => {
  return async dispatch => {
    const notes = await anecdoteService.getAll()
    dispatch(setAnecdotes(notes))
  }
}

export const createAnecdote = content => {
  return async dispatch => {
    const newNote = await anecdoteService.createNew(content)
    dispatch(appendAnecdote(newNote))
  }
}

export const updateAnecdote = (changedAnecdote) => {

  return async dispatch => {
    const newNote = await anecdoteService.update(changedAnecdote.id,changedAnecdote)
    dispatch(addVote(newNote.id))
  }
}

export default anecdoteSlice.reducer