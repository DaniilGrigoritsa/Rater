import { createContext, useState, useEffect} from "react";
import jwt_decode from "jwt-decode";
import { useNavigate } from 'react-router-dom'

const AuthContext = createContext()

export default AuthContext;


export const AuthProvider = ({children}) => {

    let [loading, setLoading] = useState(true)
    const navigate = useNavigate()
    let [authTokens, setAuthTokens] = useState(()=> localStorage.getItem('authTokens') ? JSON.parse(localStorage.getItem('authTokens')) : null)


    let loginUser = async (e) => {
        e.preventDefault()
        let response = await fetch('http://127.0.0.1:8000/api/token/obtain/', {
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify({'username':e.target.username.value, 'password':e.target.password.value})
        })
        let data = await response.json()

        if(response.status === 200){
            setAuthTokens(data)
            localStorage.setItem('authTokens', JSON.stringify(data))
            navigate('/')
        }else{
            alert('Something went Wrong!')
        }
    }

    let logoutUser = () => {
        setAuthTokens(null)
        localStorage.removeItem('authTokens')
        navigate('/login')
    }

    let updateToken = async () => {
        let response = await fetch('http://127.0.0.1:8000/api/token/refresh/', {
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify({'refresh':authTokens.refresh})
        })
        let data = await response.json()
        console.log(data)

        if(response.status === 200){
            setAuthTokens(data)
            localStorage.setItem('authTokens', JSON.stringify(data))
        }else{
            logoutUser()
        }
    }

    let contextData = {
        authTokens:authTokens,
        setAuthTokens:setAuthTokens,
        loginUser:loginUser,
        logoutUser:logoutUser,
    }

    useEffect(()=> {
        let interval = setInterval(()=> {
            if(authTokens){
                updateToken()
            }
        }, 885000)
        return ()=> clearInterval(interval)
    }, [authTokens, loading])

    return(
        <AuthContext.Provider value={contextData}>
            {children}
        </AuthContext.Provider>
    )
}