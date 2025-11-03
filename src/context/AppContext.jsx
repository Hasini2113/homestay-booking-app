import React, { createContext, useReducer, useEffect } from 'react'

const initial = {
  user: JSON.parse(localStorage.getItem('user')) || null,
  bookings: JSON.parse(localStorage.getItem('bookings')) || [],
  darkMode: JSON.parse(localStorage.getItem('darkMode')) || false,
}

function reducer(state, action){
  switch(action.type){
    case 'LOGIN': return {...state, user: action.payload}
    case 'LOGOUT': return {...state, user: null}
    case 'ADD_BOOKING': {
      const next = [...state.bookings, action.payload]
      localStorage.setItem('bookings', JSON.stringify(next))
      return {...state, bookings: next}
    }
    case 'TOGGLE_DARK': {
      localStorage.setItem('darkMode', JSON.stringify(!state.darkMode))
      return {...state, darkMode: !state.darkMode}
    }
    default: return state
  }
}

export const AppContext = createContext()

export function AppProvider({children}){
  const [state, dispatch] = useReducer(reducer, initial)
  useEffect(()=>{ localStorage.setItem('user', JSON.stringify(state.user)) }, [state.user])
  return <AppContext.Provider value={{state, dispatch}}>{children}</AppContext.Provider>
}
