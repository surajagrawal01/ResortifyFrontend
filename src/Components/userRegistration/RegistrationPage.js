import { Container, Row, Col, Image, Card } from 'react-bootstrap';
import { useState } from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from "axios"
import { Link, useNavigate } from 'react-router-dom';
import img from "../../Images/bg-register4.jpg"

export default function RegistartionForm() {
    const [serverErrors, setServerErrors] = useState([])

    const navigate = useNavigate()

    return (
        <Formik
            initialValues={{ name: '', email: '', contactNo: '', password: '', role: '' }}
            validationSchema={Yup.object({
                name: Yup.string()
                    .max(15, 'Must be 15 characters or less')
                    .required('Required'),
                email: Yup.string()
                    .email('Invalid email address')
                    .required('Required'),
                contactNo: Yup.string()
                    .matches(/^[0-9]{10}$/, 'Must be of 10 digits')
                    .required('Required'),
                password: Yup.string()
                    .min(8, 'min 8 characters')
                    .max(128, 'min 128 characters')
                    .required('Required')
                    .matches(/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[^\w\s])/, 'At least one Capital Letter, small letter, digit and symbol'),
                role: Yup.string().required('Required')
            })}
            onSubmit={async (values) => {
                try {
                    localStorage.setItem('email', values.email)
                    const response = await axios.post("http://localhost:3060/api/users", values)
                    navigate('/emailVerification')
                } catch (err) {
                    console.log(err)
                    setServerErrors(err.response.data.errors)
                }
            }}
        >
            <>
                <Container fluid style={{
                        "backgroundImage": `url(${img})`,
                        "backgroundSize": "cover",
                        "backgroundPosition": "center",
                        "backgroundRepeat": "no-repeat"
                    }}>
                    <Row>
                        <Col xs={12} md={6}>
                            <Image  fluid style={{ height: '100vh', objectFit: 'cover' }} />
                        </Col>
                        <Col xs={12} md={6} className='m-auto'>
                            <Card style={{ width: '30rem' }} className='m-auto p-3'>
                                <Card.Body>

                                    <Card.Title > Registration Form </Card.Title> <hr />
                                    {
                                        serverErrors.length > 0 && <div>
                                            {serverErrors.map((ele, i) => {
                                                return <div key={i} className='text-danger'>**{ele.msg}</div>
                                            })}
                                        </div>
                                    }
                                    <Form className='form-control'>
                                        <label className="form-label" htmlFor="name">Name</label>
                                        <Field className="form-control" name="name" type="text" id="name" />
                                        <ErrorMessage className="text-danger" component="div" name="name" />

                                        <label className="form-label" htmlFor="email">Email</label>
                                        <Field className="form-control" name="email" type="text" id="email" />
                                        <ErrorMessage className="text-danger" component="div" name="email" />

                                        <label className="form-label" htmlFor="contactNo" >ContactNo </label>
                                        <Field className="form-control" name="contactNo" type="text" id="contactNo" />
                                        <ErrorMessage className="text-danger" component="div" name="contactNo" /> <br />

                                        <div>
                                            <label id="role-radio" className='form-label'>Role: &nbsp;</label>
                                            <span role="group" aria-labelledby="role-radio">
                                            <Field className="form-check-input" type="radio" name="role" value="user" id="user"/> &nbsp;
                                                <label htmlFor="user">
                                                    User
                                                </label>  &nbsp; &nbsp;
                                                <Field className="form-check-input" type="radio" name="role" value="owner" id="owner" /> &nbsp;
                                                <label htmlFor="owner">
                                                    Owner
                                                </label>
                                            </span> &nbsp;
                                            <ErrorMessage className="text-danger" component="div" name="role" />
                                        </div>

                                        <label className="form-label" htmlFor="password">Password </label>
                                        <Field className="form-control" name="password" type="password" id="password" />
                                        <ErrorMessage className="text-danger" component="div" name="password" />
                                        <article className='indicate-warning'>
                                            <p>**Password requires UpperCase, LowerCase, Digit, and Symbol, minimally.</p>
                                        </article>

                                        <button type="submit" className='btn btn-primary form-control'>Submit</button> <br />
                                        <Link to='/loginPage'>Already have an account? Login here</Link> <br />
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
