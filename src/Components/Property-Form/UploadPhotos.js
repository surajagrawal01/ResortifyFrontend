import { useContext,useState } from 'react';
import axios from 'axios'
import {Button} from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import PropertyContext from '../../context/PropertyContext';
export default function UploadPhotos(){
    const {resort,resortDispatch} = useContext(PropertyContext)
    
    const formData = new FormData()
    const formData1 = new FormData()
    const navigate = useNavigate()


    const handleImage =(files)=>{
    for(let i=0; i< files.length  ; i++){
       const file = files[i]
       formData.append("files",file)
    }
    
   }
   const handleRoomPhotos =(files)=>{
    for(let i =0; i<files.length; i++){
        const file = files[i]
        formData1.append("files",file)
       }
   }
   

    const handlePhotos=async(e)=>{
        e.preventDefault()   
        // Append each selected image to FormData
        try{
            const response = await axios.post('http://localhost:3060/api/propertyphotos',formData)
            const response2 = await axios.post('http://localhost:3060/api/roomphotos',formData1)
            console.log(response.data)
            console.log(response2.data)
          
            const form ={
                "propertyPhotos":response.data,
            }
            const form2={
                "photos":response2.data,
            }
            resortDispatch({type:"ADD_PROPERTY_DETAILS",payload:form})
            resortDispatch({type:"ADD_ROOM_DETAILS",payload:form2})

        }catch(err){
            console.log(err)

        }
       
       
        navigate("/policies")
    }
   

    console.log(resort)
   
    return (
        <div>
            <h2>Upload Property Photos</h2>
             <form onSubmit={handlePhotos}>
                 <label>Upload Property Photos</label>
                 <input type="file"
                        name='file'
                        multiple
                        onChange={(e) =>{handleImage(e.target.files)}}/><br/>   
                <label>Upload Rooms Photos </label> 
                <input type="file"
                        name='file'
                        multiple
                        onChange={(e)=>handleRoomPhotos(e.target.files)} /> <br/> 
               
                <Button type="sumbit"> next</Button>
             </form>
              

        </div>
    )
}