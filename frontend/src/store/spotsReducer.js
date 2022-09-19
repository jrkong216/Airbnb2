import { csrfFetch } from "./csrf";

const GET = "spots/GET"


export const get = (list) => {
    return {
      type: GET,
      list
    }
  }

export const getAllSpots = () => async (dispatch) => {
    // console.log("IS the code getting here?")
    const response = await csrfFetch(`/api/spots`)

    if (response.ok) {
        const spots = await response.json();
        dispatch(get(spots.Spots))
        // console.log("This is the spots from reducer", spots)
        return response
    }
    return response
}

const initialState = {}

const spotsReducer = (state = initialState, action) => {
    let newState
    switch(action.type){
        case GET:
            newState = {...state}
            // console.log("thisis action list", action.list)
            action.list.forEach(spot => {
                // console.log("this is newstate", newState)
                newState[spot.id] = spot
                // console.log("this is spot", spot)
                // console.log("this is the new newState after adding spot", newState)
            });
            return newState
            default:
                return state;
    }
}

export default spotsReducer
