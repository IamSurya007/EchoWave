import { useState } from 'react'
import { useAuthContext } from './useAuthContext'
import { useNavigate } from "react-router-dom";
import axios from '@/utils/api.js';

export const useSignup = () => {
  const [error, setError] = useState(null)
  const [isLoading, setIsLoading] = useState(null)
  const { dispatch } = useAuthContext()
  const navigate = useNavigate()
  const signup = async (email, password, name, file) => {
    setIsLoading(true)
    setError(null)

    const formdata= new FormData();
    formdata.append('email', email)
    formdata.append('password', password)
    formdata.append('name', name)
    formdata.append('file', file)
    // const response = await fetch('http://localhost:5000/auth/signup', {
    //   method: 'POST',
    //   body:formdata
    // })

    try{
      const response = await axios.post('/auth/signup', formdata)
      const json = await response.data
      const token = await json.token
      
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
    }catch(e){
      if(e.response && e.response.status ==400){
        setIsLoading(false)
        setError(e.response.data.message)
      }
    }
    
  }

  return { signup, isLoading, error }
}