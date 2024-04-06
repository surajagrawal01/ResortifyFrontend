import { Container, Row, Col, Image, Card } from 'react-bootstrap';
import img1 from "../Images/coorg-karnataka.jpg"
export default function SearchCity() {
    return (
        <>
            <Container fluid style={{ "margin": "10px" }}>
                <Row>
                    <h1>Inspiration for Your Next Trip</h1>
                </Row> <br />
                <Row>
                    <Col xs={12} md={3} className='my-4'>
                        <Card style={{ width: '20rem' }} className='m-auto'>
                            <Card.Body style={{ "padding": 0 }}>
                                <Image src={img1} fluid className='card-image' />
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col xs={12} md={3} className='my-4'>
                        <Card style={{ width: '20rem' }} className='m-auto'>
                            <Card.Body style={{ "padding": 0 }}>
                                <Image src={img1} fluid className='card-image' />
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col xs={12} md={3} className='my-4'>
                        <Card style={{ width: '20rem' }} className='m-auto'>
                            <Card.Body style={{ "padding": 0 }}>
                                <Image src={img1} fluid className='card-image' />
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col xs={12} md={3} className='my-4'>
                        <Card style={{ width: '20rem' }} className='m-auto'>
                            <Card.Body style={{ "padding": 0 }}>
                                <Image src={img1} fluid className='card-image' />
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </>
    )
}