import { MapContainer,Marker,TileLayer,Popup} from 'react-leaflet'
import { useContext } from 'react';
import PropertyContext from '../../context/PropertyContext';
import { useEffect,useRef} from 'react';
import { Icon } from 'leaflet';
import image from'../../Images/gps.png'
export default function LocationMap(props){
  const {resort, resortDispatch} = useContext(PropertyContext)
  const mapRef = useRef(null);
  const  {location} = props
  const {propertyName} = props

   const position = Array.isArray(location) && location.length === 2 ? location.reverse() :[12.9716,77.5946];
   const customIcon =new Icon({
    iconUrl:image,
    iconSize:[38,38]
   })
   

   useEffect(() => {
     const map = mapRef.current;
     if (map && location && Array.isArray(location) && location.length === 2) {
       map.setView(location);
     }
   }, [location]);

const handleLocation =(e)=>{
  console.log(e)
    console.log(e.target._latlng.lat,e.target._latlng.lng)
    const lat = e.target._latlng.lat.toString()
    const lng = e.target._latlng.lng.toString()
    const  geoLocation={"lat":lat,"lng":lng}
    console.log(geoLocation)
    resortDispatch({type:'ADD_GEOLOCATION',payload:geoLocation})
}

  console.log(resort)
    return (
        <div >
          <MapContainer style={{height:"400px" , width:"100%"}}
                        ref={mapRef}
                        center={[20.5937,78.9629]}
                        zoom={15} 
                        scrollWheelZoom={false}
                             >
              <TileLayer
                // attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                // url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                url="https://mt1.google.com/vt/lyrs=m&x={x}&y={y}&z={z}"
                attribution='&copy; <a href="https://www.google.com/maps">Google Maps</a> contributors'
              />
            
              <Marker  position={position} icon={customIcon} draggable={true} eventHandlers={{dragend:(e)=>{handleLocation(e)}}}  >
            <Popup>
                  <p>{propertyName}</p>
                </Popup>
              </Marker>
            
          </MapContainer>,

 
        </div>
    )
}