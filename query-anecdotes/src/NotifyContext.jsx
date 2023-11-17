import { createContext, useReducer, useContext } from 'react'

const notifyReducer = (state='', action) => {
  switch (action.type) {
    case "NOTIFY":
        return action.payload
    default:
        return state
  }
}

const NotifyContext = createContext()

export const NotifyContextProvider = (props) => {
  const [notify, notifyDispatch] = useReducer(notifyReducer, '')

  return (
    <NotifyContext.Provider value={[notify, notifyDispatch] }>
      {props.children}
    </NotifyContext.Provider>
  )
}

export const useNotifyValue = () => {
  const notifyAndDispatch = useContext(NotifyContext)
  return notifyAndDispatch[0]
}

export const useNotifyDispatch = () => {
  const notifyAndDispatch = useContext(NotifyContext)
  return notifyAndDispatch[1]
}

export default NotifyContext