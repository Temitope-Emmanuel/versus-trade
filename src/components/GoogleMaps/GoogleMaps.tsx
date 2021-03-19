import React from "react"
// import {Map,GoogleApiWrapper} from 'google-maps-react'
import GoogleMapReact,{} from "google-map-react"




const AnyReactComponent = ({text}:any) => <div>{text}</div>

const MapContainer = (props) => {
    return(
        <div style={{height:"40vh",width:"100%"}} >
            <GoogleMapReact key={process.env.NEXT_PUBLIC_GOOGLE_API_KEY} bootstrapURLKeys={{key:NEXT_PUBLIC_GOOGLE_API_KEY}}
                defaultCenter={{
                    lat:59.95,
                    lng:30.33
                }} defaultZoom={11} 
            >
                <AnyReactComponent lat={59.955413} lng={30.337844} text="My Marker" />
            </GoogleMapReact>
        </div>
    )
}

export default MapContainer