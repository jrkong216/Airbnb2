import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux"
import {CreateReview} from "../../store/reviewsReducer"
import {getAllReviews} from '../../store/reviewsReducer'
import GetSpotDetails from "../SpotDetails";
import { useParams } from "react-router-dom"
import "./CreateReviewForm.css";

function ReviewForm() {
  const history = useHistory()
  const dispatch = useDispatch();
  const [review, setReview] = useState('')
  const [stars, setStars] = useState('')
  const { spotId } = useParams()
console.log("this is spotId", spotId)
  const [validationErrors, setValidationErrors] = useState([])


  useEffect(() => {
    dispatch(getAllReviews(spotId))
}, [dispatch])


  // useEffect(() => {
  //   const errors = []

  //   if(!review) errors.push("Please provide a review")
  //   // if(stars < 1 || stars >5) errors.push("Rating must be an integer between 1 and 5")

  //   setValidationErrors(errors)

  // }, [review, stars])

const submitHandler = async (e) => {
  e.preventDefault()

    const errors = []

    if(!review) errors.push("Please provide a review")
    if(stars < 1 || stars >5 || stars=== "") errors.push("Rating must be an integer between 1 and 5")

    setValidationErrors(errors)

  const payload = {
    review,
    stars
}

 if(errors.length){
  return null
 }

//  if (stars === ""){
//   alert("You must pick a rating between 1-5")
//   return null
//  }


let createdReview;
try{
  createdReview = await dispatch(CreateReview(spotId, payload))
} catch(res) {
  const data = await res.json()
}

  history.push(`/spots/${spotId}`)

}

  return (
    <div className="Outer-Container">
      <div className="Inner-Container">
    <form
      className="review-form" onSubmit={submitHandler}
    >
      <div className="title-box">
      <h2 className="title-words">Create a Review</h2>
      </div>
      <ul className="errors">
        {validationErrors.length > 0 &&
          validationErrors.map((error) =>
          <li key={error}>{error}</li>
        )}
      </ul>
      {/* <label>
        Review
        <input
          type="text"
          name="review"
          onChange={(e)=> setReview(e.target.value)}
          value={review}
        />
      </label> */}
      <div className="write-review-container">
      <h3>Write your Review Below</h3>
      </div>
      <div className="review-container">
      <textarea className="input-box"
      id="first-name"
        label="Name"
          value={review}
          onChange={(e)=> setReview(e.target.value)}
          margin="normal"
      />
      </div>
      <div className= "stars-container">
        <div className= "star-and-column">
      <label>
              <i className="fa-solid fa-star fa-xs"></i>
        {/* <input
          type="text"
          name="stars"
          onChange={(e)=> setStars(e.target.value)}
          value={stars}
        /> */}
        <select className="one-to-five" onChange={(e)=> setStars(e.target.value)} value={stars}>
            <option value= "" disabled>Rate 1 to 5</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
          </select>
      </label>
      </div>
      </div>
      <div className="create-review-container">
      <button className="create-review-button"
        type="submit"
        // disable={setValidationErrors.length > 0 ? true : false}
          // disabled={!!validationErrors.length}
      >
        Create Review
      </button>
      </div>
    </form>
      </div>
    </div>
  );
}

export default ReviewForm;
