import { useParams } from "react-router-dom"
import { useState, useEffect } from "react"
import axios from "axios"
import Example from "./ImageCorsuel"
import Reviews from "./Reviews"
import { Container, Row, Col } from 'react-bootstrap';
import ResortInfo from "./ResortInfo";
import MapLocation from "./MapLocation"
import BookingInfo from "./BookingInfo"
export default function ResortDetail() {

    const { id } = useParams()
    const [resort, setResort] = useState({})

    useEffect(() => {
        (async () => {
            try {
                const response = await axios.get(`http://localhost:3060/api/users/resorts/${id}`)
                setResort(response.data)
            } catch (err) {
                alert(err.message)
                console.log(err)
            }
        })();
    }, [id])

    let propertyPhotos = []
    if (Object.keys(resort).length > 0) {
        let photos = [...resort.property.propertyPhotos]
        for (let i = 0; i < resort.roomTypes.length; i++) {
            photos = [...photos, ...resort.roomTypes[i].photos]
        }

        propertyPhotos = photos.map((ele, i) => {
            return (
                {
                    src: `http://localhost:3060/images/${ele}`,
                    altText: `Property Photo${i}`,
                    caption: 'Photo',
                    key: 1,
                }
            )
        })
    }

    return (
        <>

            {
                Object.keys(resort).length > 0 &&
                <>
                    <Row xs={12} md={8} className="justify-content-center">
                        <Example resortPhotos={propertyPhotos} />
                    </Row>
                    <Row>
                        <Col xs={12} md={7}>
                            <ResortInfo resort={resort} />
                        </Col>
                        <Col xs={12} md={5} className="my-6">
                            <BookingInfo />
                        </Col>
                    </Row>
                    <Container fluid className="mx-4 p-2">
                        <MapLocation resort={resort} />
                        <Reviews resort={resort} />
                    </Container>
                </>
            }
        </>
    )
}