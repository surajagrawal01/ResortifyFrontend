import { Formik ,Field } from 'formik';
import {useContext, useEffect,useState} from 'react'
import 'leaflet/dist/leaflet'
import LocationMap from './LocationMap';
import axios from "axios"
import {useNavigate} from "react-router-dom"
import {Row,Col,Button} from "react-bootstrap"
import * as Yup from 'yup';
import PropertyContext from '../../context/PropertyContext';

export default function PropertyDetails(){
  const {resort, resortDispatch} = useContext(PropertyContext)
    const navigate = useNavigate()
    const [map,setMap] = useState(false)
    const [submit,setSubmit] = useState(false)
    const [propertyAmenities,setpropertyAmenities] = useState([])
    const [packages,setPackages] = useState([{package:'',price:''}])
    const [amenities,setAmenities] = useState([])
    const [location,setLocation] =useState([])
    const [address,setAddress] = useState('')
    const [errors,setErrors] = useState({})
    useEffect(()=>{
        (async()=>{
            try{
                const response = await axios.get("http://127.0.0.1:3060/api/owners/amenities",{headers:
            {Authorization:localStorage.getItem('token')}})
                const property = response.data.filter(ele =>{
                    return ele.type === 'property'
                })

                console.log(response.data)
                setAmenities(response.data)
                setpropertyAmenities(property)

            }catch(err){
                console.log(err)
            }
            
        })();
    },[])
    useEffect(()=>{
      if(address){
        (async()=>{
          try{
            console.log('address')
            const response = await axios.get(`https://api.geoapify.com/v1/geocode/search?text=${address}&apiKey=9e365a6555974c6e98cbba986f7a43c2`)
            console.log(response.data.features[0].geometry.coordinates)
            setLocation(response.data.features[0].geometry.coordinates)
          }catch(err){
            console.log(err)
          }

       })(); 
      }
    
   },[address])
   
   const locationErrors={}
   const handleSearch =(locality,area,pincode,city,state,country)=>{

         if(locality.length === 0){
            locationErrors.locality ='enter locality'
         }
         if(area.length === 0){
          locationErrors.area ='enter area'
         }
         if(pincode.length === 0){
          locationErrors.pincode='enter pincode'
         }
         if(city.length === 0){
          locationErrors.city = 'enter city'
         }
         if(state.length === 0){
          locationErrors.state = 'enter state'
         }
         if(country.length === 0){
          locationErrors.country = 'enter country'
         }
         if(Object.keys(locationErrors).length === 0){
          console.log('hi')
          const result = `${locality},${area},${city},${pincode},${state},${country}`
          setErrors({})
          setAddress(result)
          setMap(true)
         }else{
          setErrors(locationErrors)
         }
        
   }
   const handleAddPackage = () => {
    setPackages([...packages, { package: '', price: '' }]);
};
   const handleChange =(i,e)=>{
    const {name,value} = e.target
    console.log(name,value)
    const newPackages = [...packages];
    newPackages[i][name] = value;
    setPackages(newPackages);
  }
  const handleRemove =(i)=>{
    const confirm = window.confirm("Are you sure to remove the package?")
    if(confirm){
       const newArr =[...packages]
       newArr.splice(i,1)
       setPackages(newArr)
    }
}
const validatePackages = () => {
  for (const pack of packages) {
    if ((pack.package && !pack.price) || (!pack.package && pack.price)) {
      setSubmit(true)
      return true;
    }
  }
  setSubmit(false)
  return false;
};
console.log(resort)
console.log(errors)
    return (
        <div>
            <h2>Property Details</h2>
          

    <Formik
    
      initialValues={{ propertyName: '',
                         propertyBuiltDate: '',
                          ownerEmail: '',
                          houseNumber:'',
                          locality:'',
                          area:'',
                          pincode:'',
                          city:'',
                          state:'',
                          country:'',
                          checked:[],
                          totalRooms:0
                    }}
      validationSchema={Yup.object({
        propertyName: Yup.string()
          .required('Required'),
        propertyBuiltDate: Yup.date()
        .max(new Date(), 'Property built date cannot be a future date')
          .required('Required'),
        ownerEmail: Yup.string().email('Invalid email address').required('Required'),
        houseNumber: Yup.string()
        .required('Required'),
        locality: Yup.string()
        .required('Required'),
        area: Yup.string()
        .required('Required'),
        pincode: Yup.string()
        .required('Required'),
        city: Yup.string()
        .required('Required'),
        state: Yup.string()
        .required('Required'),
        country: Yup.string()
        .required('Required'),
        checked: Yup.array().min(1, 'Please select at least one property amenity'),
        totalRooms: Yup.number().min(1,'please enter total rooms ')
      })}
      onSubmit={(values) => {
        const formdata ={
            propertyName:values.propertyName,
            propertyBuiltDate:values.propertyBuiltDate,
            ownerEmail:values.ownerEmail,
            location:{
              houseNumber:values.houseNumber,
                locality:values.locality,
                area:values.area,
                pincode:values.pincode,
                city:values.city,
                state:values.state,
                country:values.country
            },
            propertyAmenities:values.checked,
            totalRooms:values.totalRooms
            
        }
        // console.log(formdata)
        resortDispatch({type:'ADD_PROPERTY_DETAILS',payload:formdata})
        resortDispatch({type:'ADD_AMENITIES',payload:amenities})
        resortDispatch({type:'ADD_PACKAGES',payload:packages})
          navigate("/room-amenities")
      }}
    >
      {formik => (
        <form onSubmit={formik.handleSubmit}>
        <Row>
            <Col>
          <input
            type="text"
            placeholder='property name'
            {...formik.getFieldProps('propertyName')}
          />
          {formik.touched.propertyName && formik.errors.propertyName ? (
            <div style={{color:'red'}}>{formik.errors.propertyName}</div>
          ) : null}
            </Col>
            <Col>
            <label>Property Built Date:</label>
            <input
                type="date"
                placeholder='property built date'
                {...formik.getFieldProps('propertyBuiltDate')}
            />
          {formik.touched.propertyBuiltDate && formik.errors.propertyBuiltDate ? (
            <div style={{color:'red'}}>{formik.errors.propertyBuiltDate}</div>
          ) : null}
          </Col>
        </Row>
        <Row>
          <Col>
            <input  type="email" 
           placeholder='enter email'
          {...formik.getFieldProps('ownerEmail')} />
          {formik.touched.ownerEmail && formik.errors.ownerEmail ? (
            <div style={{color:'red'}}>{formik.errors.ownerEmail}</div>
          ) : null}
          </Col>
          <Col>
          <label>Total Rooms Of Resort:</label>
          <input  type="number" 
           placeholder='enter total rooms'
          {...formik.getFieldProps('totalRooms')} />
          {formik.touched.totalRooms && formik.errors.totalRooms ? (
            <div style={{color:'red'}}>{formik.errors.totalRooms}</div>
          ) : null}
          </Col>
        </Row>
        <h2>Location</h2>
        <Row>
            <Col>
            <input  type="text" 
           placeholder='enter house number'
          {...formik.getFieldProps('houseNumber')} />
          {formik.touched.houseNumber && formik.errors.houseNumber ? (
            <div style={{color:'red'}}>{formik.errors.houseNumber}</div>
          ) : null}
            </Col>
            <Col>
            <input  type="text" 
           placeholder='locality'
          {...formik.getFieldProps('locality')} />
          {formik.touched.locality && formik.errors.locality ? (
            <div style={{color:'red'}}>{formik.errors.locality}</div>
          ) : null}{Object.keys(errors).length > 0 ? <span style={{color:'red'}}>{errors.locality}</span>:''}
            </Col>
            
        </Row>
       
        <Row>
            <Col>
               <input  type="text" 
           placeholder='area'
          {...formik.getFieldProps('area')} />
          {formik.touched.area && formik.errors.area ? (
            <div style={{color:'red'}}>{formik.errors.area}</div>
          ) : null}{Object.keys(errors).length > 0 ? <span style={{color:'red'}}>{errors.area}</span>:''}
            </Col>
            <Col>
               <input  type="text" 
           placeholder='pincode'
          {...formik.getFieldProps('pincode')} />
          {formik.touched.pincode && formik.errors.pincode ? (
            <div style={{color:'red'}}>{formik.errors.pincode}</div>
          ) : null}{Object.keys(errors).length >0 ?<span style={{color:'red'}}>{errors.pincode}</span>:''}
            </Col>
         
        </Row>
        <Row>
            <input  type="text" 
           placeholder='city'
          {...formik.getFieldProps('city')} />
          {formik.touched.city && formik.errors.city ? (
            <div style={{color:'red'}}>{formik.errors.city}</div>
          ) : null} {Object.keys(errors).length > 0?<span style={{color:'red'}}>{errors.city}</span>:''}
        </Row>
        <Row>
        <input  type="text" 
           placeholder='state'
          {...formik.getFieldProps('state')} />
          {formik.touched.state && formik.errors.state ? (
            <div style={{color:'red'}}>{formik.errors.state}</div>
          ) : null}{Object.keys(errors).length >0?<span style={{color:'red'}}>{errors.state}</span>: ''}
        </Row>
        <Row>
        <input  type="text" 
           placeholder='country'
          {...formik.getFieldProps('country')} />
          {formik.touched.country && formik.errors.country ? (
            <div style={{color:'red'}}>{formik.errors.country}</div>
          ) : null}{Object.keys(errors).length >0?<span style={{color:'red'}}>{errors.country}</span>: ''}
        </Row>
      
        <Button onClick={()=>{handleSearch( 
        formik.getFieldProps('houseNumber').value,
        formik.getFieldProps('locality').value,
        formik.getFieldProps('area').value,
        formik.getFieldProps('pincode').value,
        formik.getFieldProps('city').value,
        formik.getFieldProps('state').value,
        formik.getFieldProps('country').value)}}>search</Button>
        { map && <div>
                  <LocationMap location={location} propertyName = {formik.getFieldProps('propertyName').value}/>
                  <h2>Property Amenities</h2>
      <Row> 
         {propertyAmenities.map(ele =>{
                    return(<div key={ele._id}>
                                <label>
                            <Field type="checkbox" name="checked" value={ele._id}/>
                            {ele.name}
                            </label>
                         </div>
                   ) 
                })
            } {formik.touched.checked && formik.errors.checked ? (
                <div style={{color:'red'}}>{formik.errors.checked}</div>
              ) : null}
      </Row>
      <h2>Packages(optional)</h2>
         {
            packages.map( (ele,i) =>{
               return (
                  <div key={i}>
                      <Row >
                     <Col>
                        <label>Enter Package Name</label>
                        <input type="text"
                                placeholder='Enter package'
                                value={ele.package}
                                onChange={(e)=>{handleChange(i,e)}}
                                name='package'
                              />
                      </Col>
                      <Col>
                      <label>Enter Amount</label>
                      <input type="text" 
                            value={ele.price}
                            name='price'
                            onChange={(e)=>{handleChange(i,e)}}/>
                      </Col>
                      <Col>
                     <Button type="button" className='btn btn-danger m-2' onClick={(e)=>{handleRemove(i)}}>Remove</Button>
                     </Col>
                  </Row>
                  </div>
               )
            })
         } 
          <Button className='btn btn-success m-2' type="button" onClick={handleAddPackage}>+ more</Button><br/>
          { validatePackages() ? <div style={{ color: 'red' }}>Please provide both package name and price or leave both empty</div> : null}
    
      <Button type="submit" disabled={submit === true}>Submit</Button>
                 </div> }
      
  
        </form>
      )}
    </Formik>

 </div>
    )
}