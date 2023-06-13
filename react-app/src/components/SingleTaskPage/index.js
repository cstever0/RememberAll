import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, Redirect } from "react-router-dom";
import { getOneTask } from "../../store/task";
import { createOneComment, getAllComments } from "../../store/comment";
import OpenModalButton from "../OpenModalButton";
import EditTaskModal from "../EditTaskModal";
import DeleteTaskModal from "../DeleteTaskModal";
import SidebarNav from "../SidebarNav";
import CommentCard from "../CommentCard";
import "./SingleTaskPage.css";
import CatchPage from "../404Page";

const SingleTaskPage = () => {
    const dispatch = useDispatch();
    const { taskId } = useParams();
    const sessionUser = useSelector((state) => state.session.user);
    const task = useSelector((state) => state.tasks.oneTask);
    const projects = useSelector((state) => state.projects.allProjects);
    const allProjects = Object.values(projects);
    const taskProject = allProjects.find((project) => project.id === task.projectId);
    const comments = useSelector((state) => state.comments.allComments);
    const allComments = Object.values(comments);
    const taskComments = allComments.filter((comment) => comment.taskId === task.id)
    const sortedComments = taskComments.sort((a, b) => b.id - a.id);
    const [isHidden, setIsHidden] = useState(true);
    const [description, setDescription] = useState("");
    const [errors, setErrors] = useState([]);
    const dueDate = new Date(task.dueDate).toDateString();
    const dueDateTime = new Date(task.dueDate).getTime()
    const todayFullDate = new Date();
    const dateChecker = new Date(todayFullDate.setDate(todayFullDate.getDate() - 1));
    const overDue = dueDateTime < dateChecker.getTime();
    // console.log("this is task", task);
    // console.log("this is projects", taskProject)
    // console.log("allComments", sortedComments)

    useEffect(() => {
        dispatch(getOneTask(taskId))
    }, [dispatch, taskId]);

    useEffect(() => {
        dispatch(getAllComments())
    }, [dispatch, taskId]);

    if (!sessionUser) return <Redirect to="/login" />;

    if (!Object.values(task).length) return <CatchPage />;

    const handleClick = () => {
        setIsHidden(!isHidden)
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const item = {
            "description": description,
            // "user_id": sessionUser.id,
            "task_id": task.id
        };

        const comment = await dispatch(createOneComment(item));
        // console.log("comment output", comment)

        if (comment) {
            setErrors(comment);
        } else {
            setDescription("");
            setErrors([]);
        }
    };

    // const { comments } = task.comments;
    // console.log("this is comments", comments);
    const editTaskDropdown = isHidden ? "hidden" : "edit-task-dropdown";
    const overDueClass = overDue ? "red" : "blue";

    return (
        <div className="single-task-page-container">
            <SidebarNav />
            <div>
                <div className="single-task-page-header">
                    <div className="single-task-header-details">
                        <h1>{task.title}</h1>
                        <h4 className={overDueClass}>{dueDate}</h4>
                    </div>
                    <div className="single-task-header-details-right">
                        <div className="single-task-edit-button">
                            <button onClick={handleClick}>
                                <i className="fas fa-ellipsis-h"></i>
                            </button>
                            <div className="edit-task-dropdown-container">
                                <div className={editTaskDropdown}>
                                    <div className="edit-task-modal-button">
                                        <OpenModalButton
                                            buttonText="Edit task..."
                                            modalComponent={<EditTaskModal task={task} />}
                                            onButtonClick={() => setIsHidden(true)}
                                        />
                                    </div>
                                    <div className="delete-task-modal-button">
                                        <OpenModalButton
                                            buttonText="Delete task..."
                                            modalComponent={<DeleteTaskModal id={task.id} />}
                                            onButtonClick={() => setIsHidden(true)}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="single-task-details-container">
                    <div className="single-task-description">
                        <p>{task.description}</p>
                    </div>
                    <div className="single-task-project-details">
                        <h3>Project</h3>
                        <p id="task-project-title">
                            {
                                taskProject?.title ?
                                    <a href={`/projects/${taskProject.id}`}>{taskProject.title}</a>:
                                    "No assigned project"
                            }
                        </p>
                    </div>
                </div>
                <div className="single-task-page-comments-container">
                    <div className="single-task-comment-form">
                        <form
                            onSubmit={handleSubmit}
                            encType="multipart/form-data"
                            className="create-comment-form"
                        >
                            <div className="comment-error-container">
                                {errors?.map((error, idx) => <p key={idx}>{error}</p>)}
                            </div>
                            <div className="create-comment-details">
                                <textarea
                                    id="comment-input"
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                    placeholder="Comment"
                                />
                            </div>
                            <div className="create-comment-submit-button">
                                <button
                                    type="submit"
                                    className="button-type"
                                >
                                    Post comment
                                </button>
                            </div>
                        </form>
                    </div>
                    <div className="single-task-comment-section">
                        {
                            sortedComments.length > 0 ?
                                sortedComments.map((comment) => {
                                   return <CommentCard key={comment.id} comment={comment} />
                                })
                                :
                                <p>Add a comment about this task!</p>
                        }
                    </div>
                </div>

            </div>
        </div>
    );
};

export default SingleTaskPage;
