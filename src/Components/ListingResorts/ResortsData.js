import { Container, Row, Col, Card } from 'react-bootstrap';
import { useEffect, useState } from 'react';
import { FaStar, FaIndianRupeeSign } from "react-icons/fa6";
import logo from "../../Images/logo.png"
import {useNavigate, useParams} from "react-router-dom"
import {useSelector} from "react-redux"
export default function ResortsData() {


    const [resorts, setResorts] = useState([])
    const naviagte = useNavigate()


    const searchInfo = useSelector((state)=>{
        return state.booking.booking
    })


    useEffect(() => {
        const data = JSON.parse(localStorage.getItem('resorts'))
        setResorts(data)
    }, [])

    const ratingsStar = (rate) => {
        const rating = []
        for (let i = 1; i <= rate; i++) {
            rating.push(<FaStar />)
        }
        return rating
    }


    const handleClick = (id)=>{
        localStorage.setItem('resortId', id)
        naviagte(`/resort-detail/${id}?checkIn=${searchInfo.checkIn}&checkOut=${searchInfo.checkOut}&adult=${searchInfo.adult}&children=${searchInfo.children}&bookingCategory=${searchInfo.bookingCategory}`)
    }


    return (
        <>
            <Container fluid>
                <Row>
                    <Col md={12} className='m-auto'>
                        <Card className='m-auto p-3 border-0 border-start'>
                            <Card.Body>

                                <Card.Title > ## {resorts.length}+ stay in this area </Card.Title> <hr />

                                {
                                    resorts.map((ele) => {
                                        return (
                                                <Card className='m-auto p-3 row border-bottom border-0' key={ele._id} onClick={()=>{
                                                    handleClick(ele._id)
                                                }}>
                                                    <Row>
                                                        <Col md={3}>
                                                            <img src={`http://localhost:3060/images/${ele.propertyPhotos[0]}`} className='img-fluid' alt="Logo" />
                                                        </Col>
                                                        <Col md={9}>
                                                            <div>
                                                                <Card.Title>{ele.propertyName}
                                                                    <div className='fst-italic fs-6 fw-light'>
                                                                        {ele.location.houseNumber}, {ele.location.locality}, {ele.location.area}, {ele.location.city}
                                                                    </div>
                                                                </Card.Title>
                                                                <Card.Body>
                                                                    {
                                                                        ele.propertyAmenities.map((ele) => {
                                                                            return (<span key={ele._id}>#{ele.name}</span>)
                                                                        })
                                                                    } <br /><br />
                                                                    <h1><FaIndianRupeeSign />{ele.basePrice}</h1> 
                                                                    <Row>
                                                                        <Col md={4}>
                                                                            {ratingsStar(ele.rating)}
                                                                        </Col>
                                                                        <Col md={8} className='d-flex justify-content-end'>
                                                                            <button className='btn btn-primary me-2' onClick={()=>{handleClick(ele._id)}}>View </button> 
                                                                            <button className='btn btn-primary' onClick={()=> handleClick(ele._id)}>Book</button>
                                                                        </Col>
                                                                    </Row>
                                                                </Card.Body>
                                                            </div>
                                                        </Col>
                                                    </Row>
                                                </Card>
                                        )
                                    })
                                }
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </>
    )
}