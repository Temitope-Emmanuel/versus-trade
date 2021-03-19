import React from "react"
// import {Map,GoogleApiWrapper} from 'google-maps-react'
import GoogleMapReact,{} from "google-map-react"




const AnyReactComponent = ({text}:any) => <div>{text}</div>


const MapContainer = () => {
    const [loaded,setLoaded] = React.useState(false)
    const toggleLoaded = () => {
        setLoaded(!loaded)
    }
    return(
        <div style={{height:"40vh",width:"100%"}} >
            <GoogleMapReact key={process.env.NEXT_PUBLIC_GOOGLE_API_KEY} bootstrapURLKeys={{key:process.env.NEXT_PUBLIC_GOOGLE_API_KEY}}
                defaultCenter={{
                    lat:59.95,
                    lng:30.33
                }} onGoogleApiLoaded={toggleLoaded}
                 defaultZoom={11} 
            >
                {loaded && <AnyReactComponent lat={59.955413} lng={30.337844} text="Main Marker" />}
            </GoogleMapReact>
        </div>
    )
}

export default MapContainer