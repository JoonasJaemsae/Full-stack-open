import { useSelector, useDispatch } from 'react-redux'
import { voteForAnecdote } from '../reducers/anecdoteReducer'

const AnecdoteList = () => {
	const filterValue = useSelector(state => state.filter)

	const anecdotes = useSelector(({anecdotes}) => {
        console.log('Anecdotes: ', anecdotes)
		const anecdotesToShow = anecdotes.filter(anecdote => anecdote.content.includes(filterValue))
		const arrangedByVotes = anecdotesToShow.sort((a, b) => (a.votes > b.votes) ? -1 : 1)
		return arrangedByVotes
	})
	const dispatch = useDispatch()

	const vote = (id) => {
		// console.log('vote', id)
		dispatch(voteForAnecdote(id))
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
						<button onClick={() => vote(anecdote.id, anecdote.content)}>vote</button>
					</div>
				</div>
			)}
		</div>
	)
}

export default AnecdoteList