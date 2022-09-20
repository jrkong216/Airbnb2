import { csrfFetch } from "./csrf";

const GET = "spots/GET";
const CREATE = "spots/CREATE";

export const get = (list) => {
    console.log("This is the action creator with list", list)
    return {
      type: GET,
      list
    }}

  export const create = (list) => {
    return {
      type: CREATE,
      list
    }}

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

export const CreateSpot = (payload) => async dispatch => {
    // console.log("DID MY CODE REACH HERE")
    const response = await csrfFetch('/api/spots', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
    });
    // console.log("WHAT IS IN MY RESPONSE", response)
    if (response.ok) {
        // console.log("DID MY CODE REACH HERE FOR RESPONSE TO BEE OK")
        const info = await response.json()
        dispatch(create(info))

    }
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
        case CREATE:
            newState = {...state}
            console.log("this is the current NewState", newState)
            newState[action.list.id] = action.list
            return newState
            default:
                return state;
    }
}

export default spotsReducer
