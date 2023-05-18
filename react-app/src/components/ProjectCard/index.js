import { NavLink } from "react-router-dom/cjs/react-router-dom.min";
import "./ProjectCard.css";

const ProjectCard = ({ project }) => {

    return(
        <NavLink
            to={`/projects/${project.id}`}
        >
            <div className="project-card-container">
                <div className="project-card-title">
                    <p>{project.title}</p>
                </div>
            </div>
        </NavLink>
    );
};

export default ProjectCard;
