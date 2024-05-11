import axios from "axios"
import { useState } from "react"
import { Formik, Field, Form, ErrorMessage } from "formik"
import { Link } from "react-router-dom"
import * as Yup from "yup"
import { Container, Row, Col, Image, Card } from 'react-bootstrap';
import { useNavigate, useLocation } from "react-router-dom"
import { useDispatch } from "react-redux"
import { setLoginTrue } from "../../actions/isLoginActions"
import { startSetUser } from "../../actions/userActions"
import img from "../../Images/bg-login2.jpg"

export default function LoginPage() {
    const [serverErrors, setServerErrors] = useState({})
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const location = useLocation()
    const urlData = location.state

    return (
        <Formik
            initialValues={{ email: '', password: '' }}
            validationSchema={Yup.object({
                email: Yup.string()
                    .email('Invalid email Id')
                    .required('Required'),
                password: Yup.string()
                    .min(8, 'Min 8 characters')
                    .max(128, 'Max 128 characters')
                    .required('Required')
            })}
            onSubmit={async (values) => {
                try {
                    const response = await axios.post("https://resortifybackend.onrender.com/api/users/login", values)
                    localStorage.setItem('token', response.data.token)
                    dispatch(setLoginTrue())
                    dispatch(startSetUser())
                    if (urlData?.includes("/resort-detail")) {
                        navigate(`${urlData}`)
                    } else if (urlData?.includes("/booking/payment")) {
                        navigate(`${urlData}`)
                    }
                    else {
                        navigate("/")
                    }
                } catch (err) {
                    console.log(err)
                    setServerErrors(err.response.data)
                }
            }}
        >
            <>
                <Container fluid style={{
                        "backgroundImage": `url(${img})`,
                        "backgroundSize": "cover",
                        "backgroundPosition": "center",
                        "backgroundRepeat": "no-repeat",
                        "height": '100vh'
                    }}>
                    <Row>
                    <Col xs={0} md={6}>
                            <Image  fluid style={{ height: '100vh', objectFit: 'cover' }} />
                    </Col>
                        <Col xs={12} md={6} className='m-auto'>
                            <Card style={{ width: '30rem' }} className='m-auto p-3'>
                                <Card.Body>

                                    <Card.Title> LogIn </Card.Title> <hr />
                                    {
                                        serverErrors.error && <div className="text-danger">**{serverErrors.error}</div>
                                    }
                                    <Form>
                                        <label className='form-label' htmlFor="email">Email</label>
                                        <Field className='form-control' name="email" type="email" id="email" />
                                        <ErrorMessage className="text-danger" component="div" name="email" /> <br />

                                        <label className='form-label' htmlFor="password">Password</label>
                                        <Field className='form-control' name="password" type="password" id="password" />
                                        <ErrorMessage className="text-danger" component="div" name="password" /> <br />

                                        <button type="submit" className="btn btn-primary form-control">LogIn</button> <br />
                                        <Link to='/forgot-password'>Forgot Password?</Link> <br /> <Link to='/registration-page'>New User! Register Here </Link>
                                    </Form>
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>
                </Container>
            </>
        </Formik>
    )
}