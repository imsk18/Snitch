import React from 'react'
import { useSelector } from "react-redux";
const User = () => {
    

const user = useSelector((state) => state.auth.user);

console.log("Current User:", user);
  return (
    <div>User</div>
  )
}

export default User