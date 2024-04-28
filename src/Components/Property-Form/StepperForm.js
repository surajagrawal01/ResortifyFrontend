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
import { GoArrowLeft, GoArrowRight } from "react-icons/go";

export default function StepperForm() {
  const [activeStep, setActiveStep] = useState(0);
  const [isSubmit, setIsSubmit] = useState(false);
  const [roomdetails, setRoomDetails] = useState(false);
  const [upload, setUpload] = useState(false);
  const [policies, setPolicies] = useState(false);

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
    setActiveStep(activeStep + 1);
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };
  const goToPrevious = () => {
    handleBack();
    setRoomDetails(false);
  };
  const steps = [
    <PropertyDetails enableButton={enableButton} />,
    <RoomDetails enableRoomDetails={enableRoomDetails} />,
    <Rooms goToPrevious={goToPrevious} />,
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
        <Button onClick={handleBack} disabled={activeStep === 0} className="m-4">
          <GoArrowLeft /> back{" "}
        </Button>
        {activeStep === 5 ? (
          ""
        ) : (
          <Button
            onClick={handleNext}
            className="offset-md-10"
            disabled={
              (activeStep === 0 && !isSubmit) ||
              (activeStep === 1 && !roomdetails) ||
              (activeStep === 3 && !upload) ||
              (activeStep === 4 && !policies)
            }
          >
            next <GoArrowRight />
          </Button>
        )}
      </div>
    </div>
  );
}
