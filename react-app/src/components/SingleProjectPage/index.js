import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, Redirect } from "react-router-dom/cjs/react-router-dom.min";
import { getOneProject } from "../../store/project";
import { getAllTasks } from "../../store/task";
import OpenModalButton from "../OpenModalButton";
import CreateTaskModal from "../CreateTaskModal";
import EditProjectModal from "../EditProjectModal";
import DeleteProjectModal from "../DeleteProjectModal";
import TaskCard from "../TaskCard";
import SidebarNav from "../SidebarNav";
import LoadingSpinner from "../LoadingSpinner";
import "./SingleProjectPage.css"

const SingleProjectPage = () => {
    const dispatch = useDispatch();
    const [isHidden, setIsHidden] = useState(true);
    const { projectId } = useParams();
    const project = useSelector((state) => state.projects.oneProject);
    const labels = useSelector((state) => state.labels.allLabels);
    const allLabels = Object.values(labels);
    const tasks = useSelector((state) => state.tasks.allTasks);
    const allTasks = Object.values(tasks);
    const projectTasks = allTasks.filter(task => task.projectId === project.id);
    const sortedTasks = projectTasks.sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate))
    const sessionUser = useSelector((state) => state.session.user);
    // console.log("allTasks output", allTasks)

    useEffect(() => {
        dispatch(getOneProject(projectId));
        setIsHidden(true);
    }, [dispatch, projectId]);

    useEffect(() => {
        dispatch(getAllTasks());
    }, [dispatch]);

    if (!sessionUser) return <Redirect to="/login" />;

    if (!Object.values(project).length) return <LoadingSpinner />;

    const handleClick = () => {
        setIsHidden(!isHidden);
    };

    const editProjectDropdown = isHidden ? "hidden" : "edit-project-dropdown";

    return (
        <div className="single-project-page-container">
            <SidebarNav />
            <div className="project-tasks-container">
                <div className="single-project-page-header">
                    <div className="single-project-header-details">
                        <h1>{project.title}</h1>
                    </div>
                    <div className="single-project-edit-button">
                        <button onClick={handleClick}>
                            <i className="fas fa-ellipsis-h"></i>
                        </button>
                        <div className="edit-project-dropdown-container">
                            <div className={editProjectDropdown}>
                                <div className="edit-project-modal-button">
                                    <OpenModalButton
                                        buttonText="Edit project"
                                        modalComponent={<EditProjectModal project={project} />}
                                        onButtonClick={handleClick}
                                    />
                                </div>
                                <div className="delete-project-modal-button">
                                    <OpenModalButton
                                        buttonText="Delete project"
                                        modalComponent={<DeleteProjectModal id={project.id} />}
                                        onButtonClick={handleClick}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="single-project-page-tasks-container">
                    <div className="single-project-tasks-section">
                        {
                            sortedTasks.length > 0 &&
                            sortedTasks.map((task) => <TaskCard key={task.id} task={task} project={project} label={allLabels.find((label) => label.id === task.labelId)} />)
                        }
                    </div>
                    <div className="single-project-add-task-button">
                        <OpenModalButton
                            buttonText={<i class="fas fa-plus">Add task</i>}
                            modalComponent={<CreateTaskModal projectId={project.id} />}
                        />
                    </div>
                </div>
            </div>
        </div>
    )
};

export default SingleProjectPage;
