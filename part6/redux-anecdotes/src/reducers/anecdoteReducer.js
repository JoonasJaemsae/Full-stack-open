import { createSlice } from '@reduxjs/toolkit'

import anecdoteService from '../services/anecdotes'

// const anecdotesAtStart = [
// 'If it hurts, do it more often',
// 'Adding manpower to a late software project makes it later!',
// 'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
// 'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
// 'Premature optimization is the root of all evil.',
// 'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
// ]

// const getId = () => (100000 * Math.random()).toFixed(0)

// const asObject = (anecdote) => {
// return {
// content: anecdote,
// id: getId(),
// votes: 0
// }
// }

// const initialState = anecdotesAtStart.map(asObject)

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    // createAnecdote(state, action) {
    // We don't need the below anymore, because server will handle id, and the value for vote is designated elsewhere too.
    // const content = action.payload
    // const newAnecdote = {
    // content,
    // id: getId(),
    // votes: 0
    // }
    // return state.concat(newAnecdote)

    // We could also push the anecdote into the array because Redux Toolkit makes
    // use of the Immer library.

    // state.push(action.payload)
    // },
    voteForAnecdote(state, action) {
      const id = action.payload
      const updatedAnecdote = state.find(anecdote => anecdote.id === id)
      const changedAnecdote = {
        ...updatedAnecdote,
        votes: updatedAnecdote.votes + 1
      }
      const newArray = state.map(anecdote =>
        anecdote.id !== id ? anecdote : changedAnecdote)
      return newArray
    },
    
    appendAnecdote(state, action) {
      state.push(action.payload)
    },

    setAnecdotes(state, action) {
      return action.payload
    }
  },
})

export const { voteForAnecdote, appendAnecdote, setAnecdotes } = anecdoteSlice.actions

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch(setAnecdotes(anecdotes))
  }
}

export const createAnecdote = content => {
  return async dispatch => {
    const newAnecdote = await anecdoteService.createNew(content)
    dispatch(appendAnecdote(newAnecdote))
  }
}

export const castVote = anecdote => {
  return async dispatch => {
    const updatedAnecdote = await anecdoteService.addVote(anecdote.id, { ...anecdote, votes: anecdote.votes + 1 })
    dispatch(voteForAnecdote(updatedAnecdote.id))
  }
}

export default anecdoteSlice.reducer