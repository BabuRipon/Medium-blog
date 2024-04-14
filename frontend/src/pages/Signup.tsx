import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { SignupType } from '@riponbabu/medium-common';
import axios from 'axios';

import LabelInput from '../components/LabelInput';
import { Quotes } from '../components/Quotes';
import { AuthTitle } from '../components/AuthTitle';
import { BACKEND_URL } from '../config';

export const Signup = () => {
  const [signupInput, setSignupInput]= useState<SignupType>({
    name: '',
    password: '',
    email: ''
  });

  const navigate = useNavigate();

  const signupHandler = async () => {
   try{
    const res = await axios.post(`${BACKEND_URL}/api/v1/user/signup`, signupInput, {
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
    <div className="grid grid-cols-2">
      <div className="flex flex-col justify-center items-center h-screen">
        <div>
          <AuthTitle type="signup"/>
          <div className='py-2'>
            <LabelInput
              label='Name'
              placeholder='name'
              onChange={(e)=>{
                setSignupInput({...signupInput, name: e.target.value});
              }}
            />
            <LabelInput
              label='Email'
              placeholder='email'
              type="email"
              onChange={(e)=>{
                setSignupInput({...signupInput, email: e.target.value});
              }}
            />
            <LabelInput
              label='Password'
              placeholder='Password'
              type="password"
              onChange={(e)=>{
                setSignupInput({...signupInput, password: e.target.value});
              }}
            />
          </div>
          <div className='pt-2'>
            <button onClick={signupHandler} type="button" className="w-full text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm py-2 text-center ">Sign up</button>
          </div>
        </div>
      </div>
      <Quotes />
    </div>
  )
}