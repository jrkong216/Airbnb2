import { csrfFetch } from "./csrf"


const READ = 'bookings/READ'
const CREATE = 'bookings/CREATE'
const UPDATE = 'bookings/UPDATE'
const DELETE = 'bookings/DELETE'


export const read = (list) => {

    return {
    type: READ,
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

export const removeBooking = (id) => {
    return {
         type: DELETE,
         id
        }}



export const getBookings = (spotId) => async (dispatch) => {
    console.log("did it get here")
    const response = await fetch(`/api/spots/${spotId}/bookings`);
    console.log("did it get here 2")
    console.log("this is response", response)
    if(response.ok) {
        const bookings = await response.json();
        console.log("bookings is", bookings)
        dispatch(read(bookings))
        return response
    }
}

export const getUserBookings = () => async (dispatch) => {
    const response = await fetch(`/api/bookings/current`);
    if(response.ok) {
        const bookings = await response.json();
        dispatch(read(bookings))
        return response
    }
}

export const createBooking = (payload, spotid) => async dispatch => {

    const response = await csrfFetch(`/api/spots/${spotid}/bookings`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(payload)
    })

    if(response.ok) {
        const info = await response.json()
        dispatch(create(info))
        return info
    }
}

export const updateBooking = (payload, bookingId) => async dispatch => {

    const response = await csrfFetch(`/api/bookings/${bookingId}`, {
        method: 'PUT',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(payload)
    })

    if(response.ok) {
        const info = await response.json()
        dispatch(update(info))
        return response
    }
}

export const DeleteBooking = (bookingId) => async dispatch => {
    const response = await csrfFetch(`/api/bookings/${bookingId}`, {
        method: 'DELETE',
    })

    if (response.ok) {
        // console.log("DID MY CODE REACH HERE FOR RESPONSE TO BEE OK")
        const info = await response.json()

        dispatch(removeBooking(bookingId))
        // console.log("THIS IS THE RESPONSE TO KEY INTO", response)
        return response
    }


}

const initalState = {

}

const bookingsReducer = (state = initalState, action) => {
    let newState
    switch(action.type) {
        case READ:
            newState = {...state}
            action.list.Bookings.forEach(booking => {
                // console.log("this is newstate", newState)
                newState[booking.id] = booking
                // console.log("this is spot", spot)
                // console.log("this is the new newState after adding spot", newState)
            });
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
            return state
    }
}

export default bookingsReducer
