import { useSelector, useDispatch } from 'react-redux'
import { voteForAnecdote } from '../reducers/anecdoteReducer'

const AnecdoteList = (props) => {
    const dispatch = useDispatch()

    const anecdotes = useSelector(state => {
        const sortedByVotes = state.sort((a, b) => (a.votes > b.votes) ? -1 : 1)
        return sortedByVotes
    })

    const vote = (id) => {
        console.log('vote', id)
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
                        <button onClick={() => vote(anecdote.id)}>vote</button>
                    </div>
                </div>
            )
            }
        </div>
    )
}

export default AnecdoteList