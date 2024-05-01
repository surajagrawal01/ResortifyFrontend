import { Container, Row, Col, Card } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { startResortData } from "../../actions/reosrtsDataAction";
import { useState } from "react";
export default function FilterComponent({ resorts, limit, updatePrice, updateRating, updateOrder, priceVal, order, rating }) {
  const [sort, setSort] = useState("low")
  const dispatch = useDispatch();
  const searchInfo = JSON.parse(localStorage.getItem("searchInfo"));

  const handlePrice = (val) => {
    updatePrice(val)
    const { minPrice, maxPrice } = val;
    const page = 1;
    const ratingVal = rating ? rating : 0;
    dispatch(
      startResortData(
        searchInfo.location,
        limit,
        page,
        order,
        minPrice,
        maxPrice,
        ratingVal
      )
    );
  };

  const handleRating = (val) => {
    updateRating(val);
    const page = 1;
    dispatch(
      startResortData(
        searchInfo.location,
        limit,
        page,
        order,
        priceVal?.minPrice,
        priceVal?.maxPrice,
        val
      )
    );
  };

  const price = [
    { value: "upto 1000", minPrice: 0, maxPrice: 1000 },
    { value: "1001 - 2000", minPrice: 1001, maxPrice: 2000 },
    { value: "2001 - 3000", minPrice: 2001, maxPrice: 3000 },
    { value: "3000+", minPrice: 3001, maxPrice: 3000 },
  ];

  const handleSort = (e) => {
    setSort(e.target.value)
    const order = e.target.value || "low";
    updateOrder(order)
    const page = 1;
    dispatch(
      startResortData(
        searchInfo.location,
        limit,
        page,
        order,
        priceVal?.minPrice,
        priceVal?.maxPrice,
        rating
      )
    );
  };

  return (
    <>
      <Container fluid>
        <Row>
          <Col md={12} className="m-auto">
            <Card className="m-auto p-3 border-0">
              <Card.Body>
                <Card.Title> Filters </Card.Title>
                <Col md={4}>
                  <label>Sort By</label>
                  <select
                    value={sort}
                    onChange={(e) => {
                      handleSort(e);
                    }}
                  >
                    <option value="">Select Price Range</option>
                    <option value="low">Low to High</option>
                    <option value="high">High to Low</option>
                  </select>
                </Col>
                <hr />
                <Card className="border-0">
                  <Card.Title> Price Range </Card.Title>
                  <Card.Body>
                    {price.map((ele, i) => {
                      return (
                        <div key={i}>
                          <input
                            type="radio"
                            name="price"
                            value={ele}
                            id={ele.value}
                            onClick={() => handlePrice(ele)}
                            className="form-check-input border-info"
                          />{" "}
                          &nbsp;
                          <label htmlFor={ele.value}> {ele.value}</label>
                        </div>
                      );
                    })}
                  </Card.Body>
                </Card>{" "}
                <hr />
                <Card className="border-0">
                  <Card.Title> Customer Ratings </Card.Title>
                  <Card.Body>
                    {["4.5", "4", "3.5", "3"].map((ele, i) => {
                      return (
                        <div key={i}>
                          <div key={i}>
                            <input
                              type="radio"
                              name="rating"
                              value={ele}
                              id={ele}
                              onClick={() => handleRating(ele)}
                              className="form-check-input border-info"
                            />{" "}
                            &nbsp;
                            <label htmlFor={ele}> {ele}+ </label>
                          </div>
                        </div>
                      );
                    })}
                  </Card.Body>
                </Card>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
}
