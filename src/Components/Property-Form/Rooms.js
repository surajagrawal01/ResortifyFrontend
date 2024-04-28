import { Container, Row, Col, Image, Card } from 'react-bootstrap';
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { Button } from "react-bootstrap";

import PropertyContext from "../../context/PropertyContext";
export default function Rooms(props) {
  const resort = useContext(PropertyContext);
  let rooms = 0;
  // const validateSumOfRooms =()=>{
  //        const sumOfRooms =resort.resort.roomTypes.reduce((acc,roomType) => acc + roomType[0].NumberOfRooms, 0);
  //        return sumOfRooms === resort.propertyData.totalRooms;

  //   }
  function CalcRooms() {
    rooms = resort.resort.roomTypes.reduce((acc, cv) => {
      return acc + cv[0]?.NumberOfRooms;
    }, 0);
    let total = resort?.resort?.propertyData?.totalRooms;
    total = total ? total : 0;
    return ` ${rooms} out of ${total} `;
  }
  const handleRooms = () => {
    props.goToPrevious();
    localStorage.removeItem("roomDetails");
    localStorage.removeItem("roomId");
  };
  return (
    <div>
      <h2 className='text-decoration-underline'>Total Rooms Added {CalcRooms()}</h2>
      <Container fluid>
        <form>
          <div>
            {resort.resort.roomTypes.length ? (
              <div>
                {resort.resort.roomTypes.map((ele, i) => {
                  return (
                    <Card
                      className=" p-3 col-md-4 m-2"
                      border="primary"
                    >
                      <div key={i}>
                        <div className='m-1'>Room Type: {ele[0]?.roomType}</div>
                        <div className='m-1'>Number Of Rooms: {ele[0]?.NumberOfRooms}</div>
                        <div className='m-1'>Description : {ele[0]?.roomDescription}</div>
                      </div>
                    </Card>
                  );
                })}
              </div>
            ) : (
              ""
            )}
          </div>
          <Button onClick={handleRooms} className='m-2'>ADD ROOM TYPE +</Button>
        </form>
      </Container>
    </div>
  );
}
