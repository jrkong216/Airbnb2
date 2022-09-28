// frontend/src/components/Navigation/index.js
import React from 'react';

import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import LoginFormModal from '../LoginFormModal';
import SignupFormModal from '../SignupFormModal'
import './Navigation.css';


function Navigation({ isLoaded }){
  const sessionUser = useSelector(state => state.session.user);

  let sessionLinks;
  if (sessionUser) {
    sessionLinks = (
      <>
      <ProfileButton user={sessionUser} />
      <div className= "Create-a-spot-Button">
        <NavLink to="/spots/new">
      <button>CREATE A SPOT</button>
      </NavLink>
      </div>
      </>

    );
  } else {
    sessionLinks = (
      <>
        <SignupFormModal />
        <LoginFormModal />
      </>
    );
  }

  return (
    <div className= "Home-Nav-Link">
    <ul>
      <li>
        <NavLink exact to="/">Home</NavLink>
        {isLoaded && sessionLinks}
      </li>
    </ul>

    </div>
  );
}

export default Navigation;
