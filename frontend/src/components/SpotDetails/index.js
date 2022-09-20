import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useParams, useHistory } from "react-router-dom"
import {getOneSpot} from '../../store/spotsReducer'
import {getAllSpots} from '../../store/spotsReducer'
import { NavLink } from 'react-router-dom';

const GetSpotDetails = () => {

    const dispatch = useDispatch()
    const [isLoaded, setIsLoaded] = useState(false)
    const { spotId } = useParams()


    useEffect(() => {
        dispatch(getAllSpots())
            .then(() => setIsLoaded(true))
    }, [dispatch])

    const spotInfo = useSelector(state => state.spots[spotId])
// console.log("THIS IS SPOT INFO", spotInfo)

    if (!isLoaded){
        return (<div>Loading...</div>)
        }

    return(
<div>
            <h1>SPECIFIC SPOT SPLASH PAGE</h1>
            <div className= "spotName"> {spotInfo.name}</div>
                        <div className= "spotAddress"> {spotInfo.address}</div>
                        <div className= "spotCountry"> {spotInfo.country}</div>
                        <div className= "spotPrice"> {spotInfo.price}</div>
                        <div className = "Creat-a-Spot-button">
                    <NavLink to= {`/spot/${spotId}/edit`}>
                    <button type="submit">EDIT THIS SPOT</button>
                    </NavLink>

                </div>

        </div>

    )
}

export default GetSpotDetails
