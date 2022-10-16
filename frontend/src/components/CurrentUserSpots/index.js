//component/CURRENT USER/INDEx
import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useParams } from "react-router-dom"
import { getAllSpots }  from '../../store/spotsReducer'
import { getUserReviews } from '../../store/reviewsReducer'
import "./CurrentUserSpots.css"
import SpotCard from "../SpotCard"


const GetUserDetails = () => {

    const dispatch = useDispatch()
    const [isLoaded, setIsLoaded] = useState(false)
    const { spotId } = useParams()
    const userId = useSelector(state => state.session.user.id)
    const spotInfo = useSelector(state => state.spots)
    const spotsInfoArray = Object.values(spotInfo)
    const spotsByUserId = spotsInfoArray.filter(spot => spot.ownerId === +userId)


    useEffect(() => {
        dispatch(getUserReviews())
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
let spotsOrNot
        if(spotsByUserId.length === 0){
            spotsOrNot = (
                <div>
                    <h1 className="user-name">My Spots</h1>
                        <div className= "no-spots-container">
                        <h2>You have no spots!</h2>
                        </div>
                        {/* <img src= "https://images.pexels.com/photos/45170/kittens-cat-cat-puppy-rush-45170.jpeg?cs=srgb&dl=pexels-pixabay-45170.jpg&fm=jpg"></img> */}
             </div>
             )
        } else {
         spotsOrNot = (
            <div>
                <h1 className="user-name">My Spots</h1>
                    <div className="user-home-container">
                        <div className="all-user-card-container">
                            {spotsByUserId.map((spot) =>
                                {return (
                                    <SpotCard key={spot.id} spot={spot}/>
                                )})
                            }
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

export default GetUserDetails
