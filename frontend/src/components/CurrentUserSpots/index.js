import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useParams, useHistory } from "react-router-dom"
// import {getOneSpot} from '../../store/spotsReducer'
import {getAllSpots} from '../../store/spotsReducer'
import { NavLink } from 'react-router-dom';
import {DeleteSpot} from '../../store/spotsReducer'
// import {getAllReviews} from '../../store/reviewsReducer'

const GetUserDetails = () => {

    const dispatch = useDispatch()
    const [isLoaded, setIsLoaded] = useState(false)
    const { spotId } = useParams()
    const history = useHistory()
    const userId = useSelector(state => state.session.user.id)

    const spotInfo = useSelector(state => state.spots)

    const spotsInfoArray = Object.values(spotInfo)
    const spotsByUserId = spotsInfoArray.filter(spot => spot.ownerId === +userId)
    console.log("THIS IS THE STATE FOR SPOTInfo", spotInfo)
    console.log("This is the ARRAY OF THE stopinfo", spotsInfoArray)
    console.log("THESE ARE THE spots by user", spotsByUserId)

    // const reviewInfo = useSelector(state => state.reviews)
    // const reviewInfoArray = Object.values(reviewInfo)
    // const reviewsBySpotId = reviewInfoArray.filter(spot => spot.spotId === +spotId)
    // console.log("THIS IS THE STATE FOR SPOT 3 reviewInfo", reviewInfo)
    // console.log("This is the ARRAY OF THE INFO", reviewInfoArray)
    // console.log("THESE ARE THE REVIEWS", reviewsBySpotId)

    useEffect(() => {
        // dispatch(getAllReviews(spotId))
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
            <h1>USERS RICH ASS SPOTS THATS DRIVING HOME PRICES UP</h1>
            {spotsByUserId.map((spot) =>
                {return (
                    <>
                    <div className= "spotReview"> {spot.address}</div>
                    <div className= "spotStars"> {spot.city}</div>
                    <div className= "spotStars"> {spot.state}</div>
                    <div className= "spotStars"> ${spot.price}</div>
                    <div className= "spotStars"> Average Rating {spot.avgRating}</div>
                    <NavLink to= {`/spot/${spotId}/edit`}>
                    <button type="submit">EDIT THIS SPOT</button>
                    </NavLink>
                    <form
                     className="spot-form" onSubmit={submitHandler}>
                     <button type="submit">DELETE THIS SPOT</button>
                    </form>
                    </>
                )})

                }
                    <div>
                    </div>
                </div>



    )
}

export default GetUserDetails