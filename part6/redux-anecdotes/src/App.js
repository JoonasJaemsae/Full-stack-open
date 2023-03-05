import { useEffect } from 'react'
import AnecdoteForm from './components/AnecdoteForm'
import AnecdoteList from './components/AnecdoteList'
import Filter from './components/Filter'
import Notification from './components/Notification'

// import anecdoteService from './services/anecdotes'
// import { setAnecdotes } from './reducers/anecdoteReducer'
import { useDispatch } from 'react-redux'

import { initializeAnecdotes } from './reducers/anecdoteReducer'


const App = () => {
	const dispatch = useDispatch()

	useEffect(() => {
		// anecdoteService
		// .getAll().then(anecdotes => dispatch(setAnecdotes(anecdotes)))
		dispatch(initializeAnecdotes())
	}, [dispatch])
	// ^ Inserting the variable 'dispatch' inside the brackets
	// in the above manner gets rid of the missing dependency warning.

	return (
		<div>
			<Notification />
			<Filter />
			<AnecdoteList />
			<AnecdoteForm />
		</div>
	)
}

export default App