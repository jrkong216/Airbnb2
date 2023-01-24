import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { createBooking, getBookings } from '../../store/bookingsReducer';
import "./BookingCard.css";

const BookingCard = ({spotInfo, numberOfReviews, reviewNumber, spotId}) => {
    const dispatch = useDispatch();
    const history = useHistory();
    const moment = require("moment")
    let [startDate, setStartDate] = useState(moment().format("YYYY-MM-DD"));
    let [endDate, setEndDate] = useState(moment().format("YYYY-MM-DD"));
    const [validationErrors, setValidationErrors] = useState([]);

    // console.log("this is StartDate", startDate)
    // console.log("this is EndDate", endDate)


    const submitHandler = async (e) => {
        e.preventDefault()

        const payload = {
         startDate,
         endDate
      }

      let createdBooking
      try {
        // createdBooking = await dispatch(createBooking(payload, spotId)).then(() => dispatch(getBookings(spotId))).then(() => dispatch(getOneSpot(spotId)))
        createdBooking = await dispatch(createBooking(payload, spotId)).then(() => dispatch(getBookings(spotId)))
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

    return(
<>
<div className="middle-right-container">
                    <div className="top-card-container">
                        <div className="top-inner-card-container">
                    <div className= "spot-card-price-container">
                        <div className= "spot-card-price"> ${spotInfo.price} night</div>
                        <div className="detail-top-info-container">
                                <div className="spot-star">
                                    <i className="fa-solid fa-star fa-xs"></i>
                                </div>
                    <div className="spot-rating">{spotInfo.avgStarRating}</div>
                    <div className="number-of-reviews"> • {numberOfReviews} {reviewNumber} </div>
                            </div>
                        </div>
                        <div className="Inner-Container">
    <form
      className="spot-form" onSubmit={submitHandler}
    >
      {/* <div className="title-box">
      <h2 className="title-words">Book Your Spot</h2>
      </div> */}
      <div className="errors">
        {validationErrors.length > 0 &&
          validationErrors.map((error) =>
          <div key={error}>{error}</div>
        )}
      </div>
      <div className="form-container">
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
      <div className="button-container">
      <button className="Create-Spot-button"
        type="submit"
        // disable={setValidationErrors.length > 0 ? true : false}
          // disabled={!!validationErrors.length}
      >
        Reserve Dates
      </button>
      </div>
    </form>
      </div>

                    </div>

                    </div>

</div>
</>
    )
}


export default BookingCard
