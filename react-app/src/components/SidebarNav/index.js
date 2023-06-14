import { NavLink } from "react-router-dom/cjs/react-router-dom.min";
import { useDispatch, useSelector } from "react-redux";
import { getAllProjects } from "../../store/project";
import { useEffect } from "react";
import "./SidebarNav.css"
import ProjectCard from "../ProjectCard";

const SidebarNav = () => {
    const dispatch = useDispatch();
    const projects = useSelector((state) => state.projects.allProjects);
    const allProjects = Object.values(projects);

    useEffect(() => {
        dispatch(getAllProjects());
    }, [dispatch]);

    return (
        <div className="sidebar-nav-container">
            <div className="sidebar-nav-task-container">
                <NavLink to="/home">
                    <div className="sidebar-nav-task">
                        <i class="fas fa-calendar"></i>Today
                    </div>
                </NavLink>
                <NavLink to="/upcoming">
                    <div className="sidebar-nav-task">
                        <i class="fas fa-calendar"></i>Upcoming
                    </div>
                </NavLink>
                <NavLink to="/labels">
                    <div className="sidebar-nav-task">
                        <i class="fas fa-calendar"></i>Labels
                    </div>
                </NavLink>
            </div>
            <div className="sidebar-nav-project-cards-container">
                <NavLink to="/projects">
                    <div className="side-nav-projects-title">
                        Projects
                    </div>
                </NavLink>
                <div className="side-nav-project-cards">
                    {
                        allProjects.length > 0 &&
                        allProjects.map((project) => <ProjectCard key={project.id} project={project} />)
                    }
                </div>
            </div>
        </div>
    );
};

export default SidebarNav;
