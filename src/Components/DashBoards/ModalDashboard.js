import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { useState } from 'react';
import axiosInstance from '../../axiosInstance';
export default function ModalDashboard(props) {
    const [modal, setModal] = useState(false);
    const toggle = () => setModal(!modal);

    const { booking, handleUpdate } = props


    const handleStatus = async (id, type) => {
        try {
            const response = await axiosInstance.put(`http://localhost:3060/api/bookings/${id}?status=${type}`)
            alert(type)
            handleUpdate(response.data)
            toggle()
        } catch (err) {
            alert(err.message)
            console.log(err)
        }
    }

    const handleCheckInOut = async (id, type) => {
        try {
            const response = await axiosInstance.put(`http://localhost:3060/api/bookings/in-out/${id}?type=${type}`)
            alert(type)
            handleUpdate(response.data)
            toggle()
        } catch (err) {
            alert(err.message)
            console.log(err)
        }
    }


    return (
        <>
            <Button color="primary" onClick={toggle}>
                Actions
            </Button>
            <Modal isOpen={modal} toggle={toggle}>

                <ModalHeader toggle={toggle} >Booking Details</ModalHeader>
                <ModalBody>
                    <div>
                        <label className="form-label">Booking Id</label>
                        <input
                            type="text"
                            value={booking.bookingId}
                            disabled={true}
                            className="form-control" />
                        <label className="form-label">Room Type</label>
                        <input
                            type="text"
                            value={booking.Rooms.map((ele) => { return ele.roomTypeId.roomType })}
                            disabled={true}
                            className="form-control" />
                        <label className="form-label">Packages</label>
                        <input
                            type="text"
                            value={booking.packages.map((ele) => { return ele.packageName })}
                            disabled={true}
                            className="form-control" />
                        <label className='form-label'>Actions</label>
                        <div className='form-control'>
                            <button className='btn btn-primary mx-1' onClick={() => {
                                handleStatus(booking._id, 'approved')
                            }}>Approve</button>
                            <button className='btn btn-danger mx-1' onClick={() => {
                                handleStatus(booking._id, 'notApproved')
                            }}>Reject</button>
                            <button className='btn btn-success mx-1' onClick={() => {
                                handleCheckInOut(booking._id, 'isCheckedIn')
                            }}>CheckIn</button>
                            <button className='btn btn-info mx-1' onClick={() => {
                                handleCheckInOut(booking._id, 'isCheckedOut')
                            }}>CheckOut</button>
                        </div>
                    </div>
                </ModalBody>
            </Modal>
        </>
    )
}