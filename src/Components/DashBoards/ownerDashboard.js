import DataTable from 'react-data-table-component';
import { useEffect, useState } from 'react';
import { format } from 'date-fns';
import ModalDashboard from "./ModalDashboard"
import axiosInstance from '../../axiosInstance';
import { Container, Row, Col, Image, Card } from 'react-bootstrap';
export default function OwnerDashBoard() {

    const [bookings, setBookings] = useState([])
    const [search, setSearch] = useState([])
    const todayDate = new Date().toISOString().split('T')[0];
    const [dateValue, setDateValue] = useState({ to: todayDate, from: todayDate })
    const [formError, setFormError] = useState({})

    useEffect(() => {
        (async () => {
            try {
                const response = await axiosInstance.get(`http://localhost:3060/api/today/bookings?from=${dateValue.from}&to=${dateValue.to}`)
                setBookings(response.data)
            } catch (err) {
                console.log(err)
                alert(err.message)
            }
        })();
    }, [])

    const handleUpdate = (booking) => {
        const bookings1 = bookings.map((ele) => {
            if (ele._id == booking._id) {
                return booking
            } else {
                return ele
            }
        })
        setBookings(bookings1)
    }

    const handleChange = (e) => {
        setDateValue({ ...dateValue, [e.target.name]: e.target.value })
    }

    const error = {}

    const validateError = () => {
        if (dateValue.from === '') {
            error.fromValue = 'To  Value Is required'
        }
        if (dateValue.to === '') {
            error.toValue = 'From Value is required'
        } else if (format(new Date(dateValue.from), 'dd/MM/yyyy') > format(new Date(dateValue.to), 'dd/MM/yyyy')) {
            error.toValue = 'Must be equal to greater than FROM Value'
        }
    }

    const handleBookingSearch = async () => {
        validateError()
        if (Object.keys(error).length === 0) {
            try {
                try {
                    const response = await axiosInstance.get(`http://localhost:3060/api/bookings?from=${dateValue.from}&to=${dateValue.to}`)
                    setFormError({})
                    setBookings(response.data)
                } catch (err) {
                    console.log(err)
                    alert(err.message)
                }
            } catch (err) {

            }
        } else {
            setFormError(error)
        }
    }


    const columns = [

        {
            name: 'Booking id',
            selector: row => row.bookingId,
        },
        {
            name: 'Customer Name',
            selector: row => row.userName
        },
        {
            name: 'CheckIn Date',
            selector: row => row.Date.checkIn.slice(0, 10)
        },
        {
            name: 'CheckOut Date',
            selector: row => row.Date.checkOut.slice(0, 10)
        },
        {
            name: 'No of Rooms',
            selector: row => row.Rooms.reduce((acc, cv) => {
                return acc + cv.NumberOfRooms
            }, 0)
        },
        {
            name: 'No of Guests',
            selector: row => row.guests.adult + row.guests.children
        },
        {
            name: 'Amount',
            selector: row => row.totalAmount
        },
        {
            name: 'Status',
            selector: row => {
                if (row.isPaymentDone !== 'true') {
                    return row.status == 'initiated' ? 'To be Approved' : (row.status == 'approved' ? 'Approved' : 'Rejected')
                } else {
                    return row.isPaymentDone == 'true' ? 'Payment Done' : 'To be Paid'
                }
            }
        },
        {
            name: `CheckedIn|CheckedOut`,
            selector: row => `${row.isCheckedIn} / ${row.isCheckedOut}`
        },
        {
            name: 'Actions',
            selector: row => {
                if (row) {
                    return (
                        <>
                            <ModalDashboard booking={row} handleUpdate={handleUpdate} />
                        </>
                    )
                }
            }
        }
    ]

    return (
        <>
            <div className='row my-2' >
                <Col xs={12} md={6} className='m-auto'>
                    <Card style={{ width: '30rem' }} className='m-auto p-3' border="primary">
                        <Card.Body>
                            <Card.Title> Date - {new Date().toString().slice(0, 16)} </Card.Title> <hr />
                            {/* <h2>No of Bookings - {bookings.filter((ele) => {
                                return format(new Date(ele.createdAt), 'dd/MM/yyyy') == format(new Date(), 'dd/MM/yyyy')
                            }).length}</h2> */}
                            <h2>No of Bookings - {bookings.length}</h2>
                        </Card.Body>
                    </Card>
                </Col>
                <Col xs={12} md={6} className='m-auto'>
                    <Card style={{ width: '30rem' }} className='m-auto p-3' border="primary">
                        <Card.Body>
                            <Card.Title> Total  Bookings </Card.Title> <hr />
                            <h2>Total No of Bookings - {bookings.length}</h2>
                            <h2></h2>
                        </Card.Body>
                    </Card>
                </Col>
            </div>
            <hr />
            <div className='row align-items-center'>
                <div className="col-md-3 row align-items-center offset-md-1">
                    <div className="col-auto">
                        <label htmlFor="from" >From</label>
                    </div>
                    <div className="col">
                        <input
                            name="from"
                            type="date"
                            className="form-control"
                            value={dateValue.from}
                            id="from"
                            onChange={handleChange}
                        />
                    </div>
                    {formError.fromValue && <span className='text-danger'>{formError.fromValue}</span>}
                </div>
                <div className="col-md-3 row align-items-center">
                    <div className="col-auto">
                        <label htmlFor="to">To</label>
                    </div>
                    <div className="col">
                        <input
                            name='to'
                            type="date"
                            className={`form-control`}
                            value={dateValue.to}
                            id="to"
                            min={dateValue.from}
                            onChange={handleChange}
                        />
                        {formError.toValue && <span className='text-danger'>{formError.toValue}</span>}
                    </div>
                </div>

                <div className='col-2 '>
                    <button className='btn btn-primary' onClick={handleBookingSearch}>Search</button>
                </div>
                <div className='col-2'>
                    <input type='text'
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        placeholder='Search By BookingId.....'
                        className='form-control' />
                </div>
            </div>
            <hr />
            <div>
                <DataTable
                    pagination
                    columns={columns}
                    data={search ? bookings.filter((ele) => ele.bookingId.includes(search)) : bookings}
                />
            </div>
        </>)
}
