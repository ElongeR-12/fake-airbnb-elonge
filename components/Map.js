import React, { useState } from 'react'
import ReactMapGL, {Marker, Popup} from 'react-map-gl';
import { getCenter } from 'geolib';
const Map = ({searchResults}) => {
        const [selectedLocation, setSelectedLocation] = useState({});
      const coordinate = searchResults.map(result =>({
          longitude: result.long,
          latitude: result.lat
      }))
      const center = getCenter(coordinate);
      const [viewport, setViewport] = React.useState({
        width: '100%',
        height: '100%',
        latitude: center.latitude,
        longitude: center.longitude,
        zoom: 11
      });
      console.log("the center>>>>>>>",center)
    return (
        <ReactMapGL
            mapStyle="mapbox://styles/elonge/ckwhs14sk1kbk15p2gkx6bpkf"
            mapboxApiAccessToken={process.env.mapbox_key}
            {...viewport}
            onViewportChange={(nextViewport)=> setViewport(nextViewport)}
        >
            {
                searchResults.map((result)=>(
                    <div key={result.img}>
                        <Marker
                            longitude={result.long}
                            latitude={result.lat}
                            offsetLeft={-20}
                            offsetTop={-10}
                        >
                            <p
                              role="img"
                              onClick={()=>setSelectedLocation(result)}
                              className="cursor-pointer text-2xl animate-bounce"
                              aria-label="push-pin"
                            >
                             📌
                            </p>
                        </Marker>
                        {
                            selectedLocation.long === result.long ?(
                                <Popup
                                  onClose={()=>selectedLocation({})}
                                  closeOnClick={true}
                                  latitude={result.lat}
                                  longitude={result.long}
                                >
                                    {result.title}
                                </Popup>
                            ):(false)
                        }
                    </div>
                ))
            }

        </ReactMapGL>
    )
}

export default Map
