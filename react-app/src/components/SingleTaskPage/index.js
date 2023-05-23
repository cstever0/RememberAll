import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, Redirect } from "react-router-dom";
import { getOneTask } from "../../store/task";
import OpenModalButton from "../OpenModalButton";
import EditTaskModal from "../EditTaskModal";
import DeleteTaskModal from "../DeleteTaskModal";
import SidebarNav from "../SidebarNav";
import "./SingleTaskPage.css";

const SingleTaskPage = () => {
    const dispatch = useDispatch();
    const { taskId } = useParams();
    const sessionUser = useSelector((state) => state.session.user);
    const task = useSelector((state) => state.tasks.oneTask);
    const projects = useSelector((state) => state.projects.allProjects);
    const allProjects = Object.values(projects);
    const taskProject = allProjects.find((project) => project.id === task.projectId)
    const [isHidden, setIsHidden] = useState(true);
    // console.log("this is task", task);
    console.log("this is projects", taskProject)

    useEffect(() => {
        dispatch(getOneTask(taskId))
    }, [dispatch, taskId]);

    if (!sessionUser) return <Redirect to="/login" />;

    if (!Object.values(task).length) return null;

    const handleClick = () => {
        setIsHidden(!isHidden)
    };

    // const { comments } = task.comments;
    // console.log("this is comments", comments);
    const editTaskDropdown = isHidden ? "hidden" : "edit-task-dropdown"

    return (
        <div className="single-task-page-container">
            <SidebarNav />
            <div>
                <div className="single-task-page-header">
                    <div className="single-task-header-details">
                        <h1>{task.title}</h1>
                        <h4>{ }</h4>
                        <p>{task.description}</p>
                    </div>
                    <div className="single-task-header-details-right">
                        <div className="single-task-edit-button">
                            <button onClick={handleClick}>
                                <i className="fas fa-ellipsis-h"></i>
                            </button>
                            <div className="edit-task-dropdown-container">
                                <div className={editTaskDropdown}>
                                    <OpenModalButton
                                        buttonText="Edit task..."
                                        modalComponent={<EditTaskModal task={task} />}
                                    />
                                    <OpenModalButton
                                        buttonText="Delete task..."
                                        modalComponent={<DeleteTaskModal id={task.id} />}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="single-task-project-container">
                            <h3>Project</h3>
                            <p>{
                                taskProject?.title ?
                                taskProject.title :
                                "No assigned project"
                                }
                            </p>
                        </div>
                    </div>
                </div>
                <div className="single-task-page-comments-container">
                    <div className="single-task-comment-input">
                        <input
                            type="text"
                            id="comment-input"
                            placeholder="Comment"
                            disabled
                        />
                    </div>
                    <div className="single-task-comment-section">
                        {/* {comments.map((comment) => {
                        return <div>{comment.description}</div>
                    })} */}
                        <p>Comments Section Coming Soon!</p>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default SingleTaskPage;
