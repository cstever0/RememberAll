import React from 'react';
import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css';

function Navigation({ isLoaded }){
	const sessionUser = useSelector(state => state.session.user);
	const [isHidden, setIsHidden] = useState(true);

	const handleMouseEnter = () => {
		setIsHidden(false);
	};

	const handleMouseLeave = () => {
		setIsHidden(true);
	};

	const navigationTooltip = isHidden ? "hidden" : "navigation-tooltip"

	return (
		<div className="navigation-container">
			<div className="navigation-left-container">
				<div className="navigation-home-icon">
					<NavLink
						to="/home"
						onMouseEnter={handleMouseEnter}
						onMouseLeave={handleMouseLeave}
					>
						<i class="fas fa-home"></i>
					</NavLink>
					<div className="navigation-tooltip-container">
						<div className={navigationTooltip}>
							Home
						</div>
					</div>
				</div>
			</div>
			<div className="navigation-right-container">
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
