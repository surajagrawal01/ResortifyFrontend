
import { Container, Row, Col, Card } from 'react-bootstrap';
import { FaStar, FaIndianRupeeSign, FaPersonCircleCheck } from "react-icons/fa6";
import { IoDocumentText } from "react-icons/io5";
import { MdAccessTime } from "react-icons/md";
import { useSelector, useDispatch } from "react-redux"
import { addRoom, decreaseRoomData, increaseRoomData, removeRoomData, removeRoom, addPackages, handlePackage } from "../../actions/bookingAction"
import { useEffect } from 'react';
export default function ResortInfo({ resort }) {

    const dispatch = useDispatch()

    const rooms = useSelector((state) => {
        return state.booking.Rooms
    })

    const packages = useSelector((state) => {
        return state.booking.packages
    })

    const { property, roomTypes, reviews, generalProperyData } = resort

    const ratingsStar = (rate) => {
        if (rate !== 0) {
            const rating = [];
            for (let i = 1; i <= rate; i++) {
                rating.push(<FaStar key={i} />);
            }
            return rating;
        } else {
            return "NewEnlisted";
        }
    };

    const bookingPoliciy = (obj) => {
        const policy = []
        for (const key in obj) {
            policy.push(<li><MdAccessTime /> {key} - <span>CheckIn : {obj[key]['checkIn']} &nbsp;  CheckOut : {obj[key]['checkOut']}</span></li>)
        }
        return policy.reverse()
    }


    useEffect(() => {
        dispatch(addPackages(property.packages))
        return (() => {
            dispatch(removeRoomData())
        })
    }, [dispatch, property.packages])


    //for handle booking based on user search
    const bookingData = {}

    resort.bookings.forEach((ele)=>{
        ele.Rooms.forEach((rom)=>{
            if(rom.roomTypeId._id in bookingData){
                bookingData[rom.roomTypeId._id] += rom.NumberOfRooms
            }else{
                bookingData[rom.roomTypeId._id] = rom.NumberOfRooms
            }
        })
    })


    const handleButton = (roomData) => {
        const room = rooms.find((ele) => ele._id === roomData._id)
        //checking here the toal no of particular room booked 
        let roomBooked 
        if(roomData._id in bookingData){
            roomBooked = bookingData[roomData._id] 
        }

        if (room) {
            return (
                <>
                    <button className='btn btn-info mx-md-1' onClick={() => { dispatch(decreaseRoomData(roomData._id)) }} disabled={room.value === 1}>-</button>
                    {room.value}
                    {/* to handle the plus butoon with no of bookings and the toal no of rooms */}
                    <button className='btn btn-info mx-md-1' onClick={() => { dispatch(increaseRoomData(roomData._id)) }} disabled={room.value === (roomData.NumberOfRooms-(roomBooked||0))}>+</button>
                    <button className='btn btn-info mx-md-1' onClick={() => { dispatch(removeRoom(roomData._id)) }}>x</button>
                </>
            )
        } else {
            return (
                <button className='btn btn-info mx-1' disabled={roomBooked >= roomData.NumberOfRooms} onClick={() => { dispatch(addRoom(roomData)) }}>Add</button>
            )
        }
    }

    return (
        <>
            <Container fluid >
                <Row>
                    <Col xs={12} md={12} className='m-auto'>
                        <Card className='m-auto p-3 border-0' border="primary">
                            <Row>
                                <Col xs={12} md={2} className="order-md-2">
                                    <div className='p-2' style={{ background: "green", color: "white" }}>
                                        <span className='fst-italic fs-5 fw-bold d-flex justify-content-center'> {ratingsStar(property.rating)}</span>
                                        <span className='d-flex justify-content-center'>(# {reviews.length} Reviews) </span>
                                    </div>
                                </Col>
                                <Col xs={12} md={10} className="order-md-1">
                                    <Card.Title>
                                        {property.propertyName} <br />
                                        <div className='fst-italic fs-6 fw-light'>
                                            {property.propertyDescription} <br />

                                            {property.location.houseNumber}, {property.location.locality}, {property.location.area}, {property.location.city} &nbsp;&nbsp;
                                        </div>
                                    </Card.Title>
                                </Col>
                                <hr />
                            </Row>
                            <Card.Body>
                                <h4> Room Types </h4>
                                {
                                    roomTypes.map((room) => {
                                        return (
                                            <Card className='m-auto p-3 mt-2' border="primary" key={room._id}>
                                                <Card.Title>
                                                    <Row>
                                                        <Col xs={9}>
                                                            <div className="d-flex justify-content-between">
                                                                <div>
                                                                    {room.roomType}
                                                                </div>
                                                                <div className="text-end">
                                                                    <span className="mx-1"><FaIndianRupeeSign /></span>
                                                                    {room.baseRoomPrice}
                                                                </div>
                                                            </div>
                                                            <div className='fst-italic fs-6 fw-normal'>
                                                                {room.roomDescription.slice(0, 80)}
                                                            </div>
                                                            {room.roomAmentities.map((ele) => {
                                                                return (<span key={ele._id} className='fst-italic fs-6 fw-light'>#{ele.name}</span>)
                                                            })
                                                            }
                                                        </Col>
                                                        <Col xs={3}>
                                                            {handleButton(room)}
                                                        </Col>
                                                    </Row>
                                                </Card.Title>
                                            </Card>)
                                    })
                                } <br />
                                <hr />
                                <h4>Packages - what this place offers</h4>

                                {
                                    packages.map((ele) => {
                                        return (
                                            <Card className='m-auto p-3 mt-2' border="primary" key={ele._id}>
                                                <Card.Title>
                                                    <Row>
                                                        <Col xs={10}>
                                                            <div className="d-flex justify-content-between">
                                                                <div>
                                                                    {ele.package}
                                                                </div>
                                                                <div className="text-end">
                                                                    <span className="mx-1"><FaIndianRupeeSign /></span>
                                                                    {ele.price}
                                                                </div>
                                                            </div>
                                                        </Col>
                                                        <Col xs={2}>
                                                            <input
                                                                type='checkbox'
                                                                checked={ele.isChecked}
                                                                className='form-check-input border-info'
                                                                onChange={() => { dispatch(handlePackage(ele._id)) }}
                                                            />
                                                        </Col>
                                                    </Row>
                                                </Card.Title>
                                            </Card>
                                        )
                                    })
                                }

                                <hr />

                                <h4>Property Rules and Policies :</h4>
                                <Row>
                                    <Col md={6}>
                                        Booking Policies:
                                        {bookingPoliciy(generalProperyData.bookingPolicies)}
                                    </Col>
                                    <Col md={3}>
                                        <IoDocumentText /> Accetable Id Proofs : {generalProperyData.propertyRules.acceptableIdentityProofs.map((ele, i)=>{
                                            return <li key={i}>{ele}</li>
                                        })}
                                    </Col>
                                    <Col md={3}>
                                        < FaPersonCircleCheck /> Guests Policies : {generalProperyData.propertyRules.guestPolicies.map((ele, i) => {
                                            return <li key={i}>{ele}</li>
                                        })}
                                    </Col> 
                                </Row> <br/>
                                    <hr />
                            </Card.Body>
                        </Card>
                    </Col>
                </Row >
            </Container >
        </>
    )
}