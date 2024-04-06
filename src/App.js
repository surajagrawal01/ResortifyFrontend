import RegistartionForm from './Components/userRegistration/RegistrationPage';
import { useEffect } from 'react';
import {setLoginTrue} from "./actions/isLoginActions"
import { Routes, Route, Link } from 'react-router-dom';
import OTPVerification from './Components/userRegistration/OtpVerification';
import LoginPage from './Components/userRegistration/LogInPage';
import ForgotPassword from './Components/userRegistration/ForgotPassword';
import OwnerDashBoard from "./Components/DashBoards/ownerDashboard"
import HomePage from './Components/HomePage';
import { useSelector, useDispatch } from 'react-redux';
import { startSetUser } from './actions/userActions';
export default function App() {

    const dispatch = useDispatch()

    useEffect(()=>{
        const token = localStorage.getItem('token')
        if(token){
            dispatch(setLoginTrue())
            dispatch(startSetUser())
        }
    },[])

    const isLoggedIn = useSelector((state) => {
        return state.isLogIn.isLoggedIn
    })

    return (
        <>
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path='/registration-page' element={<RegistartionForm />} />
                <Route path='/emailVerification' element={<OTPVerification />} />
                <Route path='/loginPage' element={<LoginPage />} />
                <Route path="/forgot-password" element={<ForgotPassword />} />
                <Route path="/owner-dashobard" element={<OwnerDashBoard />} />
                <Route path="/list-property" element={ isLoggedIn ? <LoginPage/>  : <RegistartionForm/> } />
            </Routes>  
        </>
    )
}