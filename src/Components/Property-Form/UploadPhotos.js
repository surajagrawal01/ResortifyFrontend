import { useContext, useState } from "react";
import axios from "axios";
import { Button } from "react-bootstrap";

import PropertyContext from "../../context/PropertyContext";

export default function UploadPhotos(props) {
  const { resort, resortDispatch } = useContext(PropertyContext);
  const [error, setError] = useState("");
  localStorage.getItem("propertyPhotos") && props.enableUpload();
  const formData = new FormData();

  const handleImage = (files) => {
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      formData.append("files", file);
    }
  };

  console.log(resort);

  const handlePhotos = async (e) => {
    e.preventDefault();
    // Append each selected image to FormData
    try {
      const response = await axios.post(
        "http://localhost:3060/api/propertyphotos",
        formData,
        { headers: { Authorization: localStorage.getItem("token") } }
      );
      console.log(response.data);

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

  console.log(resort);

  return (
    <div>
      <h2>Upload Property Photos</h2>

      <form onSubmit={handlePhotos}>
        <label>Upload Property Photos</label>
        <input
          type="file"
          name="file"
          multiple
          onChange={(e) => {
            handleImage(e.target.files);
          }}
        />
        <br />
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
        <Button className="btn btn-success" type="sumbit">
          {" "}
          Upload
        </Button>
      </form>
    </div>
  );
}
