import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, Redirect } from "react-router-dom";
import { getOneTask } from "../../store/task";
import OpenModalButton from "../OpenModalButton";
import "./SingleTaskPage.css";

const SingleTaskPage = () => {
    const dispatch = useDispatch();
    const [isHidden, setIsHidden] = useState(true)
    const { taskId } = useParams();
    const task = useSelector((state) => state.tasks.oneTask);
    const sessionUser = useSelector((state) => state.session.user);
    console.log("this is task", task);

    useEffect(() => {
        dispatch(getOneTask(taskId))
    }, [dispatch, taskId]);

    if (!sessionUser) return <Redirect to="/login" />;

    if (!Object.values(task).length) return null;

    const handleClick = () => {
        setIsHidden(!isHidden)
    };

    const { comments } = task.comments;
    console.log("this is comments", comments);
    console.log(comments[0].description)
    const editTaskDropdown = isHidden ? "hidden" : "edit-task-dropdown"

    return (
        <div className="single-task-page-container">
            <div className="single-task-page-header">
                <div className="single-task-header-details">
                    <h1>{task.title}</h1>
                    <p>{task.description}</p>
                </div>
                <div className="single-task-edit-button">
                    <button onClick={handleClick}>
                        <i className="fas fa-ellipsis-h"></i>
                    </button>
                    <div className="edit-task-dropdown-container">
                        <div className={editTaskDropdown}>
                            <OpenModalButton
                                buttonText="Edit task..."
                                // modalComponent={}
                            />
                            <OpenModalButton
                                buttonText="Delete task..."
                                // modalComponent={}
                            />
                        </div>
                    </div>
                </div>
            </div>
            <div className="single-task-page-comments-container">
                <div className="single-task-comment-input">
                    <input
                    type="text"
                    id="comment-input"
                    placeholder="Comment"
                    />
                </div>
                <div className="single-task-comment-section">
                    {comments.map((comment) => {
                        return <div>{comment.description}</div>
                    })}
                    {/* {comments[0].description} */}
                </div>
            </div>
        </div>
    );
};

export default SingleTaskPage;
