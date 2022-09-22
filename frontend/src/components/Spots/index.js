import { useEffect, useState} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {getAllSpots} from '../../store/spotsReducer'
import { NavLink } from 'react-router-dom';


const GetAllSpots = () => {
    const dispatch = useDispatch()
    const [isLoaded, setIsLoaded] = useState(false)

    useEffect(() => {
        dispatch(getAllSpots())
            .then(() => setIsLoaded(true))
    }, [dispatch])

    const allSpots = useSelector(state => state.spots)
    console.log("this is state of spots", allSpots)
    const allSpotsArray = Object.values(allSpots)
    // console.log("this is allspots array", allSpotsArray)
    if (!isLoaded){
    return (<div>Loading...</div>)
    }

    return (
        <div>
            <h1>AIRBNB SPLASH PAGE</h1>
<>
            {allSpotsArray.map(spot =>
                {return (
                    <NavLink key={spot.id} to={`/spots/${spot.id}`}>
                        {/* <div className= "spotPicture"> {spot.previewImage}</div> */}
                        <div className= "spotName"> {spot.name}</div>
                        <div className= "spotAddress"> {spot.address}</div>
                        <div className= "spotCountry"> {spot.country}</div>
                        <div className= "spotPrice"> ${spot.price}</div>
                    </NavLink>
                )})
                }
                <div className = "Creat-a-Spot-button">
                    <NavLink to="/spots/new">
                    <button type="submit">CREATE A SPOT</button>
                    </NavLink>

                </div>

    </>
        </div>

    )
}

export default GetAllSpots
