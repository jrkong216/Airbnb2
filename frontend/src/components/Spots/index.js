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
    const allSpotsArray = Object.values(allSpots)
    // console.log("this is allspots array", allSpotsArray)
    if (!isLoaded){
    return (<div>Loading...</div>)
    }

    return (
        <div>
            <h1>AIRBNB SPLASH PAGE</h1>

            {allSpotsArray.map((spot) => (
            <NavLink
            key={spot.id}
            to={`/spots/${spot.id}`}
            >
            {spot.name}
            </NavLink>
            ))}


        </div>
    )





}

export default GetAllSpots
