import { useDispatch } from 'react-redux'
import { createAnecdote } from '../reducers/anecdoteReducer'
import { notification } from '../reducers/notificationReducer'

const AnecdoteForm = () => {
  const dispatch = useDispatch()

  const addAnecdote = (event) => {
    event.preventDefault()
    let content = event.target.anecdote.value
    event.target.anecdote.value = ''
    dispatch(createAnecdote(content))
    const notice = `you added anecdote: ${content}`
    dispatch(notification(notice))
    setTimeout(() => {
      dispatch(notification(''))
    }, 5000)
  }

  return (
    <div>
    <h3>Add anecdote</h3>
    <form onSubmit={addAnecdote}>
      <input name="anecdote" />
      <button type="submit">add</button>
    </form>
    </div>
  )
}

export default AnecdoteForm