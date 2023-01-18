import { csrfFetch } from "./csrf";

const GETREVIEWS = "reviews/GET"
const CREATEREVIEW = "reviews/CREATE"
const UPDATEREVIEW = "reviews/UPDATE"
const DELETEREVIEW = "reviews/DELETE"

export const getReviews = (list) => {
    return {
      type: GETREVIEWS,
      list
    }
  }

  export const createReview = (list) => {
    return {
      type: CREATEREVIEW,
      list
    }}

    export const updateReview = (list) => {
        return {
          type: UPDATEREVIEW,
          list
        }}

    export const removeReview = (id) => {
        return {
            type: DELETEREVIEW,
            id
           }}

export const getAllReviews = (spotId) => async (dispatch) => {
    // console.log("IS the code getting here?")
    const response = await csrfFetch(`/api/spots/${spotId}/reviews`)

    if (response.ok) {
        const reviews = await response.json();
        dispatch(getReviews(reviews.Reviews))
        //NEED TO DOUBLE CHECK IF key is "Reviews"
        // console.log("This is the spots from reducer", reviews)
        return response
    }
}

export const getUserReviews = () => async (dispatch) => {
    // console.log("IS the code getting here?")
    const response = await csrfFetch(`/api/reviews/current`);
// console.log("this is my resposnse from getUSersReview", response)
    if (response.ok) {
        const reviews = await response.json();
        // console.log("This is review", reviews)
        dispatch(getReviews(reviews.Reviews))
        //NEED TO DOUBLE CHECK IF key is "Reviews"
        // console.log("This is the spots from reducer", reviews)
        return response
    }

}



export const CreateReview = (spotId, payload) => async dispatch => {
    // console.log("DID MY CODE REACH HERE")
    const response = await csrfFetch(`/api/spots/${spotId}/reviews`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
    });
    // console.log("WHAT IS IN MY RESPONSE", response)
    if (response.ok) {
        // console.log("DID MY CODE REACH HERE FOR RESPONSE TO BEE OK")
        const info = await response.json()
        dispatch(createReview(info))
        // console.log("THIS IS THE RESPONSE TO KEY INTO", response)
        return response
    }
}

export const UpdateReview = (reviewId,payload) => async (dispatch) => {
    // console.log("IS the code getting here?")
    const response = await csrfFetch(`/api/reviews/${reviewId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
    });

    if (response.ok) {
        // console.log("DID MY CODE REACH HERE FOR RESPONSE TO BEE OK")
        const info = await response.json()
        dispatch(updateReview(info))
        // dispatch(getAllSpots())
        // console.log("THIS IS THE RESPONSE TO KEY INTO", response)
        return response
    }
}


export const DeleteReview = (payload) => async (dispatch) => {
    // console.log("IS the code getting here TO DELETEREVIEW?")
    // console.log("this is payload.reviewID", payload.reviewId)
    const response = await csrfFetch(`/api/reviews/${payload.reviewId}`, {
        method: 'delete',
    });
    console.log("This is the response", response)
    if (response.ok) {
        // console.log("DID MY CODE REACH HERE FOR RESPONSE TO BEE OK")
        const info = await response.json()
        console.log("THIS IS INFO", info)
        dispatch(removeReview(payload.reviewId))
        // console.log("THIS IS THE RESPONSE TO KEY INTO", response)
        return response
    }

}

const initialState = {}

const reviewsReducer = (state = initialState, action) => {
    let newState
    switch(action.type){
        case GETREVIEWS:
            newState = {...state}
            // console.log("thisis action list", action.list)
            action.list.forEach(review => {
                // console.log("this is newstate", newState)
                newState[review.id] = review
                // console.log("this is spot", spot)
                // console.log("this is the new newState after adding spot", newState)
            });
            return newState
            case CREATEREVIEW:
            newState = {...state}
            // console.log("this is the current NewState", newState)
            newState[action.list.id] = action.list
            return newState
        case UPDATEREVIEW:
                newState = {...state}
                newState[action.list.id] = action.list
                return newState
        case DELETEREVIEW:
            newState = {...state}
            delete newState[action.id]
            return newState
            default:
                return state;
    }
}

export default reviewsReducer
