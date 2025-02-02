import  { useEffect } from "react"
import { useNavigate } from "react-router-dom"


export function ProtectedRoute({children}){
    const navigator = useNavigate()
    useEffect(()=>{
        if(localStorage.getItem('token')){

        }else{
            navigator('/login')
        }
    })
    return(
        <>
            {children}
        </>
    )
}