import { csrfFetch } from "./csrf";

const GET = "spots/GET";

const GETONE = "spots/GETONE"
const CREATE = "spots/CREATE";
const UPDATE = "spots/UPDATE"
const DELETE = "spots/DELETE"

export const get = (list) => {
    // console.log("This is the action creator with list", list)
    return {
      type: GET,
      list
    }}

    export const getOne = (list) => {

        return {
          type: GETONE,
          list
        }}

  export const create = (list) => {
    return {
      type: CREATE,
      list
    }}

    export const update = (list) => {
        return {
          type: UPDATE,
          list
        }}

    export const remove = (id) => {
         return {
             type: DELETE,
             id
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

export const getOneSpot = (id) => async (dispatch) => {
    // console.log("IS the code getting here?")
    const response = await csrfFetch(`/api/spots/${id}`)
//READ HERE ABOUT STATE THIS HAS OTHER KEYS TALK TO JUSTIN
    if (response.ok) {
        const spot = await response.json();
        dispatch(getOne(spot))
        // console.log("This is the spots from reducer", spots)
        return response
    }
return response
}

export const CreateSpot = (payload, imagePayload) => async dispatch => {
    console.log("DID MY CODE REACH HERE")
    const response = await csrfFetch('/api/spots', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
    });

    let spotId;
    let spotInfo
    if (response.ok) {
        spotInfo = await response.json()
        spotId = spotInfo.id
    }

    const imgResponse = await csrfFetch(`/api/spots/${spotId}/images`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(imagePayload)
    });

    if(response.ok && imgResponse.ok){
        const imageInfo = await imgResponse.json()
        dispatch(create(spotInfo))
        return spotInfo
    }

}

export const UpdateSpot = (payload) => async (dispatch) => {
    // console.log("IS the code getting here?")
    const response = await csrfFetch(`/api/spots/${payload.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
    });

    if (response.ok) {
        // console.log("DID MY CODE REACH HERE FOR RESPONSE TO BEE OK")
        const info = await response.json()
        dispatch(update(info))
        // dispatch(getAllSpots())
        console.log("THIS IS THE RESPONSE TO KEY INTO", response)
        return response
    }
}

export const DeleteSpot = (payload) => async (dispatch) => {
    // console.log("IS the code getting here?")
    const response = await csrfFetch(`/api/spots/${payload.id}`, {
        method: 'delete',
    });

    if (response.ok) {
        // console.log("DID MY CODE REACH HERE FOR RESPONSE TO BEE OK")
        const info = await response.json()
        console.log("THIS IS INFO", info)
        dispatch(remove(payload.id))
        // console.log("THIS IS THE RESPONSE TO KEY INTO", response)
        return response
    }

}

const initialState = {}

const spotsReducer = (state = initialState, action) => {
    let newState
    switch(action.type){
        case GET:
            newState = {...state}
            action.list.forEach(spot => {
                newState[spot.id] = spot
            });
            return newState
        case GETONE:
            newState = {...state}
            newState[action.list.id] = action.list
            return newState
        case CREATE:
            newState = {...state}
            newState[action.list.id] = action.list
            return newState
        case UPDATE:
            newState = {...state}
            newState[action.list.id] = action.list
            return newState
        case DELETE:
            newState = {...state}
            delete newState[action.id]
            return newState
            default:
                return state;
    }
}

export default spotsReducer
