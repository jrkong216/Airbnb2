import { useEffect, useState} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from "react-router-dom"
import {getAllReviews} from '../../store/reviewsReducer'



const GetAllReviews = () => {
    const dispatch = useDispatch()
    const allReviews = useSelector(state => state.Reviews)
    const allReviewsArray = Object.values(allReviews)
    const { spotId } = useParams();
    const [isLoaded, setIsLoaded] = useState(false)


     console.log("Is this being read before useEffect")
    useEffect(() => {
        dispatch(getAllReviews(spotId))
            .then(() => setIsLoaded(true))
    }, [dispatch, spotId])

    console.log("After useEffect passing spotId", spotId)


    if (!isLoaded){
    return (<div>Loading...</div>)
    }

    return (
        <div>
            <h1>REVIEW PAGE</h1>
            <p>{allReviewsArray}</p>



        </div>
    )
}

export default GetAllReviews
