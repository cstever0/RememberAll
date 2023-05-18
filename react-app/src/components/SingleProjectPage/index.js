import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, Redirect } from "react-router-dom/cjs/react-router-dom.min";
import { getOneProject } from "../../store/project";
import OpenModalButton from "../OpenModalButton";
import CreateTaskModal from "../CreateTaskModal";
import TaskCard from "../TaskCard";
import "./SingleProjectPage.css"
import { getAllTasks } from "../../store/task";

const SingProjectPage = () => {
    const dispatch = useDispatch();
    const [isHidden, setIsHidden] = useState(true);
    const { projectId } = useParams();
    const project = useSelector((state) => state.projects.oneProject);
    const tasks = useSelector((state) => state.tasks.allTasks);
    const allTasks = Object.values(tasks)
    const projectTasks = allTasks.filter(task => task.projectId == project.id)
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
                                // modalComponent={}
                            />
                            <OpenModalButton
                                buttonText="Delete project"
                                // modalComponent={}
                            />
                        </div>
                    </div>
                </div>
            </div>
            <div className="single-project-page-tasks-container">
                <div className="single-project-tasks-section">
                    {
                        projectTasks.length > 0 &&
                        projectTasks.map((task) => <TaskCard key={task.id} task={task} />)
                    }
                </div>
                <div className="single-project-add-task-button">
                    <OpenModalButton
                        buttonText="+ Add task"
                        modalComponent={<CreateTaskModal projectId={project.id}/>}
                    />
                </div>
            </div>
        </div>
    )
};

export default SingProjectPage;
