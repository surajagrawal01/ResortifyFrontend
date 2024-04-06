import { Formik, Field, ErrorMessage, Form } from "formik"
import * as Yup from "yup"
import axios from "axios"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { Container, Row, Col, Image, Card } from 'react-bootstrap';
export default function ForgotPassword() {

    const navigate = useNavigate()

    const [email, setEmail] = useState('')
    const [serverErrors, setServerErrors] = useState([])
    const [formErrors, setFormErrors] = useState({})
    const [isActive, setIsActive] = useState(true)

    const handleOTP = async (e) => {
        e.preventDefault()
        if(email.length == 0){
            formErrors.email = 'Email Required'
        }else{
            try {
                const response = await axios.post('http://localhost:3060/api/users/reVerifiyEmail', { email })
                console.log(response.data)
                setServerErrors({})
                setFormErrors({})
                setIsActive(false)
            } catch (err) {
                console.log(err)
                setServerErrors(err.response.data)
            }
        }
    }

    return (
        <Formik
            initialValues={{
                otp: '', password: ''
            }}
            validationSchema={Yup.object({
                otp: Yup.string()
                    .matches(/^[0-9]{6}$/, 'Must be of 6 digits')
                    .required('Required'),
                password: Yup.string()
                    .min(8, 'password must be of at least 8 characters')
                    .max(128, 'password must be less than 128 characters')
                    .required('Required')
            })}
            onSubmit={async (values) => {
                try {
                    const formData = { email, otp: values.otp, password: values.password }
                    const resonse = await axios.put('http://localhost:3060/api/users/forgotPassword', formData)
                    alert('Password Updated')
                    navigate('/loginPage')
                    setServerErrors({})
                } catch (err) {
                    console.log(err)
                    setServerErrors(err.response.data)
                }
            }}>

            <>
                <Container fluid>
                    <Row>
                        <Col xs={12} md={6} className='m-auto'>
                            <Card style={{ width: '30rem' }} className='m-auto p-3' border="primary">
                                <Card.Body>

                                    <Card.Title > Update Password </Card.Title> <hr />
                                    {
                                        Object.keys(serverErrors).length > 0 && <div className="text-danger">
                                            **{serverErrors.error}
                                        </div>
                                    }
                                    <Form>

                                        <label className="form-label" htmlFor="email">Enter Email</label>
                                        <input type="email"
                                            className="form-control"
                                            id="email"
                                            placeholder="Enter email"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)} />
                                        {
                                            Object.keys(formErrors).length > 0 && <div className="text-danger">{formErrors.email}</div>
                                        }

                                        <button onClick={handleOTP} className="btn btn-primary">Send OTP</button> <br />

                                        <label className="form-label" htmlFor="otp">OTP</label>
                                        <Field className="form-control" name="otp" type="number" disabled={isActive} id="otp"/>
                                        <ErrorMessage className="text-danger" component="div" name="otp" /> <br />

                                        <label className="form-label" htmlFor="password">password</label>
                                        <Field className="form-control" name="password" type="text" disabled={isActive} id="password" />
                                        <ErrorMessage className="text-danger" component="div" name="password" /> <br />

                                        <button type="submit" className="btn btn-primary">Submit</button> <br />
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