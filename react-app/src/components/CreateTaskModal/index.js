import { useState } from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { useDispatch, useSelector } from "react-redux";
import { useModal } from "../../context/Modal";
import { createOneTask } from "../../store/task";
import "./CreateTaskModal.css";

function CreateTaskModal({ projectId }) {
    const dispatch = useDispatch();
    const history = useHistory();
    const todayFullDate = new Date();
    const dateChecker = new Date(todayFullDate.setDate(todayFullDate.getDate() - 1));
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [dueDate, setDueDate] = useState("");
    const [errors, setErrors] = useState({});
    const sessionUser = useSelector((state) => state.session.user);
    const { closeModal } = useModal();
    // console.log("dueDate", new Date(dueDate).toDateString());
    // console.log("newDate", new Date().toDateString());
    // console.log("dateChecker", dateChecker.toDateString());
    console.log(description.length)

    const handleSubmit = async (e) => {
        e.preventDefault();
        const errorObj = {};

        if (!title) errorObj.title = "Please enter a valid name";
        if (title.length > 50) errorObj.title = "Please enter a name with less than 50 characters";
        if (description.length > 250) errorObj.description = "Please keep you description under 250 characters";
        if (!dueDate) errorObj.dueDate = "Please enter a valid due date";
        if (new Date(dueDate).getTime() < dateChecker.getTime()) errorObj.dueDate = "Due dates must not be in the past";

        if (!projectId) {
            const item = {
                "title": title,
                "description": description,
                "user_id": sessionUser.id,
                "due_date": dueDate
            };

            // console.log("this is the task dispatch return", task);
            if (Object.values(errorObj).length > 0) {
                setErrors(errorObj);
            } else {
                const task = await dispatch(createOneTask(item));
                closeModal();
                history.push(`/tasks/${task.id}`);
            }
        } else {
            const item = {
                "title": title,
                "description": description,
                "user_id": sessionUser.id,
                "project_id": projectId,
                "due_date": dueDate
            }

            // console.log("this is the task dispatch return", task)
            if (Object.values(errorObj).length > 0) {
                setErrors(errorObj);
                // history.push(`/tasks/${task.id}`)
            } else {
                await dispatch(createOneTask(item));
                closeModal();
            };
        };
    };

    return (
        <div className="create-task-modal-container">
            <form
                onSubmit={handleSubmit}
                encType="multipart/form-data"
                className="create-task-modal-form"
            >
                <div className="modal-error-container">
                    {Object.values(errors).length > 0 &&
                        Object.values(errors).map((error) => {
                            return <p>{error}</p>
                        })
                    }
                </div>
                <div className="create-task-modal-details">
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="Task name"
                    />
                    <textarea
                        type="textarea"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder="Description"
                    />
                </div>
                <div className="create-task-modal-dropdowns">
                    <div className="create-task-modal-date">
                        <input
                            type="date"
                            value={dueDate}
                            onChange={(e) => setDueDate(e.target.value)}
                            min={new Date().toISOString().split('T')[0]}
                        />
                    </div>
                </div>
                <div className="create-task-modal-submission-container">
                    <div className="create-task-modal-cancel-button">
                        <button
                            className="button-type"
                            onClick={closeModal}
                        >
                            Cancel
                        </button>
                    </div>
                    <div className="create-task-modal-submit-button">
                        <button
                            className="button-type"
                            onClick={handleSubmit}
                        >
                            Create task
                        </button>
                    </div>
                </div>
            </form>
        </div>
    )
};

export default CreateTaskModal;
