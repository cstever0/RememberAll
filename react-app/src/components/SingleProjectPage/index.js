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
import "./SingleProjectPage.css"

const SingProjectPage = () => {
    const dispatch = useDispatch();
    const [isHidden, setIsHidden] = useState(true);
    const { projectId } = useParams();
    const project = useSelector((state) => state.projects.oneProject);
    const tasks = useSelector((state) => state.tasks.allTasks);
    const allTasks = Object.values(tasks)
    const projectTasks = allTasks.filter(task => task.projectId === project.id)
    const sessionUser = useSelector((state) => state.session.user);
    console.log("allTasks output", allTasks)

    useEffect(() => {
        dispatch(getOneProject(projectId))
    }, [dispatch, projectId])

    useEffect(() => {
        dispatch(getAllTasks())
    }, [dispatch])

    if (!sessionUser) return <Redirect to="/login" />;

    if (!Object.values(project).length) return null;

    const handleClick = () => {
        setIsHidden(!isHidden)
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
                                <OpenModalButton
                                    buttonText="Edit project"
                                    modalComponent={<EditProjectModal project={project} />}
                                />
                                <OpenModalButton
                                    buttonText="Delete project"
                                    modalComponent={<DeleteProjectModal id={project.id} />}
                                />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="single-project-page-tasks-container">
                    <div className="single-project-tasks-section">
                        {
                            projectTasks.length > 0 &&
                            projectTasks.map((task) => <TaskCard key={task.id} task={task} project={project} />)
                        }
                    </div>
                    <div className="single-project-add-task-button">
                        <OpenModalButton
                            buttonText="+ Add task"
                            modalComponent={<CreateTaskModal projectId={project.id} />}
                        />
                    </div>
                </div>
            </div>
        </div>
    )
};

export default SingProjectPage;
