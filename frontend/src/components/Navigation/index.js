// frontend/src/components/Navigation/index.js
import React from 'react';
import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import LoginFormModal from '../LoginFormModal';
import SignupFormPage from '../SignupFormPage'
import './Navigation.css';
import { Modal} from '../../context/Modal'

function Navigation({ isLoaded }){
  const sessionUser = useSelector(state => state.session.user);
  const [showSignUpModal, setShowSignUpModal] = useState(false);
// pass setShowSignUpModal to SignupFormPage
  let sessionLinks;
  if (sessionUser) {
    sessionLinks = (
      <ProfileButton user={sessionUser} />
    );
  } else {
    sessionLinks = (
      <>
      <button onClick= {() => setShowSignUpModal(true)}>Sign Up</button>
        <LoginFormModal />
        {/* <NavLink to="/signup">Sign Up</NavLink> */}
        {showSignUpModal && (
        <Modal onClose={() => setShowSignUpModal(false)}>
          <SignupFormPage showSignUpModal={setShowSignUpModal}/>
        </Modal>
      )}
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
    <div className = "Creat-a-Spot-button">
                   <NavLink to="/spots/new">
                   <button type="submit">CREATE A SPOT</button>
                   </NavLink>
                </div>
    </div>
  );
}

export default Navigation;
