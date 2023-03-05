import { useDispatch } from 'react-redux'
import { setFilter } from '../reducers/filterReducer'

const Filter = () => {
    const dispatch = useDispatch()

    const handleChange = event => {
        dispatch(setFilter(event.target.value))
    }

    return (
        <div>
            <h2>Filter</h2>
            filter <input onChange={handleChange}></input>
        </div>
    )
}


export default Filter