import React, { useState } from 'react'
import { Link } from 'react-router-dom'

export default function SignUp() {

    const [user,setUser] = useState({
        firstName:'',
        lastName:'',
        email:'',
        password:''
    })
    const handleSubmit = (e)=>{
        e.preventDefault();
        console.log(user)
    }

  return (
    <div className="container">
        <div className="container-back-img"></div>
        <div className="container-back-color"></div>
        <div className="card">
            <div className="card_title">
                <h1>Create Account</h1>
            </div>
            <div className="form">
                <form onSubmit={handleSubmit}>
                    <div className="column">
                        <input onChange={(e)=>setUser({...user,firstName:e.target.value})} value={user.firstName} type="text" placeholder="First Name"  />
                        <input onChange={(e)=>setUser({...user,lastName:e.target.value})} value={user.lastName} type="text" placeholder="Last Name"  />
                    </div>
                    <input onChange={(e)=>setUser({...user,email:e.target.value})} value={user.email} type="email" placeholder="Email" />
                    <input onChange={(e)=>setUser({...user,password:e.target.value})} value={user.password} type="password" placeholder="Password" />
                    <button>Sign Up</button>
                </form>
            </div>
            <div className="card_terms">
                <span>Already have an account?
                    <Link to={'/login'}>Login Here</Link >
                </span>
            </div>
        </div>
    </div>
  )
}
