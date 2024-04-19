import { Row, Col, Button } from "react-bootstrap";
import { useContext, useState } from "react";
import axios from "axios";

import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import PropertyContext from "../../context/PropertyContext";
export default function RoomDetails(props) {
  const { resort, resortDispatch } = useContext(PropertyContext);
  const [dateError, setDateError] = useState("");
  const [error, setError] = useState("");

  const formData1 = new FormData();
  localStorage.getItem("roomDetails") && props.enableRoomDetails();
  const handleRoomPhotos = (files) => {
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      formData1.append("files", file);
    }
  };
  console.log(resort);
  const validateRooms = (totalRooms) => {
    return Yup.number()
      .required("Required")
      .min(1, "Please enter at least one room");
  };
  const validateDate = () => {
    return Yup.date()
      .required("Required")
      .min(new Date(), `End date less than today's date`);
  };
  console.log(JSON.parse(localStorage.getItem("roomDetails")));
  return (
    <div>
      <h2>Room Amenities</h2>

      <Formik
        initialValues={{
          NumberOfRooms:
            (localStorage.getItem("roomDetails") &&
              JSON.parse(localStorage.getItem("roomDetails"))[0]
                ?.NumberOfRooms) ||
            "",
          roomType:
            (localStorage.getItem("roomDetails") &&
              JSON.parse(localStorage.getItem("roomDetails"))[0]?.roomType) ||
            "",
          roomDescription:
            (localStorage.getItem("roomDetails") &&
              JSON.parse(localStorage.getItem("roomDetails"))[0]
                ?.roomDescription) ||
            "",
          smokingAllowed:
            (localStorage.getItem("roomDetails") &&
              JSON.parse(localStorage.getItem("roomDetails"))[0]
                ?.smokingAllowed) ||
            "false",
          extraBed:
            (localStorage.getItem("roomDetails") &&
              JSON.parse(localStorage.getItem("roomDetails"))[0]?.extraBed) ||
            "false",
          baseRoomPrice:
            (localStorage.getItem("roomDetails") &&
              JSON.parse(localStorage.getItem("roomDetails"))[0]
                ?.baseRoomPrice) ||
            "",
          adult:
            (localStorage.getItem("roomDetails") &&
              JSON.parse(localStorage.getItem("roomDetails"))[0]?.roomOcupancy
                .adult) ||
            "",
          children:
            (localStorage.getItem("roomDetails") &&
              JSON.parse(localStorage.getItem("roomDetails"))[0]?.roomOcupancy
                .children) ||
            "",
          startDate:
            (localStorage.getItem("roomDetails") &&
              JSON.parse(localStorage.getItem("roomDetails"))[0]?.availability
                .startDate) ||
            "",
          endDate:
            (localStorage.getItem("roomDetails") &&
              JSON.parse(localStorage.getItem("roomDetails"))[0]?.availability
                .endDate) ||
            "",
          checked:
            (localStorage.getItem("roomDetails") &&
              JSON.parse(localStorage.getItem("roomDetails"))[0]
                ?.roomAmentities) ||
            [],
        }}
        validationSchema={Yup.object({
          // NumberOfRooms: Yup.number()
          //   .min(1,'please enter atleast one room')
          //   .required('Required'),
          NumberOfRooms: validateRooms(resort.propertyData.totalRooms),
          roomType: Yup.string()
            .max(500, "please enter room type")
            .required("Required"),
          roomDescription: Yup.string().required(
            "room description is required"
          ),
          smokingAllowed: Yup.boolean(),
          extraBed: Yup.boolean(),
          baseRoomPrice: Yup.number().required("please enter the price"),
          adult: Yup.number()
            .min(1, "should be greater than 0")
            .required("number of adult required"),
          startDate: Yup.date().required("enter the start date"),
          endDate: validateDate(),
          checked: Yup.array().min(
            1,
            "Please select at least one room amenity"
          ),
        })}
        onSubmit={async (values) => {
          const response2 = await axios.post(
            "http://localhost:3060/api/roomphotos",
            formData1
          );
          console.log(response2.data);
          // localStorage.setItem("roomId", response2.data);
          if (
            response2.data.length === 0 &&
            localStorage.getItem("roomDetails")
          ) {
            setError("upload atleast one photo");
          } else {
            const roomTypesData = {
              NumberOfRooms: values.NumberOfRooms,
              roomType: values.roomType,
              roomDescription: values.roomDescription,
              roomOcupancy: {
                adult: values.adult,
                children: values.children,
              },
              smokingAllowed: values.smokingAllowed === "true" ? true : false,
              extraBed: values.extraBed === "true" ? true : false,
              baseRoomPrice: values.baseRoomPrice,
              availability: {
                startDate: values.startDate,
                endDate: values.endDate,
              },
              roomAmentities: values.checked,
              photos: response2.data,
            };

            if (values.startDate === values.endDate) {
              setDateError("start and end Date cannot be same");
            } else {
              setDateError("");
              const roomsAlreadyAdded = resort.roomTypes.reduce((acc, cv) => {
                console.log(cv, cv[0].NumberOfRooms, cv.roomType);
                return acc + cv[0].NumberOfRooms * 1;
              }, 0);

              let roomstotal = roomsAlreadyAdded + values.NumberOfRooms;

              if (
                roomstotal <= resort.propertyData.totalRooms &&
                localStorage.getItem("roomDetails")
              ) {
                try {
                  const response2 = await axios.put(
                    `http://localhost:3060/api/owners/propertydetails/rooms/${localStorage.getItem(
                      "roomId"
                    )}`,
                    roomTypesData,
                    {
                      headers: { Authorization: localStorage.getItem("token") },
                    }
                  );
                  console.log("update", response2.data);
                  localStorage.setItem(
                    "roomDetails",
                    JSON.stringify(response2.data)
                  );
                  localStorage.setItem("roomId", response2.data._id);
                } catch (err) {
                  console.log(err);
                }
              } else if (roomstotal <= resort.propertyData.totalRooms) {
                try {
                  const response = await axios.post(
                    "http://127.0.0.1:3060/api/owners/propertydetails/roomtypemodel",
                    roomTypesData,
                    {
                      headers: { Authorization: localStorage.getItem("token") },
                    }
                  );
                  console.log("create room type", response.data);
                  const formdata = JSON.stringify(roomTypesData);
                  localStorage.setItem("roomDetails", formdata);
                  localStorage.setItem("roomId", response.data._id);
                } catch (err) {
                  console.log(err);
                }
                resortDispatch({
                  type: "ADD_ROOM_DETAILS",
                  payload: roomTypesData,
                });
                props.enableRoomDetails();
              } else {
                console.log("error");
                alert(
                  "number of rooms not matching with total rooms of property"
                );
              }
            }
          }

          //for validation

          // console.log({roomTypesData})
          // const formdata = {roomTypesData:roomTypesData}
        }}
      >
        <Form>
          <Row>
            <Col>
              <Field
                name="NumberOfRooms"
                type="number"
                placeholder="Number of rooms"
              />
              <span style={{ color: "red" }}>
                <ErrorMessage name="NumberOfRooms" />
              </span>

              {/* <ErrorMessage name="roomTypes" /> */}
            </Col>
          </Row>
          <Row>
            <Col>
              <Field
                name="roomType"
                type="text"
                placeholder="room Type : basic/standard/delux "
              />
              <span style={{ color: "red" }}>
                {" "}
                <ErrorMessage name="roomType" />
              </span>
            </Col>
            <Col>
              <Field name="baseRoomPrice" type="number" placeholder="price" />
              <span style={{ color: "red" }}>
                <ErrorMessage name="baseRoomPrice" />
              </span>
            </Col>
          </Row>
          <Row>
            <Field
              name="roomDescription"
              type="text"
              placeholder="room description"
            />
            <span style={{ color: "red" }}>
              <ErrorMessage name="roomDescription" />{" "}
            </span>
          </Row>
          <div role="group" aria-labelledby="my-radio-group">
            <label>Smoking Allowed</label>
            <label>
              <Field type="radio" name="smokingAllowed" value="true" />
              yes
            </label>
            <label>
              <Field type="radio" name="smokingAllowed" value="false" />
              no
            </label>{" "}
            <ErrorMessage name="smokingAllowed" />
          </div>
          <div role="group" aria-labelledby="my-radio-group">
            <label>Extra Bed</label>
            <label>
              <Field type="radio" name="extraBed" value="true" />
              yes
            </label>
            <label>
              <Field type="radio" name="extraBed" value="false" />
              no
            </label>
            <ErrorMessage name="extraBed" />
          </div>
          <h2>Room Occupancy</h2>
          {/* backend validations are remaining and change the names of Schemas of room types and rooms */}
          <Row>
            <Col>
              <Field name="adult" type="number" placeholder="number of adult" />
              <span style={{ color: "red" }}>
                <ErrorMessage name="adult" />
              </span>
            </Col>
            <Col>
              <Field
                name="children"
                type="number"
                placeholder="number of children"
              />
            </Col>
          </Row>
          <h2>Availability</h2>
          <Row>
            <Col>
              <label>Start Date</label>
              <Field name="startDate" type="date" />
              <span style={{ color: "red" }}>
                {" "}
                <ErrorMessage name="startDate" />
              </span>
            </Col>
            <Col>
              <label>End Date</label>
              <Field name="endDate" type="date" />
              <span style={{ color: "red" }}>
                <ErrorMessage name="endDate" />{" "}
              </span>
            </Col>
            {dateError.length > 0 ? (
              <span style={{ color: "red" }}>{dateError}</span>
            ) : (
              ""
            )}
          </Row>
          <h2>Room Amenities</h2>
          {resort.amenities
            .filter((ele) => {
              return ele.type === "room";
            })
            .map((ele) => {
              return (
                <div key={ele._id}>
                  <label>
                    <Field type="checkbox" name="checked" value={ele._id} />
                    {ele.name}
                  </label>
                </div>
              );
            })}{" "}
          <span style={{ color: "red" }}>
            <ErrorMessage name="checked" />
          </span>
          <br />
          <label>Upload Room Photos</label>
          <input
            type="file"
            name="file"
            multiple
            onChange={(e) => {
              handleRoomPhotos(e.target.files);
            }}
          />
          <div>
            {localStorage.getItem("roomDetails") &&
              JSON.parse(localStorage.getItem("roomDetails"))[0]?.photos.map(
                (ele, i) => {
                  return (
                    <img
                      key={i}
                      src={`http://localhost:3060/images/${ele}`}
                      style={{ width: "25%", height: "25%", margin: "20px" }}
                      alt="documents"
                    />
                  );
                }
              )}
          </div>
          <br />
          {error.length ? <p style={{ color: "red" }}>{error}</p> : ""}
          <br />
          <Button type="submit">Submit</Button>
        </Form>
      </Formik>
    </div>
  );
}
