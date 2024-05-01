import { Container, Card, Button } from "react-bootstrap";

import { useContext, useEffect, useState } from "react";

import PropertyContext from "../../context/PropertyContext";
export default function Rooms(props) {
  const resort = useContext(PropertyContext);
  const [calcRooms, setCalcRooms] = useState(0);
  const [totalRooms, setTotalRooms] = useState(0);
  let rooms = 0;
  if (calcRooms === totalRooms && calcRooms > 0 && totalRooms > 0) {
    props.verifyRooms();
  }
 
  useEffect(() => {
    rooms = resort?.resort?.roomTypes.reduce((acc, cv) => {
      return acc + cv?.NumberOfRooms;
    }, 0);

   
    let total = resort?.resort?.propertyData?.totalRooms;
    total = total ? total : 0;
    setCalcRooms(rooms);
    setTotalRooms(total);
  }, []);

  const handleRooms = async () => {
    props.goToPrevious();
    localStorage.removeItem("roomDetails");
    localStorage.removeItem("roomPhotos");
    localStorage.removeItem("roomId");
  };

  

  return (
    <div>
      <h2>Total Rooms Added {`${calcRooms} out of ${totalRooms}`}</h2>
      <Container fluid>
        <form>
          <div>
            {resort.resort.roomTypes.length ? (
              <div>
                {resort.resort.roomTypes.map((ele, i) => {
                  return (
                    <Card className=" p-3 col-md-4 m-2" border="primary">
                      <div key={i}>
                        <div className="m-1">Room Type: {ele?.roomType}</div>
                        <div className="m-1">
                          Number Of Rooms: {ele?.NumberOfRooms}
                        </div>
                        <div className="m-1">
                          Description : {ele?.roomDescription}
                        </div>
                      </div>
                    </Card>
                  );
                })}
              </div>
            ) : (
              ""
            )}
          </div>
          <Button
            className="m-2"
            disabled={calcRooms === totalRooms ? true : false}
            onClick={() => {
              handleRooms();
            }}
          >
            ADD +
          </Button>
        </form>
      </Container>
    </div>
  );
}
