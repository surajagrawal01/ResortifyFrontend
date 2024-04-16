import PropertyDetails from './Components/Property-Form/PropertyDetails';
import RoomDetails from "./Components/Property-Form/RoomDetails";
import Rooms from "./Components/Property-Form/Rooms";
import UploadPhotos from "./Components/Property-Form/UploadPhotos"
import Policies from "./Components/Property-Form/PropertyPolicies";
import PropertyContext from "./context/PropertyContext";
import { useReducer } from "react";
import FinanceAndLegal from "./Components/Property-Form/FinanceLegal";
import RegistartionForm from './Components/userRegistration/RegistrationPage';
import { useEffect } from 'react';
import { setLoginTrue } from "./actions/isLoginActions"
import { Routes, Route, Link } from 'react-router-dom';
import OTPVerification from './Components/userRegistration/OtpVerification';
import LoginPage from './Components/userRegistration/LogInPage';
import ForgotPassword from './Components/userRegistration/ForgotPassword';
import OwnerDashBoard from "./Components/DashBoards/ownerDashboard"
import HomePage from './Components/HomePage';
import { useSelector, useDispatch } from 'react-redux';
import { startSetUser } from './actions/userActions';
import ListResorts from './Components/ListingResorts/ListResorts';
import NavigationBar from './Components/Navbar';
import ResortDetail from './Components/ResortDetail/ResortDetail';
import Footer from "./Components/Footer"
import PaymentPage from './Components/PaymentComp/PaymentPage';
import Success from './Components/PaymentComp/Success';
import Failure from './Components/PaymentComp/Failure';
function PropertyReducer(state, action) {
    switch (action.type) {
        case 'ADD_PROPERTY_DETAILS': {
            return { ...state, propertyData: { ...state.propertyData, ...action.payload } }
        }
        case 'ADD_AMENITIES': {
            return { ...state, amenities: action.payload }
        }
        case 'ADD_ROOM_DETAILS': {
            return { ...state, roomTypes: [...state.roomTypes, { ...action.payload }] }
        }
        case 'ADD_GEOLOCATION': {
            return { ...state, geoLocation: { ...action.payload } }
        }
        case 'ADD_PACKAGES': {
            return { ...state, packages: [...state.packages, action.payload] }
        }
        default: {
            return { ...state }
        }
    }
}


const initialState = {
    propertyData: {},
    amenities: [],
    packages: [],
    geoLocation: {},
    roomTypes: []
}


export default function App() {
    const [resort, resortDispatch] = useReducer(PropertyReducer, initialState)

    const dispatch = useDispatch()

    useEffect(() => {
        const token = localStorage.getItem('token')
        if (token) {
            dispatch(setLoginTrue())
            dispatch(startSetUser())
        }
    }, [])

    const isLoggedIn = useSelector((state) => {
        return state.isLogIn.isLoggedIn
    })
    
    return (
        <>
            <NavigationBar />
            <PropertyContext.Provider value={{ resort, resortDispatch }} >
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path='/registration-page' element={<RegistartionForm />} />
                    <Route path='/emailVerification' element={<OTPVerification />} />
                    <Route path='/loginPage' element={<LoginPage />} />
                    <Route path="/forgot-password" element={<ForgotPassword />} />
                    <Route path="/owner-dashobard" element={<OwnerDashBoard />} />
                    <Route path="/list-property" element={isLoggedIn ? <LoginPage /> : <RegistartionForm />} />
                    <Route path="/properties-details" element={<PropertyDetails />} />
                    <Route path="/room-amenities" element={<RoomDetails />} />
                    <Route path="/add-rooms" element={<Rooms />} />
                    <Route path="/upload-photos" element={<UploadPhotos />} />
                    <Route path="/policies" element={<Policies />} />
                    <Route path="/finance-and-legal" element={<FinanceAndLegal />} />
                    <Route path="/resort-listing" element={<ListResorts />} />
                    <Route path="/resort-detail/:id" element={<ResortDetail />} />
                    <Route path="/booking/payment/:id" element={<PaymentPage/>} />
                    <Route path="/success" element={<Success />} />
                    <Route path="/cancel" element={<Failure />} />
                </Routes>
            </PropertyContext.Provider>
            <Footer />
        </>
    )
}