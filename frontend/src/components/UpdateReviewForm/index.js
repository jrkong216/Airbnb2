// import { useEffect, useState } from "react";
// import { useHistory, useParams } from "react-router-dom";
// import { useSelector, useDispatch } from "react-redux"
// import {CreateSpot} from "../../store/spotsReducer"
// // import {getAllSpots} from '../../store/spotsReducer'
// import {UpdateReview} from '../../store/reviewsReducer'


// function UpdateReviewForm() {
// const { spotId } = useParams()
//   const history = useHistory()
//   const spotInfo = useSelector(state => state.spots[spotId])
//   const dispatch = useDispatch();
//   const [review, setReview] = useState(spotInfo.name)
//   const [star, setStar] = useState(spotInfo.address)


//   const [validationErrors, setValidationErrors] = useState([])
//  //GOING TO HAVE TO MAKE SOME SORT OF USER MUST BE LOGGED IN REFERRENCE

//   useEffect(() => {
//     dispatch(getAllReviews(spotId))
//     dispatch(getAllSpots())
// }, [dispatch, spotId])

// // const allSpots = useSelector(state => state.spots)
// // const allSpotsArray = Object.values(allSpots)
// // console.log("this is allSpotsArray", allSpotsArray)
// // const lastCreated = allSpotsArray.length
// // console.log("Is this going to be integer 6", lastCreated)

// //   useEffect(() => {
// //     const errors = []

//     // if(name.length < 3) {
//     //   errors.push("Name must be 3 or more characters")
//     // } else if (name.length > 20) {
//     //   errors.push("Name must be 20 characters or less")
//     // }
//     // if(fruits.find(fruits => fruits.name === name)) {
//     //   errors.push("Name already exists.")
//     // }

//     // if (sweetness < 1 || sweetness > 10){
//     //   errors.push("Sweetness must be between 1 and 10")
//     // }

// //     setValidationErrors(errors)

// //   }, [name, sweetness, fruits])

// const submitHandler = async (e) => {
//   e.preventDefault()

//   const payload = {
//     id: spotId, //THI NEEDS TO BE VARIABLE ID
//     review,
//     star
// }

// let createdSpot;

// createdSpot = dispatch(UpdateReview(payload))

//   history.push("/")

// }

//   return (
//     <form
//       className="spot-form" onSubmit={submitHandler}
//     >
//       <h2>Create a Spot</h2>
//       {/* <ul className="errors">
//         {validationErrors.length > 0 &&
//           validationErrors.map((error) =>
//           <li key={error}>{error}</li>
//         )}
//       </ul> */}
//       <label>
//         Review
//         <input
//           type="text"
//           name="review"
//           onChange={(e)=> setReview(e.target.value)}
//           value={review}
//         />
//       </label>
//       <label>
//         Star
//         <input
//           type="text"
//           name="star"
//           onChange={(e)=> setStar(e.target.value)}
//           value={star}
//         />
//       </label>

//       <button
//         type="submit"
//         // disable={setValidationErrors.length > 0 ? true : false}
//           // disabled={!!validationErrors.length}
//       >
//         UPDATE REVIEW
//       </button>
//     </form>
//   );
// }

// export default UpdateReviewForm;
