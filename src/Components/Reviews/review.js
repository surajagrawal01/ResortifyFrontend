import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import StarRating from "./Ratings";
import { Card, Row, Col, Form, Button } from "react-bootstrap";
import axios from "axios";
import Swal from "sweetalert2";
export default function Reviews() {
  const [ratings, setRatings] = useState(0);
  const { id, bookingId } = useParams();
  const [description, setDescription] = useState("");
  const [reviewPhotos, setReviewPhotos] = useState([]);
  const [formErrors,setformErrors] = useState({})
  const navigate = useNavigate();
  const photos = new FormData();
  const errors = {}
  const handleRatingChange = (value) => {
    setRatings(value);
  };
  const handleImage = async (files) => {
    for (let i = 0; i < files.length; i++) {
      let file = files[i];
      photos.append("files", file);
    }
    try {
      const response = await axios.post(
        "https://resortifybackend.onrender.com/api/reviewsphotos",
        photos,
        { headers: { Authorization: localStorage.getItem("token") } }
      );
      console.log(response.data);
      setReviewPhotos(response.data);
    } catch (err) {
      alert(err.message);
      console.log(err);
    }
  };
  const validateErrors = ()=>{
    if(ratings === 0){
      errors.ratings ='* provide ratings'
    }else if(description.trim().length === 0){
      errors.description = '* description required'
    }
  }
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    validateErrors()
    if(Object.keys(errors).length === 0){
       const formData = {
      ratings: ratings,
      description: description,
      photos: reviewPhotos,
    };
    try {
      const response = await axios.post(
        `https://resortifybackend.onrender.com/api/users/reviews/${id}?bookingId=${bookingId}`,
        formData,
        { headers: { Authorization: localStorage.getItem("token") } }
      );

      Swal.fire({
        icon: "success",
        title: "Review",
        text: "Thank You for your review😊.",
        showConfirmButton: true,
        timer: 3500,
      });
      navigate("/");
    } catch (err) {
      console.log(err);
    }
    }else{
      setformErrors(errors)
    }
   
  };

  return (
    <div>
      <Card style={{ width: "40rem" }} className="mx-auto my-5 p-3">
        <Card.Title>Add Your Review</Card.Title>
        <Form onSubmit={handleSubmit}>
          <Form.Group>
            <Form.Label>Upload Resort Photos</Form.Label>

            <input
              type="file"
              className="form-control"
              name="file"
              multiple
              onChange={(e) => {
                handleImage(e.target.files);
              }}
            />
            <br />
          </Form.Group>
          {Object.keys(formErrors).length > 0 ? <span style={{color:"red"}}>{formErrors.ratings}</span>:''}
          <Form.Group as={Row} controlId="formRating">
            <Form.Label column sm={2}>
              Rating:
            </Form.Label>
            <Col sm={10}>
              <StarRating onChange={handleRatingChange} />
            </Col>
          </Form.Group>
          {Object.keys(formErrors).length > 0 ? <span style={{color:"red"}}>{formErrors.description}</span>:''}
          <Form.Group as={Row} controlId="formDescription">
            <Form.Label column sm={2}>
              Description:
            </Form.Label>
            <Col sm={10}>
              <Form.Control
                as="textarea"
                value={description}
                placeholder="Add Description"
                onChange={(e) => setDescription(e.target.value)}
              />
            </Col>
          </Form.Group>
          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
      </Card>
    </div>
  );
}
