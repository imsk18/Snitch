import React from 'react'
import './App.css'
import { routes } from './app.routes'
import { RouterProvider } from 'react-router';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import { useAuth } from '../features/auth/hook/useAuth';

const App = () => {
  const user = useSelector(state=> state.auth.user);
  const {handleGetMe} = useAuth();

  useEffect(()=>{
    handleGetMe()
  },[])
  console.log('====================================');
  console.log(user);
  console.log('====================================');

  return( <RouterProvider router = {routes}/>)
}

export default App