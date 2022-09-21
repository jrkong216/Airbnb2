import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useParams, useHistory } from "react-router-dom"
import {getOneSpot} from '../../store/spotsReducer'
import {getAllSpots} from '../../store/spotsReducer'
import { NavLink } from 'react-router-dom';
import {DeleteSpot} from '../../store/spotsReducer'
import {getAllReviews} from '../../store/reviewsReducer'

const GetSpotDetails = () => {

    const dispatch = useDispatch()
    const [isLoaded, setIsLoaded] = useState(false)
    const { spotId } = useParams()
    const history = useHistory()
    const spotInfo = useSelector(state => state.spots[spotId])
    const reviewInfo = useSelector(state => state.reviews)
    const reviewInfoArray = Object.values(reviewInfo)
    const reviewsBySpotId = reviewInfoArray.filter(spot => spot.spotId === +spotId)
    console.log("THIS IS THE STATE FOR SPOT 3 reviewInfo", reviewInfo)
    console.log("This is the ARRAY OF THE INFO", reviewInfoArray)
    console.log("THESE ARE THE REVIEWS", reviewsBySpotId)
    useEffect(() => {
        dispatch(getAllReviews(spotId))
        dispatch(getAllSpots())
            .then(() => setIsLoaded(true))
    }, [dispatch, spotId])


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
            <h2>BELOW IS THE REVIEW OF THE SPOT</h2>
            {reviewsBySpotId.map((spot) =>
                {return (
                    <>
                    <div className= "spotReview"> {spot.review}</div>
                    <div className= "spotStars"> {spot.stars}</div>
                    </>
                )})
                }

            <NavLink to= {`/review/${spotId}/new`}>
                    <button type="submit">Create a New Review</button>
                    </NavLink>
                    </div>
                </div>

        </div>

    )
}

export default GetSpotDetails
