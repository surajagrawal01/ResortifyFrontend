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

  const recentResorts = useSelector((state) => {
    return state.user.user.recentSearches
  })

  const [groupedResorts, setGroupedResorts] = useState([]);

  useEffect(() => {
    function updateGroupedResorts() {
      const screenWidth = window.innerWidth;
      let resortsPerGroup;
      if (screenWidth < 768) {
          resortsPerGroup = 1;
      } else if (screenWidth < 992) {
          resortsPerGroup = 2;
      } else {
          resortsPerGroup = 3;
      }

      const newGroupedResorts = [];
      for (let i = 0; i < recentResorts.length; i += resortsPerGroup) {
          newGroupedResorts.push(recentResorts.slice(i, i + resortsPerGroup));
      }
      setGroupedResorts(newGroupedResorts);
    }

    // Initial setup
    updateGroupedResorts();

    // Listen for window resize events
    window.addEventListener("resize", updateGroupedResorts);

    // Cleanup
    return () => {
      window.removeEventListener("resize", updateGroupedResorts);
    };
  }, [recentResorts]); // Re-run effect when recentResorts changes

  // useEffect(() => {
  //   (async () => {
  //     try {
  //       const response = await axios.get(
  //         "https://resortifybackend.onrender.com/api/users/account",
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

  // const groupedResorts = [];
  // const screenWidth = window.innerWidth;

  // // Define the number of resorts per group based on screen width
  // let resortsPerGroup;
  // if (screenWidth < 768) {
  //   resortsPerGroup = 1; // Adjust based on your requirements
  // } else if (screenWidth < 992) {
  //   resortsPerGroup = 2; // Adjust based on your requirements
  // } else {
  //   resortsPerGroup = 3; // Default grouping for larger screens
  // }

  // for (let i = 0; i < recentResorts.length; i += resortsPerGroup) {
  //   groupedResorts.push(recentResorts.slice(i, i + resortsPerGroup));
  // }

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

  const handleImageError = (event,ele) => {
    event.target.src = ele;
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
                                  src={`https://resortifybackend.onrender.com/images/${ele.propertyPhotos[0]}`}
                                  onError={(e) => { handleImageError(e,ele.propertyPhotos[0])}}
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
                                <Col className="mx-4" style={{ textAlign: "right" }}>
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
