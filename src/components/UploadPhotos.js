import { useContext } from 'react';
import {Form,Button} from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import PropertyContext from '../context/PropertyContext';
export default function UploadPhotos(){
    const {resort,resortDispatch} = useContext(PropertyContext)
    const navigate = useNavigate()
    const handlePhotos=(e)=>{
        const result1  =[]
        const result2=[]
        e.preventDefault()
        const propertyPhotos = e.target.elements.propertyPhotos.files
        for(let i=0; i<propertyPhotos.length ; i++){
            result1.push(propertyPhotos[i].name)
        }
        const photos = e.target.elements.photos.files
        for(let i=0; i<photos.length ; i++){
            result2.push(photos[i].name)
        }
        const formdata = { propertyPhotos:result1,photos:result2}
        console.log(formdata)
        resortDispatch({type:"ADD_PROPERTY_DETAILS",payload:formdata})

        navigate("/policies")
    }
    console.log(resort)
    return (
        <div>
            <h2>Upload Property Photos</h2>
             <form onSubmit={handlePhotos}>
                <Form.Group controlId="formFileMultiple" className="mb-3" name="propertyPhotos">
                    <label>Select Property Photos</label> 
                     <Form.Control type="file"  name="propertyPhotos" multiple />
                 </Form.Group>
             <h2>Upload Room Photos</h2>
                <Form.Group controlId="formFileMultiple" className="mb-3" name="photos">
                <label> Select Rooms Photos  </label>
                     <Form.Control type="file" name='photos' multiple />
                    
                </Form.Group>   
                <Button type="sumbit"> next</Button>
             </form>
              

        </div>
    )
}