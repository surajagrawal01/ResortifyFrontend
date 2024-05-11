import { Row, Col, Image, Card } from 'react-bootstrap';
import { FaStar } from "react-icons/fa6";
import { BsPersonCircle } from "react-icons/bs";
export default function Reviews({ resort }) {
    const { reviews } = resort

    const ratingsStar = (rate) => {
        const rating = []
        for (let i = 1; i <= rate; i++) {
            rating.push(<FaStar style={{color:"gold"}} key={i} />)
        }
        return rating
    }

    return (
        <>
            <hr />
            <h4> <FaStar /> Reviews - {reviews.length}</h4>
            <Row xs={1} md={2} className="g-4 m-auto" style={{ "width": "90%" }}>
                {reviews.map((ele) => (
                    <Col key={ele._id}>
                        <Card className='m-auto p-3 border-0'>
                            <Row className="align-items-center">
                                <Col xs={12} md={6}>
                                    <BsPersonCircle className="mb-2" />
                                    <Card.Title>{ele.userId.name}</Card.Title>
                                    <div className="d-flex align-items-center mb-3">
                                        {ratingsStar(ele.ratings)}
                                    </div>
                                    <p>{ele.description}</p>
                                </Col>
                            </Row>
                            <Row>
                                {
                                    ele.photos.map((ele,i) => {
                                        return (
                                            <Col xs={3} className='text-center mb-3 mb-md-0' key={i}>
                                                <Image src={`https://resortifybackend.onrender.com/images/${ele}`} fluid style={{ maxHeight: '20vh', objectFit: 'cover' }} />
                                            </Col>
                                        )
                                    })
                                }
                            </Row>
                        </Card>
                        <hr />
                    </Col>
                ))}
            </Row>

        </>
    )
}