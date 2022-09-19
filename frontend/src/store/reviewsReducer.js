import { csrfFetch } from "./csrf";

const GET = "reviews/GET"


export const get = (list) => {
    return {
      type: GET,
      list
    }
  }

export const getAllReviews = (spotId) => async (dispatch) => {
    console.log("IS the code getting here?")
    const response = await csrfFetch(`/api/spots/${spotId}/reviews`)

    if (response.ok) {
        const reviews = await response.json();
        dispatch(get(reviews.Reviews))
        console.log("This is the spots from reducer", reviews)
        return response
    }

}

const initialState = {}

const reviewsReducer = (state = initialState, action) => {
    let newState
    switch(action.type){
        case GET:
            newState = {...state}
            // console.log("thisis action list", action.list)
            action.list.forEach(review => {
                // console.log("this is newstate", newState)
                newState[review.id] = review
                // console.log("this is spot", spot)
                // console.log("this is the new newState after adding spot", newState)
            });
            return newState
            default:
                return state;
    }
}

export default reviewsReducer
