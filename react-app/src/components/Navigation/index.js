import React from 'react';
import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css';
import OpenModalButton from '../OpenModalButton';
// import CreateTaskModal from '../CreateTaskModal';
import CreateTaskModalSelect from '../CreateTaskModalSelect';

function Navigation({ isLoaded }){
	const sessionUser = useSelector(state => state.session.user);
	const [isHidden, setIsHidden] = useState(true);

	// const handleMouseEnter = () => {
	// 	setIsHidden(false);
	// };

	// const handleMouseLeave = () => {
	// 	setIsHidden(true);
	// };

	// if (!sessionUser) return <Redirect to="/login" />;

	const navigationTooltip = isHidden ? "hidden" : "navigation-tooltip"

	return (
		<div className="navigation-container">
			<div className="navigation-left-container">
				<div className="navigation-home-icon">
					<NavLink
						to="/home"
						// onMouseEnter={() => setIsHidden(false)}
						// onMouseLeave={() => setIsHidden(true)}
					>
						<i class="fas fa-home" style={{color: "#ffffff"}}></i>
					</NavLink>
					<div className="navigation-tooltip-container">
						<div className={navigationTooltip}>
							Home
						</div>
					</div>
				</div>
			</div>
			<div className="navigation-right-container">
				<div className="navigation-create-icon">
					<OpenModalButton
						id="navigation-create-icon"
						modalComponent={<CreateTaskModalSelect />}
						buttonText={<i class="fas fa-plus" style={{color: "#ffffff"}}></i>}
					>

					</OpenModalButton>
				</div>
				{isLoaded && (
					<div className="navigation-profile-button">
						<ProfileButton user={sessionUser} />
					</div>
				)}
			</div>
		</div>
	);
}

export default Navigation;
