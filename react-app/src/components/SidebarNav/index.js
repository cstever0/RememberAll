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
                <div className="sidebar-nav-task">
                    <NavLink to="/home">
                        Today
                    </NavLink>
                </div>
                <div className="sidebar-nav-task">
                    <NavLink to="/upcoming">
                        Upcoming
                    </NavLink>
                </div>
            </div>
            <div className="sidebar-nav-project-cards-container">
                <div className="side-nav-project-cards">
                    <NavLink to="/projects">
                        Projects
                    </NavLink>
                    {
                        allProjects.length > 0 &&
                        allProjects.map((project) => <ProjectCard key={project.id} project={project}/>)
                    }
                </div>
            </div>
        </div>
    );
};

export default SidebarNav;
