import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { createAnecdote } from '../requests'
//import { useContext } from 'react'
import { useNotifyDispatch } from '../NotifyContext'


const AnecdoteForm = () => {
  const queryClient = useQueryClient()
  const dispatch = useNotifyDispatch()
  const newAnecdoteMutation = useMutation({
    mutationFn: createAnecdote,
    onError: (error) => {
      dispatch({ type: 'NOTIFY', payload: error.response.data.error })
      setTimeout(() => {
        dispatch({ type: 'NOTIFY', payload: ''})
      }, 5000)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['anecdotes'] })
      dispatch({ type: 'NOTIFY', payload: `anecdote '${newAnecdoteMutation.variables.content}' added`})
      setTimeout(() => {
        dispatch({ type: 'NOTIFY', payload: ''})
      }, 5000)
    }
  })

  const addAnecdote = async (event) => {  
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    newAnecdoteMutation.mutate({ content, votes: 0 })   
  }

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={addAnecdote}>
        <input name='anecdote' />
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm
