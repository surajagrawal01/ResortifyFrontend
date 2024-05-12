import { useState, useContext } from "react";
import PropertyContext from "../../context/PropertyContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Form } from "react-bootstrap";
import Swal from "sweetalert2";
export default function FinanceAndLegal() {
  const { resort, resortDispatch } = useContext(PropertyContext);
  const navigate = useNavigate();
  const [ownerShip, setOwnerShip] = useState("");
  const [error, setError] = useState("");
  const [verify, setVerify] = useState(false);
  const [upload, setUpload] = useState(false);
  const [errors, setErrors] = useState({});
  const [bankingDetails, setBankingDetails] = useState({
    bankingAccountNumber: "",
    reEnterBankAccount: "",
    IFSCCode: "",
    gstIN: "",
    panNo: "",
  });
  const newErrors = {};
  const formData = new FormData();
  const validateErrors = () => {
    if (ownerShip.length === 0) {
      newErrors.ownerShip = "Please select the ownerShip";
    }
    if (
      bankingDetails.bankingAccountNumber !== bankingDetails.reEnterBankAccount
    ) {
      newErrors.reEnterBankAccount = "check your Bank Account Number";
    }
    if (
      bankingDetails.bankingAccountNumber.length < 9 ||
      bankingDetails.bankingAccountNumber.length > 18
    ) {
      newErrors.bankingAccountNumber = "Enter Valid Bank Account Number";
    }
    if (bankingDetails.IFSCCode.length !== 11) {
      newErrors.IFSCCode = "Enter Valid IFSC code";
    }
    if (bankingDetails.gstIN.length !== 15) {
      newErrors.gstIN = "Enter Valid GSTIN";
    }
    if (bankingDetails.panNo.length !== 10) {
      newErrors.panNo = "Enter Valid Pan Number";
    }
  };
  const handleDocs = (files) => {
    for (let i = 0; i < files.length; i++) {
      formData.append("files", files[i]);
    }
  };
  const handlePhotos = async (e) => {
    e.preventDefault();
    console.log(ownerShip);
    // localStorage -- then make a put request else post
    const result = await axios.post(
      "https://resortifybackend.onrender.com/api/documentsphotos",
      formData
    );
    
    const formdata = {
      financeAndLegal: {
        typeOfOwnership: ownerShip,
        typeOfDocument: result.data,
      },
    };
    if (result.data.length === 0) {
      setError("please add photos");
    } else {
      setUpload(true);
      setError("");
      resortDispatch({ type: "ADD_PROPERTY_DETAILS", payload: formdata });
    }
    validateErrors();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    validateErrors();
    if (Object.keys(newErrors).length === 0) {
      try {
        // const formdata ={
        //     bankingDetails:bankingDetails
        // }
        // console.log(formdata)
        //  resortDispatch({type:'ADD_PROPERTY_DETAILS',payload:formdata})
        const form = {
          bookingPolicies: resort.propertyData.bookingPolicies,
          cancellationPolicies: resort.propertyData.cancellationPolicies,
          propertyRules: resort.propertyData.propertyRules,
          financeAndLegal: resort.propertyData.financeAndLegal,
          bankingDetails: bankingDetails,
        };
        console.log(form);
        localStorage.setItem("financeAndLegal", JSON.stringify(form));

        const response = await axios.post(
          "http://127.0.0.1:3060/api/owners/propertydetails/generalModel",
          form,
          {
            headers: {
              Authorization: localStorage.getItem("token"),
            },
          }
        );
        setErrors("");
        Swal.fire({
          icon: "success",
          title: "Welcome Aboard!",
          text: "Your resort has been successfully registered.",
          showConfirmButton: true,
          timer: 3500,
        });
        localStorage.removeItem("propertyDetails");
        localStorage.removeItem("roomDetails");
        localStorage.removeItem("roomId");
        localStorage.removeItem("_id");
        localStorage.removeItem("bookingPolicies");
        localStorage.removeItem("cancellation");
        localStorage.removeItem("financeAndLegal");
        localStorage.removeItem("identity");
        localStorage.removeItem("propertyPhotos");
        localStorage.removeItem("property");
        localStorage.removeItem("resortId");
        localStorage.removeItem("roomPhotos");
        navigate("/owner-dashobard");
      } catch (err) {
        console.log(err);
      }
    } else {
      setErrors(newErrors);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBankingDetails({ ...bankingDetails, [name]: value });
  };
  console.log(resort);
  return (
    <div className="m-3">
      <h2 className="text-decoration-underline">Finance And Legal</h2>
      <div className="col-md-4 my-2">
        <h4>Type Of OwnerShip : </h4>
        <select
          value={ownerShip}
          onChange={(e) => {
            setOwnerShip(e.target.value);
          }}
          className="form-select "
        >
          <option value="">Select OwnerShip </option>
          <option value="My Property">My Property</option>
          <option value="spouse property">Spouse Property</option>
          <option value="Lease agreement">Lease agreement</option>
        </select>
      </div>
      {Object.keys(errors).length !== 0 ? (
        <p style={{ color: "red" }}>{errors.ownerShip}</p>
      ) : (
        ""
      )}
      <h4 className="my-2">Upload Documents</h4>
      <p>Like : Property documents,IdentityProofs</p>
      <form onSubmit={handlePhotos}>
        <Form.Group
          controlId="formFileMultiple"
          className="mb-3"
          name="documents"
        >
          <div className="col-md-4">
            <Form.Control
              type="file"
              name="files"
              onChange={(e) => {
                handleDocs(e.target.files);
              }}
              multiple
            />
          </div>
        </Form.Group>
        {Object.keys(error).length !== 0 ? (
          <p style={{ color: "red" }}>{error}</p>
        ) : (
          ""
        )}
        <button className="btn btn-success offset-9 offset-md-2 col-md-2" type="submit">
          Upload
        </button>
      </form>

      {upload && (
        <div>
          <h4 className="text-decoration-underline">Banking Details</h4>
          <form>
            <div className="form-group">
              <div className="row">
                <div className="col-md-5 my-1">
                  <input
                    type="text"
                    name="bankingAccountNumber"
                    value={bankingDetails.bankingAccountNumber}
                    onChange={handleChange}
                    className="form-control"
                    placeholder="Bank Account Number"
                  />
                  {Object.keys(errors).length > 0 ? (
                    <p style={{ color: "red" }}>{errors.bankingAccountNumber}</p>
                  ) : (
                    ""
                  )}
                </div>
                <div className="col-md-5 my-1">
                  <input
                    type="text"
                    name="reEnterBankAccount"
                    value={bankingDetails.reEnterBankAccount}
                    onChange={handleChange}
                    className="form-control"
                    placeholder="Re-enter Bank Account Number"
                  />

                  {Object.keys(errors).length > 0 ? (
                    <p style={{ color: "red" }}>{errors.reEnterBankAccount}</p>
                  ) : (
                    ""
                  )}
                </div>
              </div>
              <div className="row">
                <div className="col-md-5 my-1">
                  <input
                    type="text"
                    name="IFSCCode"
                    value={bankingDetails.IFSCCode}
                    onChange={handleChange}
                    placeholder="IFSC Code"
                    className="form-control"
                  />
                  {Object.keys(errors).length > 0 ? (
                    <p style={{ color: "red" }}>{errors.IFSCCode}</p>
                  ) : (
                    ""
                  )}
                </div>
                <div className="col-md-5 my-1">
                  <input
                    type="text"
                    name="gstIN"
                    value={bankingDetails.gstIN}
                    onChange={handleChange}
                    className="form-control"
                    placeholder="GSTIN Number"
                  />
                  {Object.keys(errors).length > 0 ? (
                    <p style={{ color: "red" }}>{errors.gstIN}</p>
                  ) : (
                    ""
                  )}
                </div>
              </div>
              <div className="col-md-5 my-1">
                <input
                  type="text"
                  name="panNo"
                  value={bankingDetails.panNo}
                  onChange={handleChange}
                  className="form-control"
                  placeholder="PAN Number"
                />
                {Object.keys(errors).length > 0 ? (
                  <p style={{ color: "red" }}>{errors.panNo}</p>
                ) : (
                  ""
                )}
              </div>
            </div>
          </form>
          <div>
            <input
              className="form-check-input"
              type="checkbox"
              value={verify}
              onChange={(e) => {
                setVerify(e.target.checked);
              }}
            />
            <span className="mx-2">Verification by the third </span>
          </div>
          <button
            className="btn btn-primary offset-8 col-md-2"
            disabled={verify === false}
            onClick={handleSubmit}
            type="submit"
          >
            Submit
          </button>
        </div>
      )}
    </div>
  );
}
