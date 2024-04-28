import { Stepper, Step } from "react-form-stepper";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import PropertyDetails from "./PropertyDetails";
import RoomDetails from "./RoomDetails";
import Rooms from "./Rooms";
import UploadPhotos from "./UploadPhotos";
import PropertyPolicies from "./PropertyPolicies";
import FinanceAndLegal from "./FinanceLegal";
import { Button } from "react-bootstrap";

export default function StepperForm() {
  const [activeStep, setActiveStep] = useState(0);
  const [isSubmit, setIsSubmit] = useState(false);
  const [roomdetails, setRoomDetails] = useState(false);
  const [upload, setUpload] = useState(false);
  const [policies, setPolicies] = useState(false);
  const [roomEnable, setRoomEnable] = useState(false);

  const enableButton = () => {
    setIsSubmit(true);
  };
  const enableRoomDetails = () => {
    setRoomDetails(true);
  };
  const enableUpload = () => {
    setUpload(true);
  };
  const enablePolicies = () => {
    setPolicies(true);
  };
  const handleNext = () => {
    setRoomEnable(false);
    setActiveStep(activeStep + 1);
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };
  const goToPrevious = () => {
    handleBack();
    setRoomDetails(false);
  };
  const verifyRooms = () => {
    setRoomEnable(true);
  };
  const steps = [
    <PropertyDetails enableButton={enableButton} />,
    <RoomDetails enableRoomDetails={enableRoomDetails} />,
    <Rooms goToPrevious={goToPrevious} verifyRooms={verifyRooms} />,
    <UploadPhotos enableUpload={enableUpload} />,
    <PropertyPolicies enablePolicies={enablePolicies} />,
    <FinanceAndLegal />,
  ];

  return (
    <div>
      <Stepper activeStep={activeStep} alternativeLabel>
        <Step label="Property Details " />
        <Step label="Room Details " />
        <Step label="Total Rooms " />
        <Step label="Propety Photos " />
        <Step label="Property Policies" />
        <Step label="Banking Details " />
      </Stepper>
      <div>
        {steps[activeStep]}
        <Button
          onClick={handleBack}
          disabled={activeStep === 0 || roomEnable === true}
        >
          back{" "}
        </Button>
        {activeStep === 5 ? (
          ""
        ) : (
          <Button
            onClick={handleNext}
            disabled={
              (activeStep === 0 && !isSubmit) ||
              (activeStep === 1 && !roomdetails) ||
              (activeStep === 3 && !upload) ||
              (activeStep === 4 && !policies)
            }
          >
            next
          </Button>
        )}
      </div>
    </div>
  );
}
