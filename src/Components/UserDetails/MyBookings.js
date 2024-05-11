import axios from "axios";
import { useEffect, useState } from "react";
import { Card, Image, Col, Row, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { FaIndianRupeeSign } from "react-icons/fa6";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export default function MyBookings() {
  const [bookings, setBookings] = useState([]);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(0);
  // const [next, setNext] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    (async () => {
      const response = await axios.get(
        `https://resortifybackend.onrender.com/api/users/account?page=${page}&limit=${limit}`,
        { headers: { Authorization: localStorage.getItem("token") } }
      );
      // if (response.data.myBookings < page) {
      //   setNext(true);
      // }
      setBookings(response.data.myBookings);
    })();
  }, [page, limit]);
  const handleReview = (id, bookingId) => {
    console.log(id);
    navigate(`/reviews/${id}/bookings/${bookingId}`);
  };

  // const handleNext = () => {
  //   setPage(page + 1);
  // };
  // const handlePrev = () => {
  //   setPage(page - 1);
  // };
  
  const handleLimit = (e) => {
    setLimit(e.target.value);
    setPage(1);
  };
  
  return (
    <div>
      <div className="m-4">
      <span>Get First:</span> &nbsp;
      <select
        onChange={(e) => {
          handleLimit(e);
        }}
      >
        <option value="0">Set Limit</option>
        <option value="2">2</option>
        <option value="10">5</option>
        <option value="10">10</option>
        <option value="10">20</option>
      </select>
      </div>
      {bookings.map((ele) => {
        return (
          <Card key={ele._id} style={{ margin: "20px" }}>
            <Card.Body>
              <Row>
                <Col md={4}>
                  <Image
                    src={`https://resortifybackend.onrender.com/images/${ele.propertyId.propertyPhotos[0]}`}
                    alt="property-photos"
                    width="100%"
                    height="100%"
                  />
                </Col>
                <Col md={8}>
                  <Row>
                    <Col md={6}>
                      <span style={{ fontWeight: "bold", fontSize: "20px" }}>
                        {ele.propertyId.propertyName}
                      </span>
                    </Col>
                    <Col md={6}>
                      Your Booking Id: &nbsp;
                      <span style={{ fontWeight: "bold" }}>
                        {" "}
                        {ele.bookingId}
                      </span>
                    </Col>
                  </Row>
                  <Row>
                    <Col md={6}>
                      CheckIn : &nbsp;
                      <DatePicker
                        className="calendar-container"
                        selected={ele.Date.checkIn}
                        dateFormat="dd-MM-yyyy"
                        disabled
                      />
                    </Col>{" "}
                    <Col>
                      <div></div>
                      CheckOut : &nbsp;
                      <DatePicker
                        className="calendar-container"
                        selected={ele.Date.checkOut}
                        dateFormat="dd-MM-yyyy"
                        disabled
                      />
                    </Col>
                  </Row>

                  <Row>
                    <p style={{ margin: "10px 0px 10px 0px" }}>
                      Packages Selected:
                    </p>
                    {ele.packages?.map((pack) => {
                      return (
                        <span key={pack._id} style={{ margin: "4px" }}>
                          # {pack.packageName}
                        </span>
                      );
                    })}
                  </Row>
                  <Row>
                    <div style={{ margin: "10px 0px 10px  0px" }}>
                      Total Amount: <FaIndianRupeeSign />
                      <span
                        style={{
                          fontWeight: "bold",
                          fontSize: "25px",
                          margin: "10px",
                        }}
                      >
                        {ele.totalAmount}
                      </span>
                    </div>
                  </Row>
                  <Row>
                    <Col md={3}>
                      <span style={{ textAlign: "right" }}>
                        Payment :{" "}
                        {ele.isPaymentDone === "true" ? (
                          <span style={{ color: "green" }}>Done</span>
                        ) : (
                          <span style={{ color: "orange" }}>Pending</span>
                        )}
                      </span>
                    </Col>
                    <Col md={3}>
                      {" "}
                      Status: &nbsp;
                      <span style={{ fontWeight: "bold" }}>{ele.status} </span>
                    </Col>
                    <Col md={3}>
                      {" "}
                      <span>
                        Check In:
                        {ele.isCheckedIn === "true" ? (
                          <span style={{ fontWeight: "bold", margin: "10px" }}>
                            Yes
                          </span>
                        ) : (
                          <span style={{ fontWeight: "bold", margin: "10px" }}>
                            No
                          </span>
                        )}{" "}
                      </span>
                    </Col>
                    <Col md={3}>
                      <span>
                        Check Out:
                        {ele.isCheckedOut === "true" ? (
                          <span style={{ fontWeight: "bold", margin: "10px" }}>
                            Yes
                          </span>
                        ) : (
                          <span style={{ fontWeight: "bold", margin: "10px" }}>
                            No
                          </span>
                        )}
                      </span>
                      <div style={{ margin: "20px 0px 0px 20px" }}>
                        <Button
                          disabled={
                            (ele.isCheckedOut === "true" ? false : true) ||
                            ele.isReview
                          }
                          onClick={() => {
                            handleReview(ele.propertyId._id, ele.bookingId);
                          }}
                        >
                          Review
                        </Button>
                      </div>
                    </Col>
                  </Row>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        );
      })}
      {/* <Button onClick={handlePrev}>Previous</Button>
      {page} {limit}
      <Button onClick={handleNext} disabled={next}>
        Next
      </Button> */}
    </div>
  );
}
