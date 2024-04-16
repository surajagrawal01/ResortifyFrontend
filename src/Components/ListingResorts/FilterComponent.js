import { Container, Row, Col, Card } from 'react-bootstrap';
export default function FilterComponent() {
    return (
        <>
            <Container fluid>
                <Row>
                    <Col md={12} className='m-auto'>
                        <Card className='m-auto p-3 border-0'>
                            <Card.Body>
                                <Card.Title > Filters </Card.Title> <hr />
                                <Card className='border-0'>
                                    <Card.Title > Price Range </Card.Title>
                                    <Card.Body>
                                        {['upto 1000', '1001 - 2000', '2001- 3000', '3000+'].map((ele, i) => {
                                            return (
                                                <div key={i}>
                                                    <input type='checkbox'
                                                        value={ele}
                                                    /> &nbsp; {ele}
                                                </div>
                                            )
                                        })}
                                    </Card.Body>
                                </Card> <hr />
                                <Card className='border-0'>
                                    <Card.Title > Customer Ratings </Card.Title>
                                    <Card.Body>
                                        {['4.5+', '4+', '3.5+', '3+'].map((ele, i) => {
                                            return (
                                                <div key={i}>
                                                    <input type='checkbox'
                                                        value={ele}
                                                    /> &nbsp; {ele}
                                                </div>
                                            )
                                        })}
                                    </Card.Body>
                                </Card>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </>
    )
}