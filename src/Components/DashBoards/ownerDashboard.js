import DataTable from 'react-data-table-component';
import { useEffect, useState } from 'react';
import ModalDashboard from "./ModalDashboard"
import axiosInstance from '../../axiosInstance';
import { Container, Row, Col, Image, Card } from 'react-bootstrap';
const { format } = require('date-fns')
export default function OwnerDashBoard() {

    const [bookings, setBookings] = useState([])
    const [search, setSearch] = useState([])

    useEffect(() => {
        (async () => {
            try {
                const response = await axiosInstance.get("http://localhost:3060/api/bookings")
                console.log(response.data)
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
            name: 'Booking Category',
            selector: row => row.bookingCategory
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
            name: 'Conatct No',
            selector: row => row.contactNumber
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
            <h1>Dashboard Component</h1>
            <hr />
            <div className='row'>
                <Col xs={12} md={6} className='m-auto'>
                    <Card style={{ width: '30rem' }} className='m-auto p-3' border="primary">
                        <Card.Body>
                            <Card.Title> Date - {new Date().toString().slice(0, 16)} </Card.Title> <hr />
                            <h2>No of Bookings - {bookings.filter((ele) => {
                                return format(new Date(ele.createdAt), 'dd/MM/yyyy') == format(new Date(), 'dd/MM/yyyy')
                            }).length}</h2>

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
            <div className='row'>
                <div className='col-3 offset-md-8'>
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
