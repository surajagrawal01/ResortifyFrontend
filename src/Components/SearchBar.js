import axios from 'axios'
import { Container, Row, Col, Card } from 'react-bootstrap';
import * as Yup from 'yup';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import { useNavigate } from 'react-router-dom'
import { addBooking } from '../actions/bookingAction';
import { useDispatch, useSelector } from "react-redux"
export default function SearchBar() {

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const searchData = useSelector((state) => {
        return state.booking.booking
    })

    return (
        <>
            <Formik
                initialValues={Object.keys(searchData).length > 0 
                    ? { 
                        location: searchData.location, 
                        checkIn: searchData.checkIn, 
                        checkOut: searchData.checkOut, 
                        adult: searchData.adult, 
                        children: searchData.children, 
                        bookingCategory: searchData.bookingCategory } : 
                    { location: '', checkIn: '', checkOut: '', adult: '', children: '', bookingCategory: '' }}
                validationSchema={Yup.object({
                    location: Yup.string()
                        .required('Required'),
                    checkIn: Yup.date()
                        .min(today, 'Not Less than today date')
                        .required('Required'),
                    checkOut: Yup.date()
                        .min(Yup.ref('checkIn'), 'Should Not be less than checkIn date')
                        .required('Required'),
                    adult: Yup.number()
                        .min(1, 'Should not be less than zero')
                        .required('Required'),
                    children: Yup.number()
                        .min(0, 'Should not be less than zero')
                        .required('Required'),
                    bookingCategory: Yup.string()
                        .required('Required')
                })}
                onSubmit={async (values) => {
                    // const formData = {
                    //     bookingCategory: values.bookingCategory,
                    //     guests:{
                    //         adult:values.adult,
                    //         children:values.children
                    //     },
                    //     Date:{
                    //         checkIn:values.checkIn,
                    //         checkOut:values.checkOut
                    //     }
                    // }
                    try {
                        dispatch(addBooking(values))
                        const response = await axios.get(`http://localhost:3060/api/properties/lists?city=${values.location}`)
                        console.log(response.data)
                        localStorage.setItem('resorts', JSON.stringify(response.data))
                        navigate("/resort-listing")
                    } catch (err) {
                        alert(err.message)
                        console.log(err)
                    }
                }}
            >
                <>
                    <Container fluid className='search-background d-flex align-items-center dynamic-height' style={{ "height": "15rem" }}>
                        <Row className="justify-content-center w-100">
                            <Col xs={12} md={8}>
                                <Card className='p-3 m-4' border="primary" style={{ minHeight: '8rem', "borderRadius": "30px" }}>
                                    <Card.Body className='row'>
                                        <Form className='row'>
                                            <div className='col-md-2'>
                                                <label className='form-label' htmlFor='location'>Location</label>
                                                <Field className="form-control" name="location" id="location" list="locations" />
                                                <datalist id="locations">
                                                    <option value="Bangalore" />
                                                </datalist>
                                            </div>
                                            <div className='col-md-2'>
                                                <label className='form-label' htmlFor='checkIn'>CheckIn</label>
                                                <Field className="form-control" name="checkIn" id="checkIn" type="date" />
                                                <ErrorMessage className='text-danger' component="div" name='checkIn' />
                                            </div>
                                            <div className='col-md-2'>
                                                <label className='form-label' htmlFor='checkOut'>CheckOut</label>
                                                <Field className="form-control" name="checkOut" id="checkOut" type="date" />
                                                <ErrorMessage className='text-danger' component="div" name='checkOut' />
                                            </div>
                                            <div className='col-md-2'>
                                                <label className='form-label' htmlFor='adult'>Adult</label>
                                                <Field className="form-control" name="adult" id="adult" type="number" />
                                                <ErrorMessage className='text-danger' component="div" name='adult' />
                                            </div>
                                            <div className='col-md-2'>
                                                <label className='form-label' htmlFor='children'>Children</label>
                                                <Field className="form-control" name="children" id="children" type="number" />
                                                <ErrorMessage className='text-danger' component="div" name='children' />
                                            </div>
                                            <div className='col-md-2'>
                                                <label htmlFor="bookingCategory" className='form-label'>Select Trip Type:</label>
                                                <Field as="select" name="bookingCategory" className="form-select">
                                                    <option value="">Select</option>
                                                    <option value="Day-Out">Day Out</option>
                                                    <option value="Night-Out">Night Out</option>
                                                    <option value="Whole-Day">Full day</option>
                                                </Field>
                                                <ErrorMessage name="bookingCategory" component="div" className="text-danger" />
                                            </div>
                                            <button type='submit' className="btn btn-secondary mt-4" style={{ "width": "100%" }}>Search</button>
                                        </Form>
                                    </Card.Body>
                                </Card>
                            </Col>
                        </Row>
                    </Container>
                </>
            </Formik>

        </>
    )
}