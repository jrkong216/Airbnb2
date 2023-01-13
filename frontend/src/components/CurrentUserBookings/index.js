//component/CURRENT USER/INDEx
import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getAllSpots }  from '../../store/spotsReducer'
import { getUserBookings } from '../../store/bookingsReducer'
import { useParams, useHistory } from "react-router-dom"
import { NavLink } from 'react-router-dom';
import {DeleteSpot} from '../../store/spotsReducer'
import { DeleteBooking } from '../../store/bookingsReducer'
import "./CurrentUserBookings.css"
import SpotCard from "../SpotCard"



const GetUserBookingDetails = () => {
    const history = useHistory()
    const dispatch = useDispatch()
    const [isLoaded, setIsLoaded] = useState(false)
    const { spotId } = useParams()
    const userId = useSelector(state => state.session.user.id)
    const spotInfo = useSelector(state => state.spots)
    const spotsInfoArray = Object.values(spotInfo)
    const spotsByUserId = spotsInfoArray.filter(spot => spot.ownerId === +userId)
    // const reviewInfo = useSelector(state => state.reviews)
    // const reviewInfoArray = Object.values(reviewInfo)
    // const reviewsBySpotId = reviewInfoArray.filter(review => review.userId === +userId)
    // // console.log("This is the reviewss by spotId", reviewsBySpotId)
    // const reviewByUser = reviewsBySpotId.filter(user => user.userId === +userId)
    const bookingInfo = useSelector(state => state.bookings)
    console.log("this is bookingInfo", bookingInfo)
    const bookingInfoArray = Object.values(bookingInfo)
    const bookingsBySpotId = bookingInfoArray.filter(booking => booking.userId === +userId)
    // console.log("This is the reviewss by spotId", reviewsBySpotId)
    const bookingByUser = bookingsBySpotId.filter(user => user.userId === +userId)
    useEffect(() => {
        dispatch(getUserBookings())
        dispatch(getAllSpots())
            .then(() => setIsLoaded(true))
    }, [dispatch, spotId])


    if (!isLoaded){
        return (<div>Loading...</div>)
        }
        // THIS IS TO CHECK IF spotInfo has information
        if (spotInfo === undefined){
            return null
        }
        const deleteBookingHandler = async (id) => {
            // e.preventDefault()
            const payload = {
                spotId: spotId,
                bookingId: id
            }

            let bookingToDelete;
                bookingToDelete = dispatch(DeleteBooking(payload))
        }


        const editBookingHandler = async (id) => {
            history.push(`/current/user/bookings/${id}`);

        }


let spotsOrNot
        if(bookingsBySpotId.length === 0){
            spotsOrNot = (
                <div>
                    <h1 className="user-name">My Bookings</h1>
                        <div className= "no-spots-container">
                        <h2>You have no bookings!</h2>
                        </div>
                        {/* <img src= "https://images.pexels.com/photos/45170/kittens-cat-cat-puppy-rush-45170.jpeg?cs=srgb&dl=pexels-pixabay-45170.jpg&fm=jpg"></img> */}
                </div>
             )
        } else {
         spotsOrNot = (
            <div>
                    <div className="outer-review-container">
                    <h2 className="user-name">My Bookings</h2>
                <div className="user-review-container">
                    <div className="all-user-review--container">
                {bookingsBySpotId.map((item) =>
                {return (
                    <div key= {item.id}>
                    <div className= "spotReviewName"> Location: {item.Spot.name}</div>
                    {/* <div className="user-review-data-container">
                        <i className="fa-solid fa-star fa-xs"></i>
                    <div className= "spotStars"> {item.stars}</div>
                    </div> */}
                    <div className= "spotReview"> Booking: {item.booking}</div>
                     <button className="user-delete-review-button" onClick= {() => deleteBookingHandler(item.id)}>Delete Booking</button>
                     <button className="user-edit-review-button" onClick= {() => editBookingHandler(item.id)}>Edit Booking</button>
                     {/* {console.log("this is item", item)} */}
                    </div>
                )})
                }
                    </div>
                </div>

                    </div>
</div>
         )
        }

    return(
        <>
        {spotsOrNot}
        </>
    )
}

export default GetUserBookingDetails
