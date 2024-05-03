import { Container, Row, Col, Card } from 'react-bootstrap';
import * as Yup from 'yup';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import { useNavigate } from 'react-router-dom'
import { addBooking } from '../actions/bookingAction';
import { useDispatch, useSelector } from "react-redux"
import { clearResortsData } from '../actions/reosrtsDataAction';
import img from "../Images/bg-search1.jpg"
export default function SearchBar() {

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const todayDate = new Date().toISOString().split('T')[0];

    const searchInfo = JSON.parse(localStorage.getItem('searchInfo'));

    const options = [
        { value: 'Bangalore', label: 'Bangalore' },
        { value: 'Coorg', label: 'Coorg' },
        { value: 'Ooty', label: 'Ooty' },
        { value: 'Gokarna', label: 'Gokarna' },
        { value: 'Munnar', label: 'Munnar' },
      ];

    return (
        <>
            <Formik
                initialValues={searchInfo
                    ? {
                        location: searchInfo?.location,
                        checkIn: searchInfo?.checkIn,
                        checkOut: searchInfo?.checkOut,
                        adult: searchInfo?.adult,
                        children: searchInfo?.children
                    } :
                    { location: '', checkIn: '', checkOut: '', adult: '', children: '' }}
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
                })}
                onSubmit={async (values) => {
                    try {
                        dispatch(addBooking(values))
                        dispatch(clearResortsData())
                        localStorage.setItem('searchInfo', JSON.stringify(values))
                        navigate(`/resort-listing?location=${values.location}&checkIn=${values.checkIn}&checkOut=${values.checkOut}&adult=${values.adult}&children=${values.children}`)
                    } catch (err) {
                        alert(err.message)
                        console.log(err)
                    }
                }}
            >
                {({ values }) => (
                    <Container fluid className='search-background d-flex align-items-center dynamic-height' style={{
                        "height": "20rem",
                        "backgroundImage": `url(${img})`,
                        "backgroundSize": "cover",
                        "backgroundPosition": "center",
                        "backgroundRepeat": "no-repeat"
                    }}>
                        <Row className="justify-content-center w-100">
                            <Col xs={12} md={8}>
                                <Card className='p-3 m-4' style={{ minHeight: '12rem', "borderRadius": "30px" }}>
                                    <Card.Body className='row'>
                                        <Form className='row'>
                                            <div className='col-md-2'>
                                                <label className='form-label' htmlFor='location'>Location</label>
                                                <Field className="form-select" as="select" name="location" id="location">
                                                    <option value="" label="Select" />
                                                    {options.map(option => (
                                                        <option key={option.value} value={option.value}>
                                                            {option.label}
                                                        </option>
                                                    ))}
                                                </Field>
                                                <ErrorMessage name="location" component="div" className="text-danger" />
                                                {/* <Field className="form-control" name="location" id="location" list="locations" />
                                                <datalist id="locations">
                                                    <option value="Bangalore" />
                                                </datalist>
                                                <ErrorMessage name="location" component="div" className="text-danger" /> */}
                                            </div>
                                            <div className='col-md-3'>
                                                <label className='form-label' htmlFor='checkIn'>CheckIn</label>
                                                <Field className="form-control" name="checkIn" id="checkIn" type="date" min={todayDate} />
                                                <ErrorMessage className='text-danger' component="div" name='checkIn' />
                                            </div>
                                            <div className='col-md-3'>
                                                <label className='form-label' htmlFor='checkOut'>CheckOut</label>
                                                <Field className="form-control" name="checkOut" id="checkOut" type="date" min={values.checkIn || todayDate} />
                                                <ErrorMessage className='text-danger' component="div" name='checkOut' />
                                            </div>
                                            <div className='col-md-2'>
                                                <label className='form-label' htmlFor='adult'>Adult</label>
                                                <Field className="form-control" name="adult" id="adult" type="number" min={1} />
                                                <ErrorMessage className='text-danger' component="div" name='adult' />
                                            </div>
                                            <div className='col-md-2'>
                                                <label className='form-label' htmlFor='children'>Children</label>
                                                <Field className="form-control" name="children" id="children" type="number" min={0} />
                                                <ErrorMessage className='text-danger' component="div" name='children' />
                                            </div>
                                            <button type='submit' className="btn btn-secondary mt-4" style={{ "width": "100%", background: "#7758A6" }}>Search</button>
                                        </Form>
                                    </Card.Body>
                                </Card>
                            </Col>
                        </Row>
                    </Container>
                )}
            </Formik>
        </>
    )
}