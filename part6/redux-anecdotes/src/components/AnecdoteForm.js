import { useDispatch } from 'react-redux'
import { createAnecdote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'
// import anecdoteService from '../services/anecdotes'

const AnecdoteForm = (props) => {
    const dispatch = useDispatch()

    const addAnecdote = async (event) => {
        event.preventDefault()
        const content = event.target.anecdote.value
        event.target.anecdote.value = ''
        // pre-redux-thunk code, where newAnecdote was passed into the reducer.
        // const newAnecdote = await anecdoteService.createNew(content)
        dispatch(createAnecdote(content))
        dispatch(setNotification(`You created a new anecdote: '${content}'`, 5))
    }

    return (
        <div>
            <h2>Create a new anecdote</h2>
            <form onSubmit={addAnecdote}>
                <input name="anecdote" />
                <button type="submit">add</button>
            </form>
        </div>
    )
}

export default AnecdoteForm