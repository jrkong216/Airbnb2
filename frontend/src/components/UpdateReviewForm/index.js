import { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux"
import {getAllReviews, getUserReviews} from '../../store/reviewsReducer'
import {UpdateReview} from '../../store/reviewsReducer'
import "./UpdateReviewForm.css"

function UpdateReviewForm() {
const { reviewId } = useParams()

  const history = useHistory()
  const dispatch = useDispatch();

  const reviewInfo = useSelector(state => state.reviews[reviewId])

  const [review, setReview] = useState('')
  const [stars, setStars] = useState('')
  const [validationErrors, setValidationErrors] = useState([])


  useEffect(() => {
    dispatch(getAllReviews(reviewId))
}, [dispatch])

useEffect(() => {
  setReview(reviewInfo && reviewInfo.review)
  setStars(reviewInfo && reviewInfo.stars)

}, [reviewInfo])
// console.log("This is being ran on line 34", name)

if(!reviewInfo) return null

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

let reviewedSpot;
console.log("this is reviewID", reviewId, "this is payload", payload)
reviewedSpot = dispatch(UpdateReview(reviewId,payload)).then(()=> dispatch(getUserReviews())).then(history.push(`/current/user/reviews`))
  // history.push(`/current/user/reviews`)

}

  return (
    <div className="Outer-Container">
      <div className="Inner-Container">
    <form
      className="update-review-form" onSubmit={submitHandler}
    >
      <div className="title-box">
      <h2 className="title-words">Edit Review</h2>
      </div>
      <div className="errors">
        {validationErrors.length > 0 &&
          validationErrors.map((error) =>
          <div key={error}>{error}</div>
        )}
      </div>
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
      {/* <h3>Edit your Review Below</h3> */}
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
        Edit Review
      </button>
      </div>
    </form>
      </div>
    </div>
  );
}

export default UpdateReviewForm;
