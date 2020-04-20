import React from 'react'
import{Redirect} from 'react-router-dom';
export default function Logout() {
  localStorage.clear();
  sessionStorage.clear();
  return (
   <Redirect to="/login" />
  )
}

