import { useEffect, useState } from "react";
import axios from "axios";
import { Row, Col, Container, Card, Image, Carousel } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import StarRatings from "./StarRatings";
import { format } from "date-fns";
import { FaLocationDot } from "react-icons/fa6";
import { FaIndianRupeeSign } from "react-icons/fa6";
import { useSelector } from "react-redux";

export default function UserRecentSearches() {
  // const [recentResorts, setRecentResorts] = useState([]);
  const navigate = useNavigate();

  const recentResorts = useSelector((state)=>{
    return state.user.user.recentSearches
  })

  // useEffect(() => {
  //   (async () => {
  //     try {
  //       const response = await axios.get(
  //         "http://localhost:3060/api/users/account",
  //         { headers: { Authorization: localStorage.getItem("token") } }
  //       );
  //       console.log(response.data.recentSearches)
  //       setRecentResorts(response.data.recentSearches.reverse());
  //     } catch (err) {
  //       alert(err.msg);
  //       console.log(err);
  //     }
  //   })();
  // }, []);

  // Group recent searches into sets of three
  const groupedResorts = [];
  for (let i = 0; i < recentResorts.length; i += 3) {
    groupedResorts.push(recentResorts.slice(i, i + 3));
  }
  const handleResort = (location, id) => {
    const checkIn = format(new Date(), "yyyy-MM-dd");

    const currentDate = new Date();
    // Add one day to the current date to get tomorrow's date
    currentDate.setDate(currentDate.getDate() + 1);
    const checkOut = format(currentDate, "yyyy-MM-dd");
    navigate(
      `/resort-detail/${id}?location=${location}&checkIn=${checkIn}&checkOut=${checkOut}&adult=${2}&children=${0}`
    );
  };

  return (
    <div>
      <Container fluid>
        {recentResorts.length > 0 && (
          <div>
            <Row>
              <h2 style={{ fontWeight: "bold" }}>Your Recent Searches</h2>
            </Row>
            <Row>
              <div style={{ background: "whitesmoke" }}>
                <Carousel interval={5000}>
                  {groupedResorts?.map((group, i) => (
                    <Carousel.Item key={i}>
                      <Row>
                        {group?.map((ele) => (
                          <Col key={ele._id} className="col-4">
                            <Card
                              style={{
                                transition: "0.3s",
                                position: "relative",
                                width: "25rem",
                                height: "20rem",
                              }}
                              className="my-card"
                              onClick={() => {
                                handleResort(ele.location.city, ele._id);
                              }}
                            >
                              <Card.Body>
                                <Image
                                  style={{
                                    width: "100%",
                                    height: "50%",
                                  }}
                                  src={`http://localhost:3060/images/${ele.propertyPhotos[0]}`}
                                  alt="photo"
                                />
                                <br />

                                <Row>
                                  <h3 style={{ fontWeight: "bold" }}>
                                    {ele.propertyName}
                                  </h3>
                                  <Col className=" col md-4">
                                    <FaLocationDot
                                      style={{ display: "inline" }}
                                    /> 
                                    {ele.location.city}
                                  </Col>
                                  <Col className="col md-8">
                                    <StarRatings rating={ele.rating} />
                                  </Col>
                                </Row>
                                <Col style={{ textAlign: "right" }}>
                                  <span style={{ color: "grey" }}>
                                    Base Price:
                                  </span>
                                  <span
                                    style={{
                                      fontWeight: "bold",
                                      fontSize: "25px",
                                    }}
                                  >
                                    <FaIndianRupeeSign /> {ele.basePrice}
                                  </span>
                                </Col>
                              </Card.Body>
                            </Card>
                          </Col>
                        ))}
                      </Row>
                    </Carousel.Item>
                  ))}
                </Carousel>
              </div>
            </Row>
          </div>
        )}
      </Container>
    </div>
  );
}
