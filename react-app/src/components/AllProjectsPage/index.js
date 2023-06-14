import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllProjects } from "../../store/project";
import { Redirect } from "react-router-dom/cjs/react-router-dom.min";
import SidebarNav from "../SidebarNav";
import ProjectCard from "../ProjectCard";
import OpenModalButton from '../OpenModalButton';
import CreateProjectModal from "../CreateProjectModal";
import LoadingSpinner from "../LoadingSpinner";
import "./AllProjectsPage.css";

const AllProjectsPage = () => {
    const dispatch = useDispatch();
    const projects = useSelector((state) => state.projects.allProjects);
    const allProjects = Object.values(projects);
    const sessionUser = useSelector((state) => state.session.user);

    useEffect(() => {
        dispatch(getAllProjects());
    }, [dispatch]);

    if (!sessionUser) return <Redirect to="/login" />;

    if (!projects) return <LoadingSpinner />

    return (
        <div className="all-projects-page-container">
            <SidebarNav />
            <div className="all-projects-container">
                <div className="all-projects-list-container">
                    <div className="all-projects-header-container">
                        <h2>Projects</h2>
                        <OpenModalButton
                            modalComponent={<CreateProjectModal />}
                            buttonText={<i class="fas fa-plus">Add project</i>}
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
