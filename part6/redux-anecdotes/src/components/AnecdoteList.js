import { useSelector, useDispatch } from 'react-redux'
import { castVote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'

const AnecdoteList = () => {
	const filterValue = useSelector(state => state.filter)

	const dispatch = useDispatch()

	const anecdotes = useSelector(({ anecdotes }) => {
		const filteredAnecdotes = anecdotes.filter(anecdote => anecdote.content.includes(filterValue))
		const sortedAnecdotes = filteredAnecdotes.sort((a, b) => (a.votes > b.votes) ? -1 : 1)
		return sortedAnecdotes
	})

	const vote = async (anecdote) => {
		dispatch(castVote(anecdote))
		dispatch(setNotification(`You voted for '${anecdote.content}'!`, 5))
	}

	return (
		<div>
			<h2>Anecdotes</h2>
			{anecdotes.map(anecdote =>
				<div key={anecdote.id}>
					<div>
						{anecdote.content}
					</div>
					<div>
						has {anecdote.votes}
						<button onClick={() => vote(anecdote)}>vote</button>
					</div>
				</div>
			)}
		</div>
	)
}

export default AnecdoteList