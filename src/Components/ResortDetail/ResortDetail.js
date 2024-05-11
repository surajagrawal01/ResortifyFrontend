import { useParams, useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import Example from "./ImageCorsuel";
import Reviews from "./Reviews";
import { Container, Row, Col } from "react-bootstrap";
import ResortInfo from "./ResortInfo";
import MapLocation from "./MapLocation";
import BookingInfo from "./BookingInfo";
import { useSelector } from "react-redux";
export default function ResortDetail() {
  //reading searchInfo stored in localStorage
  const searchInfoLocal = JSON.parse(localStorage.getItem("searchInfo"));
  const isLoggedIn = useSelector((state) => {
    return state.isLogIn.isLoggedIn;
  });

  const location = useLocation();
  const navigate = useNavigate();

  const { id } = useParams();
  const searchInfo = Object.fromEntries(
    new URLSearchParams(useLocation().search)
  );

  const [resort, setResort] = useState({});

  //now declaring stte varibale for date so, to allow change in booking time
  const [dateSearchInfo, setDateSearchInfo] = useState({
    checkIn: searchInfo?.checkIn || "",
    checkOut: searchInfo?.checkOut || "",
  });

  const updateDateInfo = (e) => {
    const { name, value } = e.target;
    setDateSearchInfo({ ...dateSearchInfo, [name]: value });
    const updatedSearchInfo = { ...searchInfoLocal, [name]: value };
    //to update the state and simulataneously updating local storage
    localStorage.setItem("searchInfo", JSON.stringify(updatedSearchInfo));
  };

  useEffect(() => {
    (async () => {
      try {
        if (isLoggedIn) {
          const response = await axios.get(
            `https://resortifybackend.onrender.com/api/users/resorts/${id}/recentsearches?checkIn=${dateSearchInfo.checkIn}&checkOut=${dateSearchInfo.checkOut}`,
            {
              headers: {
                Authorization: localStorage.getItem("token"),
              },
            }
          );
          console.log(response.data);
          setResort(response.data);
        } else {
          const response = await axios.get(
            `https://resortifybackend.onrender.com/api/users/resorts/${id}?checkIn=${dateSearchInfo.checkIn}&checkOut=${dateSearchInfo.checkOut}`
          );
          console.log(response.data);
          setResort(response.data);
        }
      } catch (err) {
        alert(err.message);
        console.log(err);
      }
    })();
    //to change the url with the updated checkin and checkout date
    const newurl = `/resort-detail/${id}?location=${searchInfo.location}&checkIn=${dateSearchInfo.checkIn}&checkOut=${dateSearchInfo.checkOut}&adult=${searchInfo.adult}&children=${searchInfo.children}`;
    navigate(newurl);
  }, [id, dateSearchInfo]);

  let propertyPhotos = [];
  if (Object.keys(resort).length > 0) {
    let photos = [...resort.property.propertyPhotos];
    for (let i = 0; i < resort.roomTypes.length; i++) {
      photos = [...photos, ...resort.roomTypes[i].photos];
    }

    propertyPhotos = photos.map((ele, i) => {
      return {
        src: `https://resortifybackend.onrender.com/images/${ele}`,
        altText: `Property Photo${i}`,
        caption: "Photo",
        key: i + 1,
      };
    });
  }

  return (
    <>
      {Object.keys(resort).length > 0 && (
        <>
          <div className="container-fluid">
            <Row xs={12} md={8} className="justify-content-center">
              <Example resortPhotos={propertyPhotos} />
            </Row>
            <Row>
              <Col xs={12} md={7}>
                <ResortInfo resort={resort} />
              </Col>
              <Col xs={12} md={5} className="my-6">
                <BookingInfo
                  searchInfo={searchInfo}
                  dateSearchInfo={dateSearchInfo}
                  updateDateInfo={updateDateInfo}
                />
              </Col>
            </Row>
            <Container fluid>
              <MapLocation resort={resort} />
              <Reviews resort={resort} />
            </Container>
          </div>
        </>
      )}
    </>
  );
}
