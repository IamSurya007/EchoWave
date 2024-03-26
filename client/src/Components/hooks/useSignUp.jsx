import { useState } from 'react'
import { useAuthContext } from './useAuthContext'

export const useSignup = () => {
  const [error, setError] = useState(null)
  const [isLoading, setIsLoading] = useState(null)
  const { dispatch } = useAuthContext()

  const signup = async (email, password, name, file) => {
    setIsLoading(true)
    setError(null)

    const formdata= new FormData();
    formdata.append('email', email)
    formdata.append('password', password)
    formdata.append('name', name)
    formdata.append('file', file)
    const response = await fetch('http://localhost:5000/auth/signup', {
      method: 'POST',
      body:formdata
    })
    const json = await response.json()

    if (!response.ok) {
      setIsLoading(false)
      setError(json.error)
    }
    if (response.ok) {
      // save the user to local storage
      localStorage.setItem('user', JSON.stringify(json))
      // update the auth context
      dispatch({type: 'LOGIN', payload: json})

      // update loading state
      setIsLoading(false)
    }
  }

  return { signup, isLoading, error }
}