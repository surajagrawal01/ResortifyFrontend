import Form from "react-bootstrap/Form";
import { useContext, useEffect, useState } from "react";
import { Row, Col, Button, Container, Card } from "react-bootstrap";
import PropertyContext from "../../context/PropertyContext";
import axios from "axios";

// const policies = ["dayOut", "nightOut", "wholeDay"];
const policies = ["wholeDay"];
export default function Policies(props) {
  const { resort, resortDispatch } = useContext(PropertyContext);
  const [checkIn, setCheckIn] = useState({});
  const [select, setSelect] = useState(null);
  const [checkOut, setCheckOut] = useState({});
  const [handleChecked, setHandleChecked] = useState([]);
  const [cancellation, setCancellation] = useState([]);
  const [property, setProperty] = useState([]);
  const [identity, setIdentity] = useState([]);
  // errors to be set
  const [errors, setErrors] = useState({});

  useEffect(() => {
    (async () => {
      try {
        const response = await axios.get(
          "http://localhost:3060/api/static-data"
        );

        setCancellation(
          (localStorage.getItem("cancellation") &&
            JSON.parse(localStorage.getItem("cancellation"))) ||
          response.data.cancellationPolicies
        );
        setProperty(
          (localStorage.getItem("property") &&
            JSON.parse(localStorage.getItem("property"))) ||
          response.data.propertyRules
        );
        setIdentity(
          (localStorage.getItem("identity") &&
            JSON.parse(localStorage.getItem("identity"))) ||
          response.data.IdentityProofs
        );
      } catch (err) {
        console.log(err);
        alert(err.msg);
      }
    })();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const bookingPolicies = {};
    handleChecked.forEach((isSelected, index) => {
      if (isSelected) {
        bookingPolicies[policies[index]] = {
          checkIn: checkIn[index] || "",
          checkOut: checkOut[index] || "",
        };
      }
    });
    localStorage.setItem("bookingPolicies", JSON.stringify(bookingPolicies));
    localStorage.setItem("cancellation", JSON.stringify(cancellation));
    localStorage.setItem("property", JSON.stringify(property));
    localStorage.setItem("identity", JSON.stringify(identity));
    const finaldataCancellation = cancellation
      .filter((ele) => ele.checked)
      .map((ele) => ele.field);
    const finaldataProperty = property
      .filter((ele) => ele.checked)
      .map((ele) => ele.field);
    const finaldataIdentity = identity
      .filter((ele) => ele.checked)
      .map((ele) => ele.field);

    // Update state variables without awaiting

    // Perform error validation
    const newErrors = {};
    if (
      Object.keys(checkIn).length === 0 ||
      Object.keys(checkOut).length === 0
    ) {
      newErrors.checkInOut = "please select booking policy";
    }
    if (finaldataCancellation.length === 0) {
      newErrors.cancellationPolicies =
        "please select at least one cancellation policy";
    }
    if (finaldataProperty.length === 0) {
      newErrors.propertyPolices = "please select at least one property policy";
    }
    if (finaldataIdentity.length === 0) {
      newErrors.identity = "please select at least one identity proof";
    }

    // Check if there are any errors
    if (Object.keys(newErrors).length === 0) {
      // No errors, proceed with form submission
      const propertyRules = {
        guestPolicies: finaldataProperty,
        acceptableIdentityProofs: finaldataIdentity,
      };
      const formData = {
        bookingPolicies,
        cancellationPolicies: finaldataCancellation,
        propertyRules,
      };
      // set localStorage details
      // Dispatch form data and navigate to the next step
      resortDispatch({ type: "ADD_PROPERTY_DETAILS", payload: formData });
      setErrors({});
      props.enablePolicies();
    } else {
      // Errors found, update errors state
      setErrors(newErrors);
    }
  };

  const handleSelect = (index) => {
    //to toggle input of check boxes
    const newSelectedCheckboxes = [...handleChecked];
    newSelectedCheckboxes[index] = !newSelectedCheckboxes[index];
    setSelect((prevIndex) => {
      if (prevIndex !== index) {
        return index;
      } else {
        return null;
      }
    });
    setHandleChecked(newSelectedCheckboxes);
  };

  const handleCancellation = (id, e) => {
    const result = cancellation.map((ele) => {
      if (ele.id === id) {
        return { ...ele, checked: !ele.checked };
      } else {
        return ele;
      }
    });
    setCancellation(result);
  };

  const handleProperty = (id) => {
    const result = property.map((ele) => {
      if (ele.id === id) {
        return { ...ele, checked: !ele.checked };
      } else {
        return ele;
      }
    });

    setProperty(result);
  };

  const handleIds = (id) => {
    const result = identity.map((ele) => {
      if (ele.id === id) {
        return { ...ele, checked: !ele.checked };
      } else {
        return ele;
      }
    });

    setIdentity(result);
  };
  console.log("resort", resort);
  console.log(checkIn, checkOut);
  return (
    <Container fluid>
      <Card
        className="m-auto p-3"
      >
        <div>
          <h3 className="text-decoration-underline">Booking Policies</h3>

          <Form onSubmit={handleSubmit}>
            {policies.map(
              (
                policy,
                index //===================mapping over policies
              ) => (
                <div key={index} className="mb-3">
                  <Form.Check
                    type="checkbox"
                    id={index} //====================================in each child prop should have unique
                    label={policy}
                    checked={handleChecked[index] || false} //==================// sets to true or false by default it should be false
                    onChange={() => handleSelect(index)} //====================// sets to true or false
                  />
                  <Form.Group controlId={`checkIn-${index}`}>
                    <Form.Label>Check In</Form.Label>
                    <div className="col-md-4">
                      <Form.Control
                        type="time"
                        disabled={select !== index}
                        value={checkIn[index] || ""}
                        onChange={(e) => {
                          const newCheckIn = { ...checkIn }; //==================spreads the checkIn to add the value typed
                          newCheckIn[index] = e.target.value; // =================takes the entered value
                          setCheckIn(newCheckIn); //==============================sets the new value
                        }}
                      />
                    </div>
                  </Form.Group>
                  <Form.Group controlId={`checkOut-${index}`}>
                    <Form.Label>Check Out</Form.Label>
                    <div className="col-md-4">
                      <Form.Control
                        type="time"
                        disabled={select !== index}
                        value={checkOut[index] || ""}
                        onChange={(e) => {
                          const newCheckOut = { ...checkOut };
                          newCheckOut[index] = e.target.value;
                          setCheckOut(newCheckOut);
                        }}
                      />
                    </div>
                  </Form.Group>
                </div>
              )
            )}
            {Object.keys(errors).length ? (
              <p style={{ color: "red" }}> {errors.checkInOut}</p>
            ) : (
              ""
            )}
            <Row>
              <Col xs={12} md={4}>
                <h3 className="text-decoration-underline">Cancellation Policy</h3>
                {cancellation.map((ele) => {
                  return (
                    <div className="form-group" key={ele.id} controlId={ele.id}>
                      <input
                        type="checkBox"
                        className="form-check-input mx-1"
                        value={ele.field}
                        checked={ele.checked}
                        onChange={() => {
                          handleCancellation(ele.id);
                        }}
                      />
                      <label className="checkbox-label">{ele.field}</label>
                    </div>
                  );
                })}
                {Object.keys(errors).length ? (
                  <p style={{ color: "red" }}>{errors.cancellationPolicies}</p>
                ) : (
                  ""
                )}
              </Col>
              <Col xs={12} md={4}>
                <h4 className="text-decoration-underline">Guest Policies Rules</h4>
                {
                  <div>
                    {property.map((ele) => {
                      return (
                        <div className="form-group" key={ele.id}>
                          <input
                            type="checkBox"
                            className="form-check-input mx-1"
                            checked={ele.checked}
                            value={ele.field}
                            onChange={() => {
                              handleProperty(ele.id);
                            }}
                          />
                          <label check className="checkbox-label">
                            {ele.field}
                          </label>
                        </div>
                      );
                    })}
                  </div>
                }
                {Object.keys(errors).length ? (
                  <p style={{ color: "red" }}>{errors.propertyPolices}</p>
                ) : (
                  ""
                )}
              </Col>
              <Col xs={12} md={4}>
                <h4 className="text-decoration-underline">Acceptable Identity Proof</h4>
                {
                  <div>
                    {identity.map((ele) => {
                      return (
                        <div className="form-group" key={ele.id}>
                          <input
                            type="checkBox"
                            value={ele.field}
                            checked={ele.checked}
                            onChange={() => {
                              handleIds(ele.id);
                            }}
                            className="form-check-input mx-1"
                          />
                          <label check className="checkbox-label">
                            {ele.field}
                          </label>
                        </div>
                      );
                    })}
                  </div>
                }
                {Object.keys(errors).length ? (
                  <p style={{ color: "red" }}>{errors.identity}</p>
                ) : (
                  ""
                )}
              </Col>
            </Row>
            <button type="submit" className="btn btn-primary offset-9 col-md-2">
              Submit
            </button>
          </Form>
        </div>
      </Card>
    </Container>
  );
}
