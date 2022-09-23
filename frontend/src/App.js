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
import CreateReviewForm from "./components/CreateReviewForm"
import CurrentUserSpots from "./components/CurrentUserSpots"


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
          {/* <Route path="/signup">
            <SignupFormPage />
          </Route> */}
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
          <Route path="/current/user">
            <CurrentUserSpots/>
          </Route>
        </Switch>
      )}
    </>
  );
}

export default App;
