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

//   useEffect(() => {
//     const errors = []

    // if(name.length < 3) {
    //   errors.push("Name must be 3 or more characters")
    // } else if (name.length > 20) {
    //   errors.push("Name must be 20 characters or less")
    // }
    // if(fruits.find(fruits => fruits.name === name)) {
    //   errors.push("Name already exists.")
    // }

    // if (sweetness < 1 || sweetness > 10){
    //   errors.push("Sweetness must be between 1 and 10")
    // }

//     setValidationErrors(errors)

//   }, [name, sweetness, fruits])

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
      {/* <ul className="errors">
        {validationErrors.length > 0 &&
          validationErrors.map((error) =>
          <li key={error}>{error}</li>
        )}
      </ul> */}
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
          // disabled={!!validationErrors.length}
      >
        Create Review
      </button>
    </form>
  );
}

export default ReviewForm;
