import React, { useState, useEffect, useRef } from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { useDispatch } from "react-redux";
import { logout } from "../../store/session";
// import OpenModalButton from "../OpenModalButton";
// import LoginFormModal from "../LoginFormModal";
// import SignupFormModal from "../SignupFormModal";

function ProfileButton({ user }) {
  const dispatch = useDispatch();
  const history = useHistory();
  const [showMenu, setShowMenu] = useState(false);
  const ulRef = useRef();

  const openMenu = () => {
    if (showMenu) return;
    setShowMenu(true);
  };

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = (e) => {
      if (!ulRef.current.contains(e.target)) {
        setShowMenu(false);
      }
    };

    document.addEventListener("click", closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  const handleLogout = async (e) => {
    e.preventDefault();
    await dispatch(logout());
    history.push("/")
  };

  const ulClassName = "profile-dropdown" + (showMenu ? "" : " hidden");
  // const closeMenu = () => setShowMenu(false);

  return (
    <div className="profile-button-container">
      <button onClick={openMenu}>
        <i className="fas fa-user-circle" />
      </button>
      <div className="profile-dropdown-container">
        {user && (
          <ul className={ulClassName} ref={ulRef}>
            <li>Hello, {user.username}</li>
            <li>{user.email}</li>
            <div className="dropdown-logout-button">
              <button
                onClick={handleLogout}
                className="button-type"
              >

                Log Out
              </button>
            </div>
          </ul>
        )}
      </div>
    </div>
  );
};

export default ProfileButton;
