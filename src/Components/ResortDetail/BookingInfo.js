import { Container, Row, Col, Card } from 'react-bootstrap';
import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from "react-redux"
import { useLocation, useParams } from "react-router-dom"
import axios from "axios"
import {clearBooking} from "../../actions/bookingAction"
import { useNavigate } from "react-router-dom"
import Swal from 'sweetalert2'
export default function BookingInfo() {

    const { id } = useParams()
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const location = useLocation()

    const searchInfo = Object.fromEntries(new URLSearchParams(useLocation().search))
    
    const Rooms = useSelector((state) => {
        return state.booking.Rooms
    })

    const packages = useSelector((state) => {
        return state.booking.packages
    })

    const roomPrice = () => {
        return Rooms.reduce((acc, cv) => {
            return ((cv.baseRoomPrice * cv.value) + acc)
        }, 0)
    }

    const sweetAlertFunc = () => {
        Swal.fire({
            title: "Booking Initiated",
            text: "Confirmation Sent to Mail",
            icon: "success",
            confirmButtonText: "OK"
        }).then((result) => {
            if (result.isConfirmed) {
                dispatch(clearBooking())
                navigate("/")
            }
        })
    }

    const [booking, setBooking] = useState({
        searchInfo,
        Rooms,
        packages
    })

    const formData = {
        propertyId: id,
        bookingCategory: booking.searchInfo.bookingCategory,
        guests: {
            adult: booking.searchInfo.adult,
            children: booking.searchInfo.children
        },
        Rooms: Rooms.map((ele) => {
            return ({ roomTypeId: ele._id, NumberOfRooms: ele.value })
        }),
        packages: packages.filter((ele) => ele.isChecked === true).map((pack) => {
            return { packId: pack._id, packageName: pack.package }
        }),
        Date: {
            checkIn: searchInfo.checkIn,
            checkOut: searchInfo.checkOut
        }
    }

    useEffect(() => {
        setBooking((previousState) => ({
            ...previousState,
            Rooms: Rooms,
            packages: packages
        }))
    }, [Rooms, packages])


    const handlePackage = () => {
        const arr = packages.filter((ele) => ele.isChecked === true)
        return arr.map((element) => {
            return <li>{element.package}</li>
        })
    }

    const packagePrice = () => {
        const arr = packages.filter((ele) => ele.isChecked === true)
        return arr.reduce((acc, cv) => {
            return acc + Number(cv.price)
        }, 0)
    }

    const calculateTax = () => {
        let roomValue = roomPrice()
        let packagesValue = packagePrice()
        return Math.round((roomValue + packagesValue) * 0.12)
    }

    const hanldeTotalAmount = () => {
        let roomValue = roomPrice()
        let packagesValue = packagePrice()
        let taxValue = calculateTax()
        return roomValue + packagesValue + taxValue
    }

    const handleClick = async () => {
        if (Rooms.length < 1) {
            alert('Atleast Select One Room TYpe')
        }
        else {
            const token = localStorage.getItem("token")
            if (token) {
                try {
                    const response = await axios.post("http://localhost:3060/api/bookings", formData, {
                        headers: {
                            Authorization:token
                        }
                    })
                    sweetAlertFunc()
                } catch (err) {
                    console.log(err)
                    alert(err.message)
                }
            }
            else {
                navigate("/loginPage",{state:`${location.pathname}${location.search}`})
            }
        }

    }

    return (
        <>
            <Container fluid className='d-flex align-items-center dynamic-height'>
                <Row className="justify-content-center">
                    <Col xs={12} md={12}>
                        <Card className='p-3 m-4' border="primary">
                            <Card.Title>
                                Booking Info
                            </Card.Title> <hr />
                            <Card.Body>
                                <form>
                                    <div className="row align-items-center my-2">
                                        <div className="col-auto" style={{ width: "150px" }}>
                                            <label htmlFor="checkIn" >CheckIn Date</label>
                                        </div>
                                        <div className="col">
                                            <input
                                                type="text"
                                                className="form-control"
                                                value={searchInfo.checkIn}
                                                disabled={true}
                                                id="checkIn"
                                            />
                                        </div>
                                    </div>
                                    <div className="row align-items-center my-2">
                                        <div className="col-auto" style={{ width: "150px" }}>
                                            <label htmlFor="checkOut">checkOut Date</label>
                                        </div>
                                        <div className="col">
                                            <input
                                                type="text"
                                                className="form-control"
                                                value={searchInfo.checkOut}
                                                disabled={true}
                                                id="checkOut"
                                            />
                                        </div>
                                    </div>
                                    <div className="row align-items-center my-2">
                                        <div className="col-auto" style={{ width: "150px" }}>
                                            <label htmlFor="checkOut">Guests</label>
                                        </div>
                                        <div className="col">
                                            <input
                                                type="text"
                                                className="form-control"
                                                value={`Adult - ${searchInfo.adult}, Child - ${searchInfo.children}`}
                                                disabled={true}
                                                id="checkOut"
                                            />
                                        </div>
                                    </div>
                                    <div className="row align-items-center my-2">
                                        <div className="col-auto" style={{ width: "150px" }}>
                                            <label htmlFor="checkOut">Booking Type</label>
                                        </div>
                                        <div className="col">
                                            <input
                                                type="text"
                                                className="form-control"
                                                value={searchInfo.bookingCategory}
                                                disabled={true}
                                                id="checkOut"
                                            />
                                        </div>
                                    </div>
                                    <div className="row align-items-center my-2">
                                        <div className="col-auto" style={{ width: "150px" }}>
                                            <label htmlFor="checkOut">Rooms:</label>
                                        </div>
                                        <div className='col'>
                                            {
                                                Rooms.map((ele) => {
                                                    return (
                                                        <span className='form-control' key={ele._id}>{ele.roomType} - {ele.value}</span>
                                                    )
                                                })
                                            }
                                        </div>
                                    </div>
                                    <div className="row align-items-center my-2">
                                        <div className="col-auto" style={{ width: "150px" }}>
                                            <label htmlFor="checkOut">Package</label>
                                        </div>
                                        <div className="col">
                                            {handlePackage()}
                                        </div>
                                    </div>
                                    <hr />
                                    <Card.Title>Billing Summary</Card.Title>
                                    <div className="row align-items-center my-2">
                                        <div className="col-auto" style={{ width: "150px" }}>
                                            <label htmlFor="checkOut">Room Price</label>
                                        </div>
                                        <div className="col">
                                            <input
                                                type="text"
                                                className="form-control"
                                                value={roomPrice()}
                                                disabled={true}
                                                id="checkOut"
                                            />
                                        </div>
                                    </div>
                                    <div className="row align-items-center my-2">
                                        <div className="col-auto" style={{ width: "150px" }}>
                                            <label htmlFor="checkOut">Package Price</label>
                                        </div>
                                        <div className="col">
                                            <input
                                                type="text"
                                                className="form-control"
                                                value={packagePrice()}
                                                disabled={true}
                                                id="checkOut"
                                            />
                                        </div>
                                    </div>
                                    <div className="row align-items-center my-2">
                                        <div className="col-auto" style={{ width: "150px" }}>
                                            <label htmlFor="checkOut">Taxes & Fees</label>
                                        </div>
                                        <div className="col">
                                            <input
                                                type="text"
                                                className="form-control"
                                                value={calculateTax()}
                                                disabled={true}
                                                id="checkOut"
                                            />
                                        </div>
                                    </div>
                                    <div className="row align-items-center my-2">
                                        <div className="col-auto" style={{ width: "150px" }}>
                                            <label htmlFor="checkOut">Total(in Rupees)</label>
                                        </div>
                                        <div className="col">
                                            <input
                                                type="text"
                                                className="form-control"
                                                value={hanldeTotalAmount()}
                                                disabled={true}
                                                id="checkOut"
                                            />
                                        </div>
                                    </div>
                                </form>
                            </Card.Body>
                            <input type='submit' value={'Confirm Booking'} className='btn btn-primary' onClick={handleClick} />
                        </Card>
                    </Col>
                </Row>
            </Container>
        </>
    )
}