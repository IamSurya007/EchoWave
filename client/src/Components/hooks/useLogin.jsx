import { useState } from 'react'
import { useAuthContext } from './useAuthContext'
import { useNavigate } from "react-router-dom";

export const useLogin = () => {
  const [error, setError] = useState(null)
  const [isLoading, setIsLoading] = useState(null)
  const { dispatch } = useAuthContext()
  const navigate = useNavigate()
  const login = async (email, password) => {
    setIsLoading(true)
    setError(null)
    const formdata= new FormData()
    formdata.append('email', email)
    formdata.append('password', password)
    const response = await fetch('http://localhost:5000/auth/login', {
      method: 'POST',
      body: formdata
    })
    const json = await response.json()

    if (!response.ok) {
      setIsLoading(false)
      setError(json.message)
    }
    if (response.ok) {
      // save the user to local storage
      localStorage.setItem('user', JSON.stringify(json))

      // update the auth context
      dispatch({type: 'LOGIN', payload: json})

      // update loading state
      setIsLoading(false)
      navigate('/');
    }
  }

  return { login, isLoading, error }
}