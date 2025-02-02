import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { loginUser } from '../../api/auth';

export default function Login() {
    const navigator = useNavigate()
    const [user,setUser] = useState({
            email:'',
            password:''
        })
    const handleSubmit = async(e)=>{
            e.preventDefault();
            let res = null;
                try {
                    res = await loginUser(user)
                    if(res.success){
                        localStorage.setItem('token',res.token)
                        
                        alert(res.message)
                        navigator.navigate('/')
                    }else{
                        alert(res.message)
                    }
                } catch (error) {
                    alert(res.message)
                }
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
