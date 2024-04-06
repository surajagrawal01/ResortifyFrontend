import { Row,Col,Button} from "react-bootstrap"
import {useContext, useState} from 'react'
import { useNavigate } from "react-router-dom";
import { Formik, Field, Form, ErrorMessage } from 'formik';
 import * as Yup from 'yup';
import PropertyContext from "../context/PropertyContext";
export default function RoomDetails(){
   const {resort ,resortDispatch} = useContext(PropertyContext)
   const [dateError,setDateError] =useState('')
   
    const navigate = useNavigate()

    const validateRooms=(totalRooms)=>{
      return Yup.number()
      .required('Required')
      .min(1, 'Please enter at least one room')
    }
    const validateDate =()=>{
      return Yup.date()
      .required('Required')
      .min(new Date(),`End date less than today's date`)
    }

    const validateSumOfRooms =(roomTypes,totalRooms)=>{
      return Yup.number().test('sum-of-rooms', 'Sum of rooms in room types should equal total rooms', function(value) {
         const sumOfRooms = roomTypes.reduce((acc, roomType) => acc + roomType.NumberOfRooms, 0);
         return sumOfRooms === totalRooms;
       });
    }

    console.log(resort.roomTypes)
   return(
        <div>
            <h2>Room Amenities</h2>
     <Formik
       initialValues={{ 
        NumberOfRooms :'',
        roomType:'',
        roomDescription:'',
        smokingAllowed:"false",
        extraBed:"false",
        baseRoomPrice:"",
        adult:'',
        children:'',
        startDate:'',
        endDate:'',

        }}
       validationSchema={Yup.object({
         // NumberOfRooms: Yup.number()
         //   .min(1,'please enter atleast one room')
         //   .required('Required'),
         NumberOfRooms:validateRooms(resort.propertyData.totalRooms),
           roomType: Yup.string()
           .max(500,'please enter room type')
           .required('Required'),
            roomDescription:Yup.string()
            .required('room description is required'),
            smokingAllowed:Yup.boolean(),
            extraBed:Yup.boolean(),
            baseRoomPrice:Yup.number()
            .required('please enter the price'),
            adult:Yup.number()
            .min(1,'should be greater than 0')
            .required('number of adult required'),
            startDate:Yup.date()
            .required('enter the start date'),
            endDate:validateDate(),
            roomTypes: Yup.array().of(
               Yup.object().shape({
                 NumberOfRooms: validateRooms(resort.propertyData.totalRooms),
                 // Additional validation for the sum of rooms
                 ...validateSumOfRooms(resort.propertyData.roomTypes, resort.propertyData.totalRooms),
               })
             ),
       })}

       onSubmit={ (values) => {
            const roomTypesData=[{
               NumberOfRooms:values.NumberOfRooms,
               roomType:values.roomType,
               roomDescription:values.roomDescription,
               smokingAllowed:values.smokingAllowed === 'true' ? true : false,
               extraBed:values.extraBed === 'true'? true:false,
               baseRoomPrice:values.baseRoomPrice,
               availability:{startDate:values.startDate,endDate:values.endDate}
            }]
            
            console.log(values.startDate,values.endDate)
            if(values.startDate === values.endDate){
               setDateError('start and end Date cannot be same')
            }else{
               setDateError('')
            const  roomsAlreadyAdded = resort.roomTypes.reduce((acc,cv)=>{
               console.log(cv,cv[0].NumberOfRooms, cv.roomType)
               return acc + (cv[0].NumberOfRooms * 1)
            },0) 
          
           let roomstotal = roomsAlreadyAdded + values.NumberOfRooms
           
            if(roomstotal <= resort.propertyData.totalRooms){
               resortDispatch({type:'ADD_ROOM_DETAILS',payload:roomTypesData})
               navigate("/add-rooms")
            }else{
               console.log('error')
               alert('number of rooms not matching with total rooms of property')
            }

            }
             
            //for validation
          
      // console.log({roomTypesData})
      // const formdata = {roomTypesData:roomTypesData}
    
   }}
     >
       <Form >
         <Row>
            <Col>
            <Field name="NumberOfRooms" type="number" placeholder="Number of rooms" />
            <span style={{color:'red'}}>
                <ErrorMessage  name="NumberOfRooms" />  
            </span>
        
         {/* <ErrorMessage name="roomTypes" /> */}
            </Col>
         </Row>
         <Row>
            <Col>
            <Field name="roomType" type="text" placeholder="room Type : basic/standard/delux "/>
            <span style={{color:'red'}}>  <ErrorMessage name="roomType" /></span>
            </Col>
            <Col>
            <Field  name="baseRoomPrice" type="number" placeholder="price"/>
            <span style={{color:'red'}}><ErrorMessage name="baseRoomPrice" /></span>
           
            </Col>
         </Row>
        <Row>
          <Field name="roomDescription" type="text" placeholder="room description" />
         <span style={{color:'red'}}><ErrorMessage name="roomDescription" />  </span>
        </Row>
       
         <div role="group" aria-labelledby="my-radio-group">
            <label>Smoking Allowed</label>
            <label>
              <Field type="radio" name="smokingAllowed" value="true"  />
              yes
            </label>
            <label>
              <Field type="radio" name="smokingAllowed" value="false"  />
              no
            </label> <ErrorMessage name="smokingAllowed" />
          </div>
          <div role="group" aria-labelledby="my-radio-group">
            <label>Extra Bed</label>
            <label>
              <Field type="radio" name="extraBed" value="true" />
              yes
            </label>
            <label>
              <Field type="radio" name="extraBed" value="false"  />
              no
            </label><ErrorMessage name="extraBed" />
          </div>
         <h2>Room Occupancy</h2> 
         {/* backend validations are remaining and change the names of Schemas of room types and rooms */}
         <Row>
            <Col>
            <Field name="adult" type="number" placeholder="number of adult"/>
            <span style={{color:'red'}}><ErrorMessage name="adult" /></span>
            
            </Col>
            <Col>
            <Field name="children" type="number" placeholder="number of children"/>
            </Col>
         </Row>
         <h2>Availability</h2>
         <Row>
            <Col>
            <label>Start Date</label>
            <Field name="startDate" type="date" />
            <span style={{color:'red'}}> <ErrorMessage name="startDate" /></span>
            
            </Col>
            <Col>
            <label>End Date</label>
            <Field name="endDate" type="date" />
            <span style={{color:'red'}}><ErrorMessage name="endDate" /> </span>
            </Col>{dateError.length >0 ? <span style={{color:'red'}}>{dateError}</span> : ''}
         </Row>
         <h2>Room Amenities</h2>
         {
            resort.amenities.filter(ele =>{
               return ele.type === 'room'
            }).map(ele =>{
               return (
                  <div key={ele._id}>
                                <label>
                            <Field type="checkbox" name="checked" value={ele._id}/>
                            {ele.name}
                            </label>
                         </div>
               )
            })
         }
        
         
         <Button type="submit">Submit</Button>
       
       </Form>
     </Formik>
        </div>
    )
}