import { Container, Row, Col, Image, Card } from 'react-bootstrap';
import { useNavigate } from "react-router-dom"
import { useDispatch } from "react-redux"
import { clearResortsData } from '../actions/reosrtsDataAction';
import img1 from "../Images/coorg-karnataka.jpg"
import img2 from "../Images/ooty.jpg"
import img3 from "../Images/Gokarna.jpg"
import img4 from "../Images/Munnar.jpg"
export default function SearchCity() {

    const dispatch = useDispatch()

    const navigate = useNavigate()

    const date = new Date()
    const date1 = new Date()
    date1.setDate(date1.getDate() + 1);

    const checkIn = date.toISOString().split('T')[0]
    const checkOut = date.toISOString().split('T')[0]

    const handleClick = (city) => {
        alert(city)
        dispatch(clearResortsData())
        navigate(`/resort-listing?location=${city}&checkIn=${checkIn}&checkOut=${checkOut}&adult=2&children=0`)
    }

    return (
        <>
            <Container fluid > <br />
                <Row> <br />
                    <h1>Inspiration for Your Next Trip</h1>
                </Row>
                <Row>
                    <Col xs={12} md={3} className='my-4'>
                        <Card style={{ width: '20rem', height: '15rem' }} className='m-auto' onClick={() => handleClick('coorg')}>
                            <Card.Body style={{ "padding": 0 }}>
                                <Image src={img1} fluid className='card-image' />
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col xs={12} md={3} className='my-4'>
                        <Card style={{ width: '20rem', height: '15rem' }} className='m-auto' onClick={() => handleClick('ooty')}>
                            <Card.Body style={{ "padding": 0 }}>
                                <Image src={img2} fluid className='card-image' />
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col xs={12} md={3} className='my-4'>
                        <Card style={{ width: '20rem', height: '15rem' }} className='m-auto' onClick={() => handleClick('Gokarna')}>
                            <Card.Body style={{ "padding": 0 }}>
                                <Image src={img3} fluid className='card-image' />
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col xs={12} md={3} className='my-4'>
                        <Card style={{ width: '20rem', height: '15rem' }} className='m-auto' onClick={() => handleClick('Chikmagalur')}>
                            <Card.Body style={{ "padding": 0 }}>
                                <Image src={img4} fluid className='card-image' />
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </>
    )
}