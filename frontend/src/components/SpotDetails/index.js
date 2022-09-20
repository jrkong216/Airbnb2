import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useParams, useHistory } from "react-router-dom"
import {getOneSpot} from '../../store/spotsReducer'
import {getAllSpots} from '../../store/spotsReducer'
import { NavLink } from 'react-router-dom';
import {DeleteSpot} from '../../store/spotsReducer'

const GetSpotDetails = () => {

    const dispatch = useDispatch()
    const [isLoaded, setIsLoaded] = useState(false)
    const { spotId } = useParams()
    const history = useHistory()
    const spotInfo = useSelector(state => state.spots[spotId])

    useEffect(() => {
        dispatch(getAllSpots())
            .then(() => setIsLoaded(true))
    }, [dispatch])


// console.log("THIS IS SPOT INFO", spotInfo)

    if (!isLoaded){
        return (<div>Loading...</div>)
        }
        // THIS IS TO CHECK IF spotInfo has information
        if (spotInfo === undefined){
            return null
        }
        const submitHandler = async (e) => {
            e.preventDefault()

            const payload = {
               id: spotId
            }

            let createdSpot;

            createdSpot = dispatch(DeleteSpot(payload)).then(() => history.push("/")
            )
            // console.log("THIS IS OUR CREATED SPOT", createdSpot)
            //WHY IS HISTORY NOT WORKING


            //   history.push("/")

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
                    <div>
                    <form
                     className="spot-form" onSubmit={submitHandler}>
                     <button type="submit">DELETE THIS SPOT</button>
                    </form>
                    {/* <button type="submit" onSubmit={submitHandler}>DELETE THIS SPOT</button> */}
                    </div>
                </div>

        </div>

    )
}

export default GetSpotDetails
