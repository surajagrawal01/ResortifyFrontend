import { Container, Row, Col, Card } from 'react-bootstrap';
import { useEffect, useState } from 'react';
import { useParams } from "react-router-dom"
import axios from "axios"
import Swal from "sweetalert2"
import { useNavigate, useLocation } from "react-router-dom"
export default function PaymentPage() {

    const [bookingInfo, setBookingInfo] = useState(null)
    const navigate = useNavigate()
    const location = useLocation()

    const sweetAlertFunc = () => {
        Swal.fire({
            title: "Payment Link Info",
            text: "Sorry, Link Deactivated",
            icon: "error",
            confirmButtonText: "OK"
        }).then((result) => {
            if (result.isConfirmed) {
                navigate("/")
            }
        })
    }

    const { id } = useParams()

    useEffect(() => {
        ((async () => {
            try {
                const response = await axios.get(`http://localhost:3060/api/bookings/${id}`)
                response.data == null ? sweetAlertFunc() :setBookingInfo(response.data)
            } catch (err) {
                console.log(err)
                alert(err.message)
            }
        }))();
    }, [])

    const handlePay = async () => {
        const token = localStorage.getItem("token")
        if (token) {
            try {
                const body = {
                    bookingId: bookingInfo.bookingId,
                    totalAmount: bookingInfo.totalAmount
                }
                const response = await axios.post('http://localhost:3060/api/create-checkout-session', body, {
                    headers: {
                        Authorization: token
                    }
                })
                //Store the transaction id in local storage
                localStorage.setItem('stripeId', response.data.id)

                //Redirecting the user to the chekout page of stripe
                window.location = response.data.url;
            }
            catch (err) {
                console.log(err)
                alert(err)
            }
        }
        else {
            navigate("/loginPage", { state: `${location.pathname}` })
        }
    }

    return (
        <>
            {
                bookingInfo &&
                    <Container fluid>
                        <Row>
                            <Col xs={12} md={6} className='m-auto'>
                                <Card className='p-3 m-4 m-auto' border="primary" style={{ width: '30rem' }}>
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
                                                        value={bookingInfo.Date.checkIn.slice(0, 10)}
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
                                                        value={bookingInfo.Date.checkOut.slice(0, 10)}
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
                                                        value={`Adult - ${bookingInfo.guests.adult}, Child - ${bookingInfo.guests.children}`}
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
                                                        value={bookingInfo.bookingCategory}
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
                                                        bookingInfo.Rooms.map((ele) => {
                                                            return (
                                                                <span className='form-control' key={ele._id}>{ele.roomTypeId.roomType} - {ele.NumberOfRooms}</span>
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
                                                    {bookingInfo.packages.map((ele) => {
                                                        return <li>{ele.packageName}</li>
                                                    })}
                                                </div>
                                            </div>
                                            <hr />
                                            <Card.Title>Total Amount</Card.Title>
                                            <div className="row align-items-center my-2">
                                                <div className="col-auto" style={{ width: "150px" }}>
                                                    <label htmlFor="checkOut">Total Amount</label>
                                                </div>
                                                <div className="col">
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        value={bookingInfo.totalAmount}
                                                        disabled={true}
                                                        id="checkOut"
                                                    />
                                                </div>
                                            </div>
                                        </form>
                                    </Card.Body>
                                    <input type='submit' value={'Pay Now'} className='btn btn-primary' onClick={handlePay} />
                                </Card>
                            </Col>
                        </Row>
                    </Container>
            }
        </>
    )
}