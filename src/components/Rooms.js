import {Row,Col} from "react-bootstrap"
import { useNavigate } from 'react-router-dom'
import { useContext} from "react"
import {Button} from "react-bootstrap"

import PropertyContext from "../context/PropertyContext"
export default function Rooms(){
    const resort = useContext(PropertyContext)
    const navigate = useNavigate()
    let rooms =0
   function CalcRooms(){
    rooms = resort.resort.roomTypes.reduce((acc,cv)=>{
        return acc + cv[0].NumberOfRooms
     },0)
        let total = resort?.resort?.propertyData?.totalRooms
         total = total? total:0
        return ` ${rooms} out of ${total} `

   }

    const handleRooms =()=>{
       
        navigate("/room-amenities")
    }
    const handleData=()=>{
        navigate("/upload-photos")
    }
   console.log(resort.resort) 
    return (
        <div>
            <h2> Add the rooms details</h2>
            <Row>
                <Col>
                 <Button onClick={handleRooms}>ADD + </Button>
                </Col>
            </Row>
           
           <h2>Total Rooms Added {CalcRooms()}</h2>
          
           <div>
           {
                resort.resort.roomTypes.length ? <div>
                   {
                     resort.resort.roomTypes.map((ele,i) =>{
                        return <div key={i} style={{border:'1px solid black'}}>
                            <span>Room Type: {ele[0].roomType}</span><br/>
                            <span>Number Of Rooms: {ele[0].NumberOfRooms}</span><br/>
                           <span>Description : {ele[0].roomDescription}</span><br/>
                             </div>
                     })
                   }
                </div>: ''
            }
           </div>
         

            <Row>
                <Col>
                <Button onClick={handleData}>Next</Button>
                </Col>
            </Row>
           
            
        </div>
    )
}