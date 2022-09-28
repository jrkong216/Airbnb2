import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useParams, useHistory } from "react-router-dom"
import { getAllSpots } from '../../store/spotsReducer'
import { NavLink } from 'react-router-dom';
import { DeleteSpot } from '../../store/spotsReducer'
import { getAllReviews } from '../../store/reviewsReducer'
import { DeleteReview } from '../../store/reviewsReducer'


const GetSpotDetails = () => {

    const dispatch = useDispatch()
    const [isLoaded, setIsLoaded] = useState(false)
    let { spotId } = useParams()
    spotId = parseInt(spotId)
    const sessionUser = useSelector(state => state.session.user);


    console.log("this is sesssionUser", sessionUser)
    const history = useHistory()
    const spotInfo = useSelector(state => state.spots[spotId])
    useEffect(() => {
        dispatch(getAllReviews(spotId))
        dispatch(getAllSpots())
            .then(() => setIsLoaded(true))
    }, [dispatch, spotId])
    const reviewInfo = useSelector(state => state.reviews)
    if (spotInfo === undefined) {
        return null
    }
    let sessionUserId
    if (sessionUser) {
        sessionUserId = sessionUser.id
    }

    let spotInfoOwnerId = spotInfo.ownerId
    const reviewInfoArray = Object.values(reviewInfo)
    const reviewsBySpotId = reviewInfoArray.filter(spot => spot.spotId === +spotId)
    console.log("this is reviewsBySpotId",reviewsBySpotId)



    if (!isLoaded) {
        return (<div>Loading...</div>)
    }



    const submitHandler = async (e) => {
        e.preventDefault()
        const payload = {
            id: spotId
        }
        let createdSpot;
        createdSpot = dispatch(DeleteSpot(payload)).then(() => history.push("/")
        )

    }


    const reviewHandler = async (id, userId) => {
        // e.preventDefault()
        if (sessionUser.id === userId){
            const payload = {
                spotId: spotId,
                reviewId: id
            }
            let reviewToDelete;
            reviewToDelete = dispatch(DeleteReview(payload)).then(() => history.push(`/spots/${spotId}`))
            // console.log("THIS IS OUR CREATED SPOT", createdSpot)
            //WHY IS HISTORY NOT WO
        } else {
            alert("You do not have permission to Delete this review")
        }
    }

    let editDeleteLinks;
    if(sessionUser && spotInfo.ownerId === sessionUser.id) {
        editDeleteLinks = (
            <div>
            <div className="Edit-a-Spot-button">
                    <NavLink to={`/spot/${spotId}/edit`}>
                        <button type="submit">EDIT THIS SPOT</button>
                    </NavLink>
            </div>
            <div className= "Delete-spot-button">
                <button onClick= {() => submitHandler()}>DELETE THIS SPOT</button>
            </div>
            </div>
        )
    } else {
        editDeleteLinks = (
            <>
            </>
        )
    }

    let seeCreateReviewButton;
        seeCreateReviewButton = (
            <div>
                <button type="submit">Create a New Review</button>
            </div>
        )


    return (
        <div>
            <div>
                <h1>SPECIFIC SPOT SPLASH PAGE</h1>
                <div className= "spotPicture"> <img src={spotInfo.previewImage}/></div>
                <div className="spotName"> {spotInfo.name}</div>
                <div className="spotAddress"> {spotInfo.address}</div>
                <div className="spotCountry"> {spotInfo.country}</div>
                <div className="spotPrice"> {spotInfo.price}</div>
                <div className="spotavgRating"> THIS IS AVG RATING{spotInfo.avgRating}</div>
                {editDeleteLinks}
                {/* <div className="Edit-a-Spot-button"> */}
                    {/* <NavLink to={`/spot/${spotId}/edit`}> */}
                        {/* <button type="submit">EDIT THIS SPOT</button> */}
                    {/* </NavLink> */}
                <div>
                {/* <div className= "Delete-button">
                <button onClick= {() => submitHandler()}>DELETE THIS SPOT</button>
                </div> */}
            {/* </div> */}

                <h2>BELOW IS THE REVIEW OF THE SPOT</h2>

                    {reviewsBySpotId.map((item) => {
                        return (
                            <div key={item.id}>
                                <div className="itemReview"> {item.review}</div>
                                <div className="itemStars"> {item.stars}</div>

                                 <button onClick= {() => reviewHandler(item.id, item.userId)}>DELETE THIS Review</button>
                                </div>
                                )})
                    }
                                    <NavLink to={`/review/${spotId}/new`}>
                                    {sessionUserId  && sessionUserId  !== spotInfoOwnerId ? seeCreateReviewButton : null}
                                    </NavLink>
                            </div>
            </div>
        </div>
                )
}

export default GetSpotDetails
