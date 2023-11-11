import { useDispatch, useSelector } from 'react-redux'
import { vote } from '../reducers/anecdoteReducer'
import { notification } from '../reducers/notificationReducer'

const Anecdote = ({ anecdote, handleClick })  => {
  return(
    <p>{anecdote.content}<br /> has {anecdote.votes} votes <button onClick={handleClick}>vote</button></p>
  )
}

const sortedAnecdotes = (anecdotes) => {
    const anecdotesCopy = [...anecdotes]
    anecdotesCopy.sort((a, b) => b.votes - a.votes)
    return anecdotesCopy
  }

const AnecdotesList = () => {
  const dispatch = useDispatch()
  const anecdotes = useSelector(state => state.anecdotes)

  const filterInput = useSelector(state => state.filter)
  
  const filter = (filterInput) 
    ? anecdotes.filter(anecdotes => anecdotes.content.toLowerCase().includes(filterInput.toLowerCase()))
    : anecdotes
  
  const handleClick = id => {
    const anecdoteToFind = anecdotes.find(a => a.id === id)
    dispatch(vote(id))
    const content = `you voted anecdote: ${anecdoteToFind.content}`
    dispatch(notification(content))
    setTimeout(() => {
      dispatch(notification(''))
    }, 5000)


  }

  return(
    <div>
      {sortedAnecdotes(filter).map(anecdote =>
        <Anecdote
          key={anecdote.id}
          anecdote={anecdote}
          handleClick={() => handleClick(anecdote.id)

          }
        />
      )}
    </div>
  )
}

export default AnecdotesList