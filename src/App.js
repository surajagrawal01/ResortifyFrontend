import PropertyDetails from "./Components/Property-Form/PropertyDetails";
import RoomDetails from "./Components/Property-Form/RoomDetails";
import Rooms from "./Components/Property-Form/Rooms";
import UploadPhotos from "./Components/Property-Form/UploadPhotos";
import Policies from "./Components/Property-Form/PropertyPolicies";
import PropertyContext from "./context/PropertyContext";
import { useReducer } from "react";
import FinanceAndLegal from "./Components/Property-Form/FinanceLegal";
import RegistartionForm from "./Components/userRegistration/RegistrationPage";
import { useEffect } from "react";
import { setLoginTrue } from "./actions/isLoginActions";
import { Routes, Route, Link } from "react-router-dom";
import OTPVerification from "./Components/userRegistration/OtpVerification";
import LoginPage from "./Components/userRegistration/LogInPage";
import ForgotPassword from "./Components/userRegistration/ForgotPassword";
import OwnerDashBoard from "./Components/DashBoards/ownerDashboard";
import HomePage from "./Components/HomePage";
import { useSelector, useDispatch } from "react-redux";
import { startSetUser } from "./actions/userActions";
import ListResorts from "./Components/ListingResorts/ListResorts";
import NavigationBar from "./Components/Navbar";
import ResortDetail from "./Components/ResortDetail/ResortDetail";
import Footer from "./Components/Footer";
import PaymentPage from "./Components/PaymentComp/PaymentPage";
import Success from "./Components/PaymentComp/Success";
import Failure from "./Components/PaymentComp/Failure";
import StepperForm from "./Components/Property-Form/StepperForm";
import Reviews from "./Components/Reviews/review";
import AdminDashboard from "./Components/DashBoards/AdminDashBoard";
import PrivateRoute from "./Components/PrivateRoute";
import UnAuthorized from "./Components/Unauthorized";
import { RotatingLines } from "react-loader-spinner";
import NotFound from "./Components/NotFound";
import Chat from "./Components/ChatSystem/Chat";
import PersonalDetail from "./Components/UserPersonalDetail";
import MyBookings from "./Components/UserDetails/MyBookings";
import AboutUs from "./Components/AboutUs/aboutus";

function PropertyReducer(state, action) {
  switch (action.type) {
    case "ADD_PROPERTY_DETAILS": {
      return {
        ...state,
        propertyData: { ...state.propertyData, ...action.payload },
      };
    }
    case "ADD_AMENITIES": {
      return { ...state, amenities: action.payload };
    }
    case "ADD_ROOM_DETAILS": {
      return {
        ...state,
        roomTypes: [...state.roomTypes, { ...action.payload }],
      };
    }

    case "ADD_GEOLOCATION": {
      return { ...state, geoLocation: { ...action.payload } };
    }
    case "ADD_FORM": {
      return {
        ...state,
        propertyData: {
          ...state.propertyData,
          roomTypesData: [...state.roomTypes],
        },
      };
    }
    default: {
      return { ...state };
    }
  }
}

const initialState = {
  propertyData: {},
  amenities: [],
  geoLocation: {},
  roomTypes: [],
};

export default function App() {
  const [resort, resortDispatch] = useReducer(PropertyReducer, initialState);

  const dispatch = useDispatch();

  const user = useSelector((state) => {
    return state.user.user
  })


  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      dispatch(setLoginTrue());
      dispatch(startSetUser());
    }
  }, []);

  const token = localStorage.getItem('token')

  return (
    <>
      {(!Object.keys(user).length > 0 && token)
        ? <div className="parent-container">
          <RotatingLines
            visible={true}
            height="96"
            width="96"
            color="grey"
            strokeWidth="5"
            animationDuration="0.75"
            ariaLabel="rotating-lines-loading"
            wrapperStyle={{}}
            wrapperClass=""
          /> </div> : <>
          <NavigationBar />
          <PropertyContext.Provider value={{ resort, resortDispatch }} >
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path='/registration-page' element={<RegistartionForm />} />
              <Route path='/loginPage' element={<LoginPage />} />
              <Route path="/forgot-password" element={<ForgotPassword />} />
              <Route path="/resort-listing" element={<ListResorts />} />
              <Route path="/resort-detail/:id" element={<ResortDetail />} />
              <Route path="/emailVerification" element={<OTPVerification />} />
              <Route path="/chat" element={<Chat/>} />
              <Route path="/personal-detail"
                element={
                  <PrivateRoute permittedRoles={['owner','user']}>
                    <PersonalDetail />
                  </PrivateRoute>}
              />
              <Route path="/owner-dashobard"
                element={
                  <PrivateRoute permittedRoles={['owner']}>
                    <OwnerDashBoard />
                  </PrivateRoute>}
              />
              <Route path="/admin-dashboard"
                element={
                  <PrivateRoute permittedRoles={['admin']}>
                    <AdminDashboard />
                  </PrivateRoute>}
              />
              <Route path="/stepperform"
                element={
                  <PrivateRoute permittedRoles={['owner']}>
                    <StepperForm />
                  </PrivateRoute>}
              />
              {/* <Route path="/properties-details" element={<PropertyDetails />} />
              <Route path="/room-amenities" element={<RoomDetails />} />
              <Route path="/add-rooms" element={<Rooms />} />
              <Route path="/upload-photos" element={<UploadPhotos />} />
              <Route path="/policies" element={<Policies />} />
              <Route path="/finance-and-legal" element={<FinanceAndLegal />} /> */}
              <Route
                path="/reviews/:id/bookings/:bookingId"
                 element={<Reviews />}
              />
              <Route path="/booking/payment/:id" element={<PaymentPage />} />
              <Route path="/success"
                element={
                  <PrivateRoute permittedRoles={['user']}>
                    <Success />
                  </PrivateRoute>}
              />
              <Route path="/cancel"
                element={
                  <PrivateRoute permittedRoles={['user']}>
                    <Failure />
                  </PrivateRoute>}
              />
              <Route path="/unauthorized" element={<UnAuthorized />} />
              <Route path="*" element={<NotFound />} />
                <Route path="/my-bookings" element={<MyBookings />} />
          <Route path="/aboutus" element={<AboutUs />} />
            </Routes>
          </PropertyContext.Provider>
          <Footer />
        </> }   
    </>
  );
}
