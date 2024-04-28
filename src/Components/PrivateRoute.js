import {Navigate} from "react-router-dom"
import { useSelector } from "react-redux"
export default function PrivateRoute({children, permittedRoles}){

    const loggedIn = useSelector((state)=>{
        return state.isLogIn.isLoggedIn
    })

    const user = useSelector((state)=>{
        return state.user.user
    })
    
    if(!loggedIn){
        return <Navigate to="/loginPage" />
    }

    if(loggedIn && !permittedRoles.includes(user.role)){
        return (<Navigate to='/unauthorized' />)
    }

    return children

}