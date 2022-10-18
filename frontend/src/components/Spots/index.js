import { useEffect, useState} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {getAllSpots} from '../../store/spotsReducer'
import SpotCard from "../SpotCard"
import "./Spots.css"


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
        <div className="home-container">
            <div className= "all-spots-card-container">
        {allSpotsArray.map((spot)=>
            <SpotCard key={spot.id} spot={spot} />
            )}
            </div>
        </div>
    )
}

export default GetAllSpots
