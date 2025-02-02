import React, { useState } from 'react'
import { Link } from 'react-router-dom'

export default function Login() {
    const [user,setUser] = useState({
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
            <h1>Login Here</h1>
        </div>
        <div className="form">
        <form onSubmit={handleSubmit}>
            <input onChange={(e)=>setUser({...user,email:e.target.value})} value={user.email} type="email" placeholder="Email"/>
            <input onChange={(e)=>setUser({...user,password:e.target.value})} value={user.password} type="password" placeholder="Password" />
            <button>Login</button>
        </form>
        </div>
        <div className="card_terms"> 
            <span>Don't have an account yet?
                <Link to={"/signup"}>Signup Here</Link>
            </span>
        </div>
        </div>
    </div>
  )
}
