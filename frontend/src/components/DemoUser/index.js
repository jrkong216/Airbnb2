import React, { useState } from "react";
import * as sessionActions from "../../store/session";
import { useDispatch } from "react-redux";

function DemoUser(){
    const dispatch = useDispatch();

    const handleDemoUser = (e) => {
        e.preventDefault();
        return dispatch(sessionActions.login(
            { credential: 'Demo-lition',
              password: "password" }))
    }
    return(
        <button onClick={handleDemoUser}>SignUp as a Demo User</button>
    )
}















export default DemoUser
