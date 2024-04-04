import RegistartionForm from './Components/userRegistration/RegistrationPage';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import OTPVerification from './Components/userRegistration/OtpVerification';
import LoginPage from './Components/userRegistration/LogInPage';
import ForgotPassword from './Components/userRegistration/ForgotPassword';
import OwnerDashBoard from "./Components/DashBoards/ownerDashboard"
import HomePage from './Components/HomePage';
export default function App(){
    return(
        <>
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path='/registration-page' element={<RegistartionForm />}/>
                <Route path='/emailVerification' element={<OTPVerification />} />
                <Route path='/loginPage' element={<LoginPage />} />
                <Route path="/forgot-password" element={<ForgotPassword />} />
                <Route path="/owner-dashobard" element={<OwnerDashBoard />} />
            </Routes>
        </BrowserRouter> 
        </>
    )
}