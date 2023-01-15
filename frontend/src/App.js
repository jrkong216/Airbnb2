// frontend/src/App.js
import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
// import SignupFormPage from "./components/SignupFormPage";
import * as sessionActions from "./store/session";
import Navigation from "./components/Navigation";

import Spots from "./components/Spots"
import CreateSpotsForm from "./components/CreateSpotsForm"
import SpotDetails from "./components/SpotDetails"
import UpdateSpotForm from "./components/UpdateSpotForm"
import UpdateReviewForm from "./components/UpdateReviewForm"
import UpdateBookingForm from "./components/UpdateBookingForm"
import CreateReviewForm from "./components/CreateReviewForm"
import CurrentUserSpots from "./components/CurrentUserSpots"
import CurrentUserReviews from "./components/CurrentUserReviews"
import CurrentUserBookings from "./components/CurrentUserBookings"


function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
      <Navigation isLoaded={isLoaded} />
      {isLoaded && (
        <Switch>
          <Route exact path="/">
            <Spots/>
          </Route>
          <Route path="/spots/new">
            <CreateSpotsForm/>
          </Route>
          <Route path='/spots/:spotId'>
            <SpotDetails />
          </Route>
          <Route exact path='/spot/:spotId/edit'>
            <UpdateSpotForm/>
          </Route>
          <Route path="/review/:spotId/new">
            <CreateReviewForm/>
          </Route>
          <Route exact path="/current/user/reviews">
            <CurrentUserReviews/>
          </Route>
          <Route exact path="/current/user/bookings">
            <CurrentUserBookings/>
          </Route>
          <Route exact path="/current/user/bookings/:bookingId">
            <UpdateBookingForm/>
          </Route>
          <Route exact path="/current/user/reviews/:reviewId">
            <UpdateReviewForm/>
          </Route>
          <Route path="/current/user">
            <CurrentUserSpots/>
          </Route>
        </Switch>
      )}
    </>
  );
}

export default App;
