import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux"
import {CreateReview} from "../../store/reviewsReducer"
import {getAllReviews} from '../../store/reviewsReducer'
import GetSpotDetails from "../SpotDetails";
import { useParams } from "react-router-dom"

function ReviewForm() {
  const history = useHistory()
  const dispatch = useDispatch();
  const [review, setReview] = useState('')
  const [stars, setStars] = useState('')
  const { spotId } = useParams()
console.log("this is spotId", spotId)
  const [validationErrors, setValidationErrors] = useState([])
 //GOING TO HAVE TO MAKE SOME SORT OF USER MUST BE LOGGED IN REFERRENCE

  useEffect(() => {
    dispatch(getAllReviews(spotId))
}, [dispatch])

// const allSpots = useSelector(state => state.spots)
// const allSpotsArray = Object.values(allSpots)
// console.log("this is allSpotsArray", allSpotsArray)
// const lastCreated = allSpotsArray.length
// console.log("Is this going to be integer 6", lastCreated)

  useEffect(() => {
    const errors = []

    if(!review) errors.push("Please provide a review")
    if(stars < 1 || stars >5) errors.push("Rating must be an integer between 1 and 5")

    setValidationErrors(errors)

  }, [review, stars])

const submitHandler = async (e) => {
  e.preventDefault()

  const payload = {
    review,
    stars
}

let createdReview;
try{
  createdReview = await dispatch(CreateReview(spotId, payload))
} catch(res) {
  const data = await res.json() // If(data) set Validation error to data.message, if issue log nessage if why
// need another if(err0r) DO NOT LET SUBMISSION HAPPEN
  console.log("This is res", data)
}

// console.log("THIS IS OUR CREATED SPOT", createdSpot)
//WHY IS HISTORY NOT WORKING
//   history.push("/")
  history.push(`/spots/${spotId}`)
  // THIS SPOT IS NOT RE-RENDERING
}
//return spot from teh THUNK



  return (
    <form
      className="review-form" onSubmit={submitHandler}
    >
      <h2>Create a Review</h2>
      <ul className="errors">
        {validationErrors.length > 0 &&
          validationErrors.map((error) =>
          <li key={error}>{error}</li>
        )}
      </ul>
      <label>
        Review
        <input
          type="text"
          name="review"
          onChange={(e)=> setReview(e.target.value)}
          value={review}
        />
      </label>
      <label>
        Stars
        <input
          type="text"
          name="stars"
          onChange={(e)=> setStars(e.target.value)}
          value={stars}
        />
      </label>


      <button
        type="submit"
        // disable={setValidationErrors.length > 0 ? true : false}
          disabled={!!validationErrors.length}
      >
        Create Review
      </button>
    </form>
  );
}

export default ReviewForm;
