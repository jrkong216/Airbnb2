// frontend/src/components/Navigation/ProfileButton.js
import React, { useState, useEffect } from "react";
import { useDispatch } from 'react-redux';
import * as sessionActions from '../../store/session';
import { NavLink, useHistory } from 'react-router-dom';
import { Modal } from '../../context/Modal'
import LoginFormModal from '../LoginFormModal';
import SignupFormModal from '../SignupFormModal';
import SignupForm from '../SignupFormModal/SignupForm'
import LoginForm from '../LoginFormModal/LoginForm'


import './ProfileButton.css'

function ProfileButton({ user }) {
  const dispatch = useDispatch();
  const history = useHistory()
  const [showMenu, setShowMenu] = useState(false);
  const [showSignUpModal, setShowSignUpModal] = useState(false);
  const [showLogInModal, setShowLogInModal] = useState(false);

  const openMenu = () => {
    if (showMenu) return;
    setShowMenu(true);
  };

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = () => {
      setShowMenu(false);
    };

    document.addEventListener('click', closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  const logout = (e) => {
    e.preventDefault();
    dispatch(sessionActions.logout())
    history.push("/");
  };

let loggedInOrNot;
if (user){
  loggedInOrNot =(
    <>
    <button className="actual-button" onClick={openMenu}>
        <div className="profile-button-container">
      <span className="fa-solid fa-bars fa-2x"></span>
      <span className="fa-solid fa-circle-user fa-2x"></span>
      </div>
      </button>
      {showMenu && (
        <div className="dropdown-content">
          
          <div>{user.username}</div>
          <div>{user.email}</div>
          <NavLink to={`/current/user`}>My Spots</NavLink>
          <div>
            <button onClick={logout}>Log Out</button>
          </div>
        </div>
      )}
    </>
  )
} else{
  loggedInOrNot = (
    <>
    <button className="actual-button" onClick={openMenu}>
        <div className="profile-button-container">
      <span className="fa-solid fa-bars fa-2x"></span>
      <span className="fa-solid fa-circle-user fa-2x"></span>
      </div>
      </button>
      {showMenu && (
        <div className="dropdown-content">
        <div className="sign-up-text" onClick={() => setShowSignUpModal(true)}>Sign Up</div>
        <div className="log-in-text" onClick={() => setShowLogInModal(true)}>Log In</div>
        </div>
        )}
        {showSignUpModal && (
        <Modal onClose={() => setShowSignUpModal(false)}>
          <SignupForm />

        </Modal>
      )}
      {showLogInModal && (
        <Modal onClose={() => setShowLogInModal(false)}>

          <LoginForm />
        </Modal>
      )}

    </>
  )
}

  return (
    <>
      {loggedInOrNot}
    </>
  );
}

export default ProfileButton;
