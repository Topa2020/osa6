import { useDispatch, useSelector } from 'react-redux'
import { vote } from '../reducers/anecdoteReducer'

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

  return(
    <div>
      {sortedAnecdotes(filter).map(anecdote =>
        <Anecdote
          key={anecdote.id}
          anecdote={anecdote}
          handleClick={() => 
            dispatch(vote(anecdote.id))
          }
        />
      )}
    </div>
  )
}

export default AnecdotesList