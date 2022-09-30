// frontend/src/components/Navigation/index.js
import React from 'react';

import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import LoginFormModal from '../LoginFormModal';
import SignupFormModal from '../SignupFormModal'
import './Navigation.css';
import airbnb2 from './Images/airbnb2.png'


function Navigation({ isLoaded }){
  const sessionUser = useSelector(state => state.session.user);

  let sessionLinks;
  if (sessionUser) {
    sessionLinks = (
      <>
       <div className= "Create-a-spot-Button">
        <NavLink to="/spots/new">
      <button>CREATE A SPOT</button>
      </NavLink>
      </div>
      <div className= "profile-button">
      <ProfileButton user={sessionUser}/>
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
    <div className="navbar-main">
    <div className= "Home-Container">
        <NavLink exact to="/"><img className='logo' src={airbnb2}/></NavLink>

    </div>

    <div className="Right-Side-Container">
      {isLoaded && sessionLinks}
    </div>
    </div>

  );
}

export default Navigation;
