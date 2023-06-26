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
                        <i id="sidebar-nav-today" class="fas fa-calendar"></i>Today
                    </div>
                </NavLink>
                <NavLink to="/upcoming">
                    <div className="sidebar-nav-task">
                        <i id="sidebar-nav-upcoming" class="fas fa-calendar"></i>Upcoming
                    </div>
                </NavLink>
                <NavLink to="/labels">
                    <div className="sidebar-nav-task">
                        <i id="sidebar-nav-label" class="fas fa-tags"></i>Labels
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
            <div className="sidebar-nav-about-links-container">
                    <div className="side-nav-about-title">
                        Creator Links
                    </div>
                    <div className="side-nav-about-links">
                        <a href="https://github.com/cstever0/RememberAll" target="_blank" rel="noreferrer"><i class="fab fa-github"></i>Project Repository</a>
						<a href="https://github.com/cstever0" target="_blank" rel="noreferrer"><i class="fab fa-github"></i>Github Profile</a>
                        <a href="https://cstever0.github.io/" target="_blank" rel="noreferrer"><i class="fa fa-user"></i>Portfolio</a>
                        <a href="https://www.linkedin.com/in/cory-stever-aa2730126/" target="_blank" rel="noreferrer"><i class="fab fa-linkedin"></i>LinkedIn</a>
						<a href="https://wellfound.com/u/cory-stever" target="_blank" rel="noreferrer"><i class="fab fa-angellist"></i>WellFound</a>
                    </div>
            </div>
        </div>
    );
};

export default SidebarNav;
