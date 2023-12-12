import { useState, useMemo, } from "react";
import { GoogleMap,useLoadScript,Marker } from "@react-google-maps/api";
import './globals.css'
import {
  CloseOutlined,
  CheckSquareOutlined,
} from "@ant-design/icons";
export default function MyLocation({setLinks,links}:any) {
  
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: "AIzaSyBAL4wzory_XlDxIwtfyGLBwfszMAkOAv4",
    libraries: ["places"],
  });

  if (!isLoaded) return <div>Loading...</div>;
  return <Map setLinks={setLinks} links={links}/>;
}

function Map({setLinks,links}:any) {
  const center = useMemo(() => ({ lat: +links[0], lng: +links[1] }), [links])
 const [location,setLocation]=useState(false)
  
  const [selected, setSelected] = useState<any>('')
  
function Save(){
  localStorage.setItem('mylocation',JSON.stringify(`https://www.google.com/maps?q=${selected ? selected?.lat() : center.lat},${selected ?  selected?.lng() : center.lng}`));
  setLocation(!location)
}


  return (
    <div className="myLoaction"  >
        <GoogleMap
        zoom={10}
        center={center}
        mapContainerClassName="map-container"
        onClick={(e:any)=>setSelected(e.latLng)}
      >
         <Marker position={selected ? selected : center  } />
      </GoogleMap>
      <button className="location" onClick={()=>{setLinks(false)}}> <CloseOutlined className="iconantd"/></button>
      <button className="locationEdit" onClick={()=>{Save();setLinks(false)}}>< CheckSquareOutlined className="iconantd"/></button>
    </div>
  );
}

