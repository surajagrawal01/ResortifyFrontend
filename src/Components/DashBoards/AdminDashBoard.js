import axios from "axios";
import DataTable from "react-data-table-component";
import { Button, Card, Row, Col } from "react-bootstrap";
import { Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";

export default function AdminDashboard() {
  const [ownerDetails, setOwnerDetails] = useState([]);
  const [generalDetails, setGeneralDetails] = useState([]);
  const [modal, setModal] = useState(false);
  const [docmodal, setDocModal] = useState(false);
  const [color, setColor] = useState(true);

  const [documents, setDocuments] = useState({});

  const toggle = () => setModal(!modal);
  const toggleDoc = (x) => {
    setDocModal(!docmodal);
    if (Object.keys(documents).length) {
      setDocuments({});
    } else {
      setDocuments(x);
    }
  };
  const [selectedProperty, setSelectedProperty] = useState(null);
  useEffect(() => {
    (async () => {
      try {
        const response = await axios.get(
          "http://127.0.0.1:3060/api/users/resorts"
        );
        const generalModel = await axios.get(
          "http://localhost:3060/api/generalmodel",
          { headers: { Authorization: localStorage.getItem("adminToken") } }
        );
        console.log(response.data);
        setGeneralDetails(generalModel.data);
        setOwnerDetails(response.data);
      } catch (err) {
        console.log(err);
      }
    })();
  }, []);
  useEffect(() => {
    setTimeout(() => {
      setColor(!color);
    }, 1000);
  }, [color]);

  const calcApproved = () => {
    const response = ownerDetails.reduce((acc, cv) => {
      if (cv.isApproved === true) {
        acc += 1;
      }
      return acc;
    }, 0);
    return response;
  };
  const calcUnApproved = () => {
    const response = ownerDetails.reduce((acc, cv) => {
      if (cv.isApproved === false) {
        acc += 1;
      }
      return acc;
    }, 0);
    return response;
  };
  const handleDocuments = (row) => {
    const documents = generalDetails.find((ele) => {
      // if (ele.propertyId) {
      //   return ele.propertyId.ownerId === row.ownerId._id;
      // }
      return ele.propertyId ? ele.propertyId.ownerId === row.ownerId._id : "";
    });

    return documents ? (
      <div>
        {documents.financeAndLegal.typeOfDocument.length}
        <button
          style={{
            margin: "10px",
            border: "1px solid white",
            borderRadius: "8px",
            color: "white",
            backgroundColor: color ? "gray" : "darkgray",
          }}
          onClick={() => {
            toggleDoc(documents);
          }}
        >
          View 👁
        </button>
      </div>
    ) : (
      <span style={{ color: "red" }}>N/A</span>
    );
  };
  const handleClick = (row) => {
    setSelectedProperty(row);
    console.log("selected Row", row);
    toggle();
  };
  const handleApprove = async (property) => {
    if (!property || !property._id) return;
    console.log(property._id);
    const id = property._id;
    const formdata = {};
    try {
      const response = await axios.put(
        `http://localhost:3060/api/admin/propertydetails/${id}`,
        formdata,
        {
          headers: {
            Authorization: localStorage.get("adminToken"),
          },
        }
      );
      console.log(response.data);
      const newArr = ownerDetails.map((ele) => {
        if (ele._id === response.data._id) {
          return { ...ele, isApproved: true };
        } else {
          return ele;
        }
      });
      setOwnerDetails(newArr);
      Swal.fire({
        icon: "success",
        title: "Resort Appoved!",
        text: `Resort ${response.data.propertyName} has been Approved .`,
        showConfirmButton: true,
        timer: 6500,
      });
      toggle();
    } catch (err) {
      console.log(err);
    }
  };
  const handleModal = () => {
    if (!selectedProperty) return null;

    return (
      <div>
        <h4>Property Details</h4>
        <p>Resort Name: {selectedProperty.propertyName}</p>
        <p>
          Owner Details:
          <li>
            Name :{" "}
            {selectedProperty.ownerId.name ? selectedProperty.ownerId.name : ""}
          </li>
          <li>Contact No. : {selectedProperty.ownerId.contactNo}</li>
          <li>
            Email :{" "}
            {selectedProperty.ownerId.email
              ? selectedProperty.ownerId.email
              : ""}
          </li>
        </p>
        <p>
          Location: {selectedProperty.location.locality},{" "}
          {selectedProperty.location.area}, {selectedProperty.location.pincode},{" "}
          {selectedProperty.location.city}, {selectedProperty.location.state}
        </p>
        <p>
          Description:
          {selectedProperty.propertyDescription
            ? selectedProperty.propertyDescription
            : "N/A"}
        </p>
        {/* Render other details as needed */}
      </div>
    );
  };

  const columns = [
    {
      name: "Owner Name",
      selector: (row) => row.ownerId.name,
    },
    {
      name: "Resort Name",
      selector: (row) => row.propertyName,
    },
    {
      name: "Owner Email📧",
      selector: (row) => row.ownerId.email,
    },
    {
      name: "Location📍",
      selector: (row) => `${row.location.city}-${row.location.state}`,
    },
    {
      name: "Status",
      selector: (row) =>
        row.isApproved ? (
          <p
            style={{
              color: "green",
              fontWeight: "bold",
            }}
          >
            Approved
          </p>
        ) : (
          <p
            style={{
              color: "crimson",
              fontWeight: "bold",
            }}
          >
            {" "}
            not Approved
          </p>
        ),
    },
    {
      name: "Documents📜",
      selector: (row) => handleDocuments(row),
    },
    {
      name: "Actions",
      selector: (row) => (
        <Button
          className=" btn btn-secondary"
          onClick={() => {
            handleClick(row);
          }}
        >
          ⚙
        </Button>
      ),
    },
  ];

  return (
    <div>
      <h1 style={{ textAlign: "center" }}>Admin Dashboard</h1>
      <Row>
        <Col md={6}>
          <Card
            style={{ width: "30rem" }}
            className="m-auto p-3"
            border="secondary"
          >
            <Card.Body>
              <Card.Title> Resortify </Card.Title> <hr />
              <h2>
                Total No of Resorts -{" "}
                <span style={{ color: "orangered", fontSize: "50px" }} s>
                  {ownerDetails.length}
                </span>
              </h2>
            </Card.Body>
          </Card>
        </Col>
        <Col md={6}>
          <Card
            style={{ width: "30rem" }}
            className="m-auto p-3"
            border="secondary"
          >
            <Card.Body>
              <Card.Title>Resorts Info</Card.Title> <hr />
              <h4>
                <span
                  style={{
                    color: "green",
                    fontWeight: "bold",
                  }}
                >
                  Approved Resorts {""}
                  <span style={{ fontSize: "50px", marginLeft: "20px" }}>
                    {calcApproved()}
                  </span>
                </span>
              </h4>
              <h4>
                <span
                  style={{
                    color: "red",
                    fontWeight: "bold",
                  }}
                >
                  UnApproved Resorts {calcUnApproved()}
                </span>
              </h4>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <DataTable pagination columns={columns} data={ownerDetails} />
      <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader toggle={toggle}>Resort Details</ModalHeader>
        <ModalBody>{handleModal()}</ModalBody>
        <ModalFooter>
          <Button className="btn btn-danger" onClick={toggle}>
            Reject
          </Button>
          <Button
            className="btn btn-success"
            onClick={() => {
              handleApprove(selectedProperty);
            }}
          >
            Approve
          </Button>{" "}
          <Button className="btn btn-secondary" onClick={toggle}>
            Close
          </Button>
        </ModalFooter>
      </Modal>

      {/* second modal*/}
      <Modal isOpen={docmodal} toggle={toggleDoc}>
        <ModalHeader toggle={toggleDoc}>Documents Details</ModalHeader>
        <ModalBody>
          {Object.keys(documents).length
            ? documents.financeAndLegal.typeOfDocument.map((ele) => {
                const height = `(${
                  100 / documents.financeAndLegal.typeOfDocument.length
                })%`;
                return (
                  <img
                    src={`http://localhost:3060/images/${ele}`}
                    style={{ width: "100%", height: { height } }}
                    alt="documents"
                  />
                );
              })
            : ""}
        </ModalBody>
        <ModalFooter>
          <Button className="btn btn-primary" onClick={toggleDoc}>
            Close
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
}
