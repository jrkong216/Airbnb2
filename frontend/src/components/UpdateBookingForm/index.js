import { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux"
import { updateBooking, getBookings, getUserBookings } from '../../store/bookingsReducer';
import { getAllSpots }  from '../../store/spotsReducer'
import "./UpdateBookingForm.css"
import { getAllReviews } from "../../store/reviewsReducer";

function UpdateBookingForm() {
const moment = require("moment")
const { bookingId } = useParams()
const dispatch = useDispatch();
    const history = useHistory();

    let allBookings = useSelector(state => Object.values(state.bookings));
    let currBooking = allBookings.filter(booking => booking.id === parseInt(bookingId));
    console.log("this is currBooking", currBooking)
    let sessionUser = useSelector(state => state.session.user);
console.log("this is currBooking.spotId", currBooking[0]?.spotId)
    const spotInfo = useSelector(state => state.spots[currBooking[0]?.spotId])
    console.log("this is spotInfo", spotInfo)
    let [startDate, setStartDate] = useState(moment(currBooking[0]?.startDate.slice(0,10)).format("YYYY-MM-DD"));
    let [endDate, setEndDate] = useState(moment(currBooking[0]?.endDate.slice(0,10)).format("YYYY-MM-DD"));

    const [validationErrors, setValidationErrors] = useState([]);



useEffect(() => {
  dispatch(getUserBookings())
  dispatch(getAllSpots())
}, [dispatch])

// useEffect(() => {
//   setStartDate(currBooking.startDate)
//   setEndDate(currBooking.endDate)
// }, [])

const submitHandler = async (e) => {
  e.preventDefault()

  const payload = {
   startDate,
   endDate
}

let updatedBooking
try {
  // createdBooking = await dispatch(createBooking(payload, spotId)).then(() => dispatch(getBookings(spotId))).then(() => dispatch(getOneSpot(spotId)))
  updatedBooking = await dispatch(updateBooking(payload, bookingId)).then(() => dispatch(getBookings(bookingId)))
  history.push("/current/user/bookings")
}

catch (res) {
  const data = await res.json();
  console.log("this is data", data)
  const errors = [];
  if (data && data.message) {
      errors.push(data.message);
  }
  setValidationErrors(errors);
}
}

  return (
    <div className="Outer-Update-Container">
        <div className="Inner-Update-Container">
    <form
      className="spot-form" onSubmit={submitHandler}
    >
      <div className="title-update-box">
      <h2>Edit Your Booking</h2>
      </div>
      <div className="errors">
        {validationErrors.length > 0 &&
          validationErrors.map((error) =>
          <div key={error}>{error}</div>
        )}
      </div>
      <div className="form-Update-container">
      <label>
        Start Date
        <input
        className="form-inputs"
        required
          type="date"
          name="startDate"
          onChange={(e)=> setStartDate(e.target.value)}
        //   min = {disabledDates.toISOString().slice(0, -8)}
          min = {new Date().toISOString().split("T")[0]}
          value={startDate}
        />
      </label>
      <label>
        End Date
        <input
        className="form-inputs"
        required
          type="date"
          name="endDate"
          onChange={(e)=> setEndDate(e.target.value)}
          min = {new Date().toISOString().split("T")[0]}
          value={endDate}
        />
      </label>
      <div className = "bookingpricecontainer">
                    <div className = "underlinethis">${spotInfo.price} x {(Math.abs(new Date(endDate) - new Date(startDate)))/86400000} nights</div>
                    <div>${spotInfo.price * (Math.abs(new Date(endDate) - new Date(startDate)))/86400000} </div>
                </div>
                <div className = "bookingpricecontainer">
                    <div className = "underlinethis">Cleaning fee</div>
                    <div>$80</div>
                </div>

                <div className = "bookingpricecontainer">
                    <div className = "underlinethis">Service fee</div>
                    <div>$50 </div>
                </div>
        <div className = "TotalContainer">
                    <div className = "taxestotal">Total before taxes</div>
                    <div className = "taxestotal">${80 + 50 + spotInfo.price * (Math.abs(new Date(endDate) - new Date(startDate)))/86400000} </div>
        </div>
      </div>

      <div className="button-Update-container">
      <button className="Update-Button"
        type="submit"
        // disable={setValidationErrors.length > 0 ? true : false}
          // disabled={!!validationErrors.length}
      >
        Edit Booking
      </button>
      </div>
    </form>
    </div>
    </div>
  );
}
export default UpdateBookingForm;
