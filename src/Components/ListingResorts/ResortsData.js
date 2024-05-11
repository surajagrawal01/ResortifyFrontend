import { Container, Row, Col, Card } from "react-bootstrap";
import { FaStar, FaIndianRupeeSign } from "react-icons/fa6";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa6";
import { useDispatch } from "react-redux";
import { startResortData } from "../../actions/reosrtsDataAction";
export default function ResortsData({ resorts, limit, order, priceVal, rating }) {
  const naviagte = useNavigate();

  const dispatch = useDispatch();
  
  const searchInfo = Object.fromEntries(
    new URLSearchParams(useLocation().search)
  );

  const ratingsStar = (rate) => {
    const rating = [];
    for (let i = 1; i <= rate; i++) {
      rating.push(<FaStar />);
    }
    return rating;
  };

  const handleNext = () => {
    dispatch(startResortData(searchInfo.location, limit, resorts.pageNo + 1, order,
      priceVal?.minPrice,
      priceVal?.maxPrice,
      rating));
  };

  const handlePrev = () => {
    dispatch(startResortData(searchInfo.location, limit, resorts.pageNo - 1, order,
      priceVal?.minPrice,
      priceVal?.maxPrice,
      rating));
  };

  const handleClick = (id) => {
    localStorage.setItem("resortId", id);
    naviagte(
      `/resort-detail/${id}?location=${searchInfo.location}&checkIn=${searchInfo.checkIn}&checkOut=${searchInfo.checkOut}&adult=${searchInfo.adult}&children=${searchInfo.children}`
    );
  };

  return (
    <>
      <Container fluid>
        <Row>
          <Col md={12} className="m-auto">
            <Card className="m-auto p-3 border-0 border-start">
              <Card.Body>
                <Card.Title>
                  {" "}
                  ## {resorts.totalRecords}+ stay in this area{" "}
                </Card.Title>

                <hr />

                {resorts.data.map((ele) => {
                  return (
                    <Card
                      className="m-auto p-3 row border-bottom border-0"
                      key={ele._id}
                      onClick={() => {
                        handleClick(ele._id);
                      }}
                    >
                      <Row>
                        <Col md={3}>
                          <img
                            src={`https://resortifybackend.onrender.com/images/${ele.propertyPhotos[0]}`}
                            className="img-fluid"
                            alt="Logo"
                          />
                        </Col>
                        <Col md={9}>
                          <div>
                            <Card.Title>
                              {ele.propertyName}
                              <div className="fst-italic fs-6 fw-light">
                                {ele.location.houseNumber},{" "}
                                {ele.location.locality}, {ele.location.area},{" "}
                                {ele.location.city}
                              </div>
                            </Card.Title>
                            <Card.Body>
                              {ele.propertyAmenities.map((ele) => {
                                return (
                                  <span key={ele._id}>#{ele.name} &nbsp;</span>
                                );
                              })}{" "}
                              <br />
                              <br />
                              <h1>
                                <FaIndianRupeeSign />
                                {ele.basePrice}
                              </h1>
                              <Row>
                                <Col md={4}>{ratingsStar(ele.rating)}</Col>
                                <Col
                                  md={8}
                                  className="d-flex justify-content-end"
                                >
                                  <button
                                    className="btn btn-primary me-2"
                                    onClick={() => {
                                      handleClick(ele._id);
                                    }}
                                  >
                                    View{" "}
                                  </button>
                                  <button
                                    className="btn btn-primary"
                                    onClick={() => {
                                      handleClick(ele._id);
                                    }}
                                  >
                                    Book
                                  </button>
                                </Col>
                              </Row>
                            </Card.Body>
                          </div>
                        </Col>
                      </Row>
                    </Card>
                  );
                })}
              </Card.Body>
              <div className="row">
                <div className="col-2">
                  <button
                    className="btn btn-primary"
                    disabled={resorts.pageNo === 1}
                    onClick={handlePrev}
                  >
                    <FaArrowLeft /> Previous{" "}
                  </button>
                </div>
                <div className="offset-4 col-2">{resorts.pageNo}</div>
                <div className="offset-2 col-2">
                  <button
                    className="btn btn-primary"
                    onClick={handleNext}
                    disabled={resorts.totalPages === resorts.pageNo}
                  >
                    {" "}
                    Next <FaArrowRight />{" "}
                  </button>
                </div>
              </div>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
}
