import { useContext, useState } from "react";
import axios from "axios";
import { Button } from "react-bootstrap";

import PropertyContext from "../../context/PropertyContext";

export default function UploadPhotos(props) {
  const {  resortDispatch } = useContext(PropertyContext);
  const [error, setError] = useState("");
  localStorage.getItem("propertyPhotos") && props.enableUpload();
  const formData = new FormData();
 
  const handleImage = (files) => {
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      formData.append("files", file);
    }
  };


  const handlePhotos = async (e) => {
    e.preventDefault();
    
    try {
      const response = await axios.post(
        "http://localhost:3060/api/propertyphotos",
        formData,
        { headers: { Authorization: localStorage.getItem("token") } }
      );
      

      if (response.data.propertyPhotos.length === 0) {
        setError("please atleast one photo");
      } else {
        setError("");
        const form = {
          propertyPhotos: response.data.propertyPhotos,
        };
        const photos = JSON.stringify(form);
        localStorage.setItem("propertyPhotos", photos);
        resortDispatch({ type: "ADD_PROPERTY_DETAILS", payload: form });
        resortDispatch({ type: "ADD_FORM" });
        props.enableUpload();
      }
    } catch (err) {
      console.log(err);
    }
  };

 

  return (
    <div>
      <h2 className="text-decoration-underline m-2">Upload Property Photos</h2>

      <form onSubmit={handlePhotos}>
        <label className="form-label m-2">Upload Property Photos</label>
        <div className="col-md-6">
          <input
            className="form-control m-2 col-md-8"
            type="file"
            name="file"
            multiple
            onChange={(e) => {
              handleImage(e.target.files);
            }}
          />
        </div>
        {error.length ? <span style={{ color: "red" }}>{error}</span> : ""}
        <div>
          {localStorage.getItem("propertyPhotos") &&
            JSON.parse(
              localStorage.getItem("propertyPhotos")
            ).propertyPhotos.map((ele, i) => {
              return (
                <img
                  key={i}
                  src={`http://localhost:3060/images/${ele}`}
                  style={{ width: "25%", height: "25%", margin: "20px" }}
                  alt="documents"
                />
              );
            })}
        </div>
        <br />
        <Button className="btn btn-success offset-9 offset-md-4 col-2" type="sumbit">
          {" "}
          Upload
        </Button>
      </form>
    </div>
  );
}
