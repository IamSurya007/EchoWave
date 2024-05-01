import { useState } from 'react'
import { useAuthContext } from './useAuthContext'
import { useNavigate } from "react-router-dom";
import axio from '@/utils/api.js'
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
    // const response = await fetch('http://localhost:5000/auth/login', {
    //   method: 'POST',
    //   body: formdata
    // })

    try{
      const response = await axio.post('/auth/login', formdata)
      const json = await response.data
      const token = json.token
      console.log(json.token)
      if (response.status === 200) {
        // save the user to local storage
        localStorage.setItem('user', JSON.stringify(json))
        localStorage.setItem('token', token)
        // update the auth context
        dispatch({type: 'LOGIN', payload: json})
  
        // update loading state
        setIsLoading(false)
        navigate('/');
      }
    }catch(err){
      if( err.response || err.response.status===401){
        setError(err.response.data.message)
      }
    }
  }

  return { login, isLoading, error }
}