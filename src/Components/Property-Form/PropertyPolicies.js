import Form from 'react-bootstrap/Form';
import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PropertyContext from '../../context/PropertyContext';
import axios from 'axios';

const policies = ['dayOut', 'nightOut', 'wholeDay'];

export default function Policies() {
  const {resort , resortDispatch} = useContext(PropertyContext)
  const navigate = useNavigate()
  const [checkIn, setCheckIn] = useState({});
  const [select,setSelect] =useState(null)
  const [checkOut, setCheckOut] = useState({});
  const [handleChecked, setHandleChecked] = useState([]);
  const [cancellation,setCancellation] = useState([])

  // errors to be set

  const [property,setProperty] = useState([])
  const [identity,setIdentity] = useState([])
  const  [errors,setErrors] =useState({})
 

  useEffect(()=>{
    (async()=>{
      try{
        const response = await axios.get('http://localhost:3060/api/static-data')
          console.log(response.data)
          setCancellation(response.data.cancellationPolicies)
          setProperty(response.data.propertyRules)
          setIdentity(response.data.IdentityProofs)
      }catch(err){
        console.log(err)
        alert(err.msg)
      }
          
    })();
  },[])
 

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const bookingPolicies = {};
    handleChecked.forEach((isSelected, index) => {
      if (isSelected) {
        bookingPolicies[policies[index]] = {
          checkIn: checkIn[index] || '',
          checkOut: checkOut[index] || '',
        };
      }
    });
  
    const finaldataCancellation = cancellation.filter((ele) => ele.checked).map((ele) => ele.field);
    const finaldataProperty = property.filter((ele) => ele.checked).map((ele) => ele.field);
    const finaldataIdentity = identity.filter((ele) => ele.checked).map((ele) => ele.field);
  
    // Update state variables without awaiting
    
  
    // Perform error validation
    const newErrors = {};
    if (Object.keys(checkIn).length === 0 || Object.keys(checkOut).length === 0) {
      newErrors.checkInOut = 'please select at least one booking policy';
    }
    if (finaldataCancellation.length === 0) {
      newErrors.cancellationPolicies = 'please select at least one cancellation policy';
    }
    if (finaldataProperty.length === 0) {
      newErrors.propertyPolices = 'please select at least one property policy';
    }
    if (finaldataIdentity.length === 0) {
      newErrors.identity = 'please select at least one identity proof';
    }
  
    // Check if there are any errors
    if (Object.keys(newErrors).length === 0) {
      // No errors, proceed with form submission
      const propertyRules = {
        guestPolicies: finaldataProperty,
        acceptableIdentityProofs: finaldataIdentity,
      };
      const formData = {
        bookingPolicies,
        cancellationPolicies: finaldataCancellation,
        propertyRules,
      };
  
      // Dispatch form data and navigate to the next step
      resortDispatch({ type: 'ADD_PROPERTY_DETAILS', payload: formData });
      setErrors({});
      navigate('/finance-and-legal');
    } else {
      // Errors found, update errors state
      setErrors(newErrors);
    }
  };
  
  const handleSelect = (index) => {     //to toggle input of check boxes
    const newSelectedCheckboxes = [...handleChecked];
    newSelectedCheckboxes[index] = !newSelectedCheckboxes[index];
    setSelect((prevIndex)=>{
      if(prevIndex !== index){
        return index
      }else{
        return null
      }

    })
    setHandleChecked(newSelectedCheckboxes);
  };

  const handleCancellation=(id,e)=>{
    const result = cancellation.map( ele =>{
        if(ele.id === id){
          return {...ele,checked:!ele.checked}
        }else{
          return ele
        }
    })
    setCancellation(result)
    }


    const handleProperty =(id)=>{
      const result = property.map(ele =>{
        if(ele.id === id){
          return {...ele,checked:!ele.checked}
        }else{
          return ele
        }
      })
      console.log(result)
      setProperty(result)
    }

    const handleIds=(id)=>{
      const result = identity.map(ele =>{
        if(ele.id === id){
          return {...ele,checked:!ele.checked}
        }else{
          return ele
        }
      })
      console.log(result)
      setIdentity(result)
    }
    console.log('resort',resort)
    console.log(checkIn,checkOut)
  return (
    <div>
      <h3>Booking Policies</h3>
      <Form onSubmit={handleSubmit}>
        {policies.map((policy, index) => ( //===================mapping over policies
          <div key={index} className="mb-3">
            <Form.Check
              type="checkbox"
              id={index}//====================================in each child prop should have unique
              label={policy}
              checked={handleChecked[index] || false}//==================// sets to true or false by default it should be false
              onChange={() => handleSelect(index)} //====================// sets to true or false
            />
            <Form.Group controlId={`checkIn-${index}`}>
              <Form.Label>Check In</Form.Label>
              <Form.Control
                type="time"
                disabled={select!== index}
                value={checkIn[index] || ''}
                onChange={(e) => {
                  const newCheckIn = { ...checkIn };//==================spreads the checkIn to add the value typed
                  newCheckIn[index] = e.target.value;// =================takes the entered value
                  setCheckIn(newCheckIn);//==============================sets the new value
                }}
              />
            </Form.Group>
            <Form.Group controlId={`checkOut-${index}`}>
              <Form.Label>Check Out</Form.Label>
              <Form.Control
                type="time"
                disabled={select!== index}
                value={checkOut[index] || ''}
                onChange={(e) => {
                  const newCheckOut = { ...checkOut };
                  newCheckOut[index] = e.target.value;
                  setCheckOut(newCheckOut);
                }}
              />
            </Form.Group>
          </div>
         
        ))}
         {Object.keys(errors).length ? <p style={{color:'red'}}> {errors.checkInOut}</p>:''}
        <h3>Cancellation Policy</h3>
       
         {
           <div >
            {
               cancellation.map(ele =>{
                      return (
                        < div className='form-group' key={ele.id} controlId={ele.id}>
                        <input type='checkBox' 
                               className='form-check-input'
                               value={ele.field}
                               checked={ele.checked}
                               onChange={()=>{handleCancellation(ele.id)}}/>
                         <label className="checkbox-label">{ele.field}</label>
                        </div>
                      )
                   })    
            }
        {Object.keys(errors).length ? <p style={{color:'red'}}>{errors.cancellationPolicies}</p>: ''}
            <h3>Property Rules</h3>
              <h4>Guest Policies Rules</h4>
            {
              <div>
               {
                 property.map(ele =>{
                   return(
                   < div className='form-group' key={ele.id}>
                     <input type='checkBox' 
                           className='form-check-input'
                           checked={ele.checked}
                           value={ele.field}
                           onChange={()=>{handleProperty(ele.id)}}
                           />
                     <label check className="checkbox-label">{ele.field}</label>
                     </div>
                         )
                       })
               }
                 </div>
            }

             </div>
        }
          {Object.keys(errors).length ? <p style={{color:'red'}}>{errors.propertyPolices}</p>: ''}
          <h4>Acceptable Identity Proof</h4>
          {
             <div>{
                identity.map(ele =>{
              return(
                      < div className='form-group' key={ele.id}>
                        <input type='checkBox'
                                value={ele.field}
                                checked={ele.checked}
                                onChange={()=>{handleIds(ele.id)}}
                              className='form-check-input'/>
                         <label check className="checkbox-label">{ele.field}</label>
                        </div>
                    )
            })
              }
              </div>          
          }
          {Object.keys(errors).length ? <p style={{color:'red'}}>{errors.identity}</p>: ''}
        <button type="submit" className="btn btn-primary">Submit</button>
      </Form>
    </div>
  );
}
