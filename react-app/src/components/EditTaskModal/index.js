import { useState } from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { useDispatch, useSelector } from "react-redux";
import { useModal } from "../../context/Modal";
import { updateOneTask } from "../../store/task";
import "./EditTaskModal.css";

function EditTaskModal({task}) {
    const dispatch = useDispatch();
    const history = useHistory();
    const [title, setTitle] = useState(task.title);
    const [description, setDescription] = useState(task.description);
    const [dueDate, setDueDate] = useState(task.dueDate.slice(0,10));
    const [errors, setErrors] = useState({});
    const sessionUser = useSelector((state) => state.session.user);
    const { closeModal } = useModal();
    console.log("this is dueDate", dueDate)

    const handleSubmit = async (e) => {
        e.preventDefault();
        const errorObj = {};

        if (!title) errorObj.title = "Please enter a name for this task";
        if (!dueDate) errorObj.dueDate = "Please enter a valid due date";

        task.title = title
        task.description = description
        task.due_date = dueDate

        const updatedTask = await dispatch(updateOneTask(task));
        console.log("this is the task dispatch return", updatedTask);
        if (Object.values(errorObj).length) {
            setErrors(errorObj);
            // history.push(`/tasks/${task.id}`)
        } else {
            closeModal();
        }
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
                    <input
                        type="textarea"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder="Description"
                    />
                </div>
                <div className="create-task-modal-date">
                    <input
                        type="date"
                        value={dueDate}
                        onChange={(e) => setDueDate(e.target.value)}
                    />
                </div>
                <div className="create-task-modal-submission-container">
                    <div className="create-task-modal-submission-buttons">
                        <button
                            className="button-type"
                            onClick={closeModal}
                        >
                            Cancel
                        </button>
                        <button
                            className="button-type"
                            onClick={handleSubmit}
                        >
                            Save
                        </button>
                    </div>
                </div>
            </form>
        </div>
    )
};

export default EditTaskModal;
