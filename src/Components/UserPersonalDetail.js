import { Container, Row, Col, Card } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { FaUserCircle } from "react-icons/fa";
export default function PersonalDetail() {

    const userDetail = useSelector((state) => {
        return state.user.user
    })

    console.log(userDetail)

    return (
        <>
            <Container fluid className="mt-4">
                <Row>
                    <Col xs={12} md={6} className='m-auto'>
                        <Card className='m-auto p-3' border="primary">
                            <Card.Title className='m-2'><FaUserCircle style={{"height":"50px"}}/> Personal Information</Card.Title> <hr />
                            <Card.Body>
                                <div className="row my-4">
                                    <div className="col-md-2">
                                        <label className='form-label'>Name</label>
                                    </div>
                                    <div className="col-md-6">
                                        <input
                                            type='text'
                                            disabled={true}
                                            value={userDetail?.name}
                                            className='form-control' />
                                    </div>
                                </div>
                                <div className="row my-4">
                                    <div className="col-md-2">
                                        <label className='form-label'>Email</label>
                                    </div>
                                    <div className="col-md-6">
                                        <input
                                            type='text'
                                            disabled={true}
                                            value={userDetail?.email}
                                            className='form-control' />
                                    </div>
                                </div>
                                <div className="row my-4">
                                    <div className="col-md-2">
                                        <label className='form-label'>Contact No</label>
                                    </div>
                                    <div className="col-md-6">
                                        <input
                                            type='text'
                                            disabled={true}
                                            value={userDetail?.contactNo}
                                            className='form-control' />
                                    </div>
                                </div>
                                <div className="row my-4">
                                    <div className="col-md-2">
                                        <label className='form-label'>Password</label>
                                    </div>
                                    <div className="col-md-6">
                                        <input
                                            type='password'
                                            disabled={true}
                                            value="******************"
                                            className='form-control' />
                                    </div>
                                </div>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </>
    )
}