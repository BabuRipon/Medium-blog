import { useState } from 'react';
import { SigninType } from '@riponbabu/medium-common';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

import LabelInput from '../components/LabelInput';
import { Quotes } from '../components/Quotes';
import { AuthTitle } from '../components/AuthTitle';
import { BACKEND_URL } from '../config';

export const Signin = () => {
  const [signinInput, setSignupInput] = useState<SigninType>({
    email: '',
    password: '',
  })
  const navigate = useNavigate();

  const signinHandler = async() => {
    try{
      const res = await axios.post(`${BACKEND_URL}/api/v1/user/signin`,signinInput,{
        headers: {
          'Content-Type': 'application/json'
        }
      })
      
      const jwt = res.data.jwt;
      localStorage.setItem('medium_user_token',jwt);
      // if sign up success then pushed to the blogs page
      navigate('/blogs');
    }
    catch(err){
      console.log(err);
    }
  }
  return (
  <div>
    <div className="grid grid-cols-2">
      <div className="flex flex-col justify-center items-center h-screen">
       <div>
          <AuthTitle type="signin"/>
          <div className='py-2'>
            <LabelInput
              label='Email'
              placeholder='email'
              onChange={(e)=>{
                setSignupInput({...signinInput, email: e.target.value})
              }}
              type="email"
            />
            <LabelInput
              label='Password'
              placeholder='Password'
              onChange={(e)=>{
                setSignupInput({...signinInput, password: e.target.value})
              }}
              type="password"
            />
          </div>
          <div className='pt-2'>
            <button onClick={signinHandler} type="button" className="w-full text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm py-2 text-center ">Sign in</button>
          </div>
        </div>
      </div>
      <div>
        <Quotes />
      </div>
    </div>
  </div>
  )
}