import { NavLink } from "react-router-dom/cjs/react-router-dom.min";

const SidebarNav = () => {

    return (
        <div className="sidebar-nav-container">
            <div className="sidebar-nav-task-container">
                <div className="sidebar-nav-task">
                    <NavLink to="/home">
                        Today
                    </NavLink>
                </div>
                <div className="sidebar-nav-task">
                    {/* <NavLink>
                        Upcoming
                    </NavLink> */}
                </div>
            </div>
        </div>
    );
};

export default SidebarNav;
