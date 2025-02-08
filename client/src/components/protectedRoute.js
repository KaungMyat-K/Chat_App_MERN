import  { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { getLoggedUser } from "../api/users"


export function ProtectedRoute({children}){
    const [user,setUser] = useState(null)
    const navigator = useNavigate()
    const loggedUser = async ()=>{
        let res ;
        try {
          res = await getLoggedUser();
            if(res.success){
                setUser(res.data)
            }else{
                navigator('/login') 
            }
        } catch (error) {
            navigator('/login')
        }
    }
    useEffect(()=>{
        if(localStorage.getItem('token')){
            loggedUser( )
        }else{
            navigator('/login')
        }
    })
    return(
        <>
            <p>Name : {user?.firstName+' '+user?.lastName}</p>
            <p>Email : {user?.email}</p>
            <br/><br/>
            {children}
        </>
    )
}