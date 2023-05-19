import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllProjects } from "../../store/project";
import SidebarNav from "../SidebarNav";
import ProjectCard from "../ProjectCard";
import OpenModalButton from '../OpenModalButton';
import CreateProjectModal from "../CreateProjectModal";
import "./AllProjectsPage.css";

const AllProjectsPage = () => {
    const dispatch = useDispatch();
    const projects = useSelector((state) => state.projects.allProjects);
    const allProjects = Object.values(projects);

    useEffect(() => {
        dispatch(getAllProjects());
    }, [dispatch]);

    return (
        <div className="all-projects-page-container">
            <SidebarNav />
            <div className="all-projects-container">
                <div className="all-projects-list-container">
                    <div className="all-projects-header-container">
                        <h2>Projects</h2>
                        <OpenModalButton
                            buttonText="+ Add project"
                            modalComponent={<CreateProjectModal />}
                        />
                    </div>
                    <div className="all-projects-list">
                        {
                            allProjects.length > 0 &&
                            allProjects.map((project) => <ProjectCard key={project.id} project={project} />)
                        }
                    </div>
                </div>
            </div>
        </div>
    )
};

export default AllProjectsPage;
