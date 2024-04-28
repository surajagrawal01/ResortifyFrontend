import { useContext, useEffect, useState } from "react";
import { Button } from "react-bootstrap";

import PropertyContext from "../../context/PropertyContext";
export default function Rooms(props) {
  const resort = useContext(PropertyContext);
  const [calcRooms, setCalcRooms] = useState(0);
  const [totalRooms, setTotalRooms] = useState(0);
  let rooms = 0;
  if (calcRooms === totalRooms && calcRooms > 0 && totalRooms > 0) {
    props.verifyRooms();
  }
  // const validateSumOfRooms =()=>{
  //        const sumOfRooms =resort.resort.roomTypes.reduce((acc,roomType) => acc + roomType[0].NumberOfRooms, 0);
  //        return sumOfRooms === resort.propertyData.totalRooms;

  //   }
  useEffect(() => {
    rooms = resort?.resort?.roomTypes.reduce((acc, cv) => {
      return acc + cv?.NumberOfRooms;
    }, 0);

    console.log(resort.resort.roomTypes);
    let total = resort?.resort?.propertyData?.totalRooms;
    total = total ? total : 0;
    setCalcRooms(rooms);
    setTotalRooms(total);
  }, []);
  // function CalcRooms() {
  //   // rooms = resort?.resort?.roomTypes.reduce((acc, cv) => {
  //   //   return acc + cv?.NumberOfRooms;
  //   // }, 0);
  //   // console.log(resort.resort.roomTypes);
  //   // let total = resort?.resort?.propertyData?.totalRooms;
  //   // total = total ? total : 0;
  //   // setCalcRooms(rooms);
  //   // setTotalRooms(total);
  //   return ` `;
  // }
  const handleRooms = async (id) => {
    // console.log(id);
    // try {
    //   const response = await axios.post(
    //     `http://localhost:3060/api/propertydetails/addrooms/${id}`
    //   );
    //   console.log(response.data);
    // } catch (err) {
    //   console.log(err);
    // }

    props.goToPrevious();
    localStorage.removeItem("roomDetails");
    localStorage.removeItem("roomId");
  };
  console.log(resort, "reducer data resort");
  return (
    <div>
      <h2>Total Rooms Added {`${calcRooms} out of ${totalRooms}`}</h2>

      <form>
        <div>
          {resort.resort.roomTypes.length ? (
            <div>
              {resort.resort.roomTypes.map((ele, i) => {
                return (
                  <div key={i} style={{ border: "1px solid black" }}>
                    <span>Room Type: {ele?.roomType}</span>
                    <br />
                    <span>Number Of Rooms: {ele?.NumberOfRooms}</span>
                    <br />
                    <span>Description : {ele?.roomDescription}</span>
                    <br />
                  </div>
                );
              })}
            </div>
          ) : (
            ""
          )}
        </div>
        <Button
          disabled={calcRooms === totalRooms ? true : false}
          onClick={() => {
            handleRooms(localStorage.getItem("_id"));
          }}
        >
          ADD +
        </Button>
      </form>
    </div>
  );
}
