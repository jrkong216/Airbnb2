import { useEffect, useState} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {getAllSpots} from '../../store/spotsReducer'
import { NavLink } from 'react-router-dom';
import SpotCard from "../SpotCard"


const GetAllSpots = () => {
    const dispatch = useDispatch()
    const [isLoaded, setIsLoaded] = useState(false)

    useEffect(() => {
        dispatch(getAllSpots())
            .then(() => setIsLoaded(true))
    }, [dispatch])

    const allSpots = useSelector(state => state.spots)
    // console.log("this is state of spots", allSpots)
    const allSpotsArray = Object.values(allSpots)
    // console.log("this is allspots array", allSpotsArray)
    if (!isLoaded){
    return (<div>Loading...</div>)
    }

    return (
        <div className= "home-spots-container">
        {allSpotsArray.map((spot)=>
            <SpotCard key={spot.id} spot={spot} />
            )}

                {/* // <div className = "Creat-a-Spot-button">
                //     <NavLink to="/spots/new">
                //     <button type="submit">CREATE A SPOT</button>
                //     </NavLink>
                // </div> */}
        </div>



    )
}

export default GetAllSpots
