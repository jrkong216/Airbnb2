import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useParams, useHistory } from "react-router-dom"
import { getOneSpot } from '../../store/spotsReducer'
import { NavLink } from 'react-router-dom';
import { DeleteSpot } from '../../store/spotsReducer'
import { getAllReviews } from '../../store/reviewsReducer'
import { DeleteReview } from '../../store/reviewsReducer'
import airCover from './images/airCover.png'
import "./SpotDetails.css"
import BookingCard from '../BookingCard';


const GetSpotDetails = () => {

    const dispatch = useDispatch()
    const [isLoaded, setIsLoaded] = useState(false)
    let { spotId } = useParams()
    spotId = parseInt(spotId)
    const sessionUser = useSelector(state => state.session.user);


    // console.log("this is sesssionUser", sessionUser)
    const history = useHistory()
    const spotInfo = useSelector(state => state.spots[spotId])

    // console.log("thi iss spotInfo", spotInfo)
    // console.log("this is sspotINFO IAMGE", spotInfo.SpotImages)
    // console.log("thiss is spotInfo Owner id", spotInfo.ownerId)

    useEffect(() => {
        dispatch(getAllReviews(spotId))
        dispatch(getOneSpot(spotId))
            .then(() => setIsLoaded(true))
    }, [dispatch, spotId])
    const reviewInfo = useSelector(state => state.reviews)
    // console.log("this iss reviewInfo", reviewInfo)
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
    // console.log("this is reviewsBySpotId",reviewsBySpotId)
    const reviewOfUser = reviewsBySpotId.find(element => element.userId === sessionUserId)
    // console.log("this is review by the USER", reviewOfUser)

    if (!isLoaded) {
        return (<div>Loading...</div>)
    }

    const submitHandler = async (e) => {

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
            reviewToDelete = dispatch(DeleteReview(payload)).then(()=>dispatch(getOneSpot(spotId))).then(() => history.push(`/spots/${spotId}`))

        } else {
            alert("You do not have permission to Delete this review")
        }
    }

    let editDeleteLinks;
    if(sessionUser && spotInfo.ownerId === sessionUser.id) {
        editDeleteLinks = (
            <div className="two-button-container">
            <div className="Edit-a-Spot-button">
                    <NavLink to={`/spot/${spotId}/edit`}>
                        <button className= "Edit-Delete-Button" type="submit">EDIT THIS SPOT</button>
                    </NavLink>
            </div>
            <div className= "Delete-spot-button">
                <button className= "Edit-Delete-Button" onClick= {() => submitHandler()}>DELETE THIS SPOT</button>
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
                <button className="Create-Review-Button" type="submit">Create a New Review</button>
            </div>
        )

        if(spotInfo.avgStarRating === null){
            spotInfo.avgStarRating = "NEW!"
        }
        let reviewNumber;
        if(reviewsBySpotId.length > 1) {
            reviewNumber = "reviews"
        } else if (reviewsBySpotId.length === 1) {
            reviewNumber = "review"
        } else {
            reviewNumber = "Be the First to Create a Review!"
        }

        let numberOfReviews;
        if (reviewsBySpotId.length){
            numberOfReviews = reviewsBySpotId.length
        } else {
            numberOfReviews = ""
        }



    return (

         <div className= "Spot-Detail-Outer-Container">
            <div className="Spot-Detail-Inner-Container">

                <div className="detail-title-container">
                <div className="spotInfo-name">{spotInfo.name}</div>
                {editDeleteLinks}
                </div>

                <div className="detail-top-info-container">
                <div className="spot-star">
                <i className="fa-solid fa-star fa-xs"></i>
                </div>
                <div className="spot-rating">{spotInfo.avgStarRating}</div>
                <div className="number-of-reviews"> • {numberOfReviews} {reviewNumber} </div>
                <div className="city-state-country">•    {spotInfo.city}, {spotInfo.state} • {spotInfo.country}</div>
                </div>
                <div className="detail-image-outer-container">
                <div className="detail-image-container">
                <div className= "spot-picture"> <img src={spotInfo.SpotImages[0].url} alt="location of house"/></div>
                </div>
                </div>
                <div className="middle-container">
                <div className="middle-left-container">
                <div className="home-owner-container">
                <h2 className="Owner-name"> Entire home hosted by {spotInfo.Owner.firstName}</h2>
                </div>
                <div className="border-awards-container">
                <div className="awards-container">
                    <div className="trophy-container">
                    <i className="fa-solid fa-award fa-2x"></i>
                    </div>
                    <div className="description-of-host">
                    <div className="block-bold">{spotInfo.Owner.firstName} is a Superhost!</div>
                    <div className="block" >Superhosts are experienced, highly rated hosts who are committed to providing great stays for guests.</div>
                    </div>
                </div>
                <div className="awards-container">
                    <div className="trophy-container">
                    <i className="fa-solid fa-wifi fa-lg"></i>
                    </div>
                    <div className="description-of-host">
                    <div className="block-bold">Fast wifi</div>
                    <div className="block" >At 129 Mbps, you can take video calls and stream videos for your whole group.</div>
                    </div>
                </div>
                <div className="awards-container">
                    <div className="trophy-container">
                    <i className="fa-solid fa-calendar fa-lg"></i>
                    </div>
                    <div className="description-of-host">
                    <div className="block-bold-1">Free cancellation for 48 hours.</div>
                    </div>
                </div>
                </div>
                <div className="aircover-container">
                    <img className="aircover-image" src={airCover}></img>
                    <p className="para">Every booking includes free protection from Host cancellations, listing inaccuracies, and other issues like trouble checking in.</p>
                </div>
                <div className="description-name-container">
                <h3 className="spotDescription"> {spotInfo.description}</h3>
                </div>
                </div>
                <BookingCard spotInfo={spotInfo} numberOfReviews={numberOfReviews} reviewNumber={reviewNumber} spotId={spotId} />
                </div>
                <div className="detail-review-container">
                {/* <h2>See Reviews Below!!</h2> */}
                <div className="outer-review-star-container">
                <div className="review-spot-star-container">
                <i className="fa-solid fa-star fa-2x"></i>
                </div>
                <h1 className="spot-rating">{spotInfo.avgStarRating}</h1>
                <h1 className="number-of-reviews"> • {numberOfReviews} {reviewNumber} </h1>
                </div>
                <div className="review-outer-container">
                    {reviewsBySpotId.map((item) => {
                        return (
                            <div key={item.id}>
                                <div className="review-name"> {item.User.firstName}'s review:</div>
                                <div className="review-star-rating-container">
                                <div className="spot-star">
                                <i className="fa-solid fa-star fa-xs"></i>
                                </div>
                                <div className="itemStars"> {item.stars}</div>

                                </div>

                                {/* <div className="itemReview"> {item.createdAt}</div> */}
                                <div className="itemReview"> {item.review}</div>
                                {sessionUser && sessionUserId === item.userId? <button className="Review-Delete-Button" onClick= {() => reviewHandler(item.id, item.userId)}>DELETE THIS Review</button> : null}



                            </div>
                        )})
                    }
                                    <NavLink to={`/review/${spotId}/new`}>
                                    {sessionUserId  && sessionUserId  !== spotInfoOwnerId && !reviewOfUser ? seeCreateReviewButton : null}
                                    </NavLink>
                </div>
            </div>
            </div>

        </div>



                )
}

export default GetSpotDetails
