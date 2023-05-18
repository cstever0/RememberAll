import { useState } from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { useDispatch, useSelector } from "react-redux";
import { useModal } from "../../context/Modal";
import { createOneTask } from "../../store/task";
import "./CreateTaskModal.css";

function CreateTaskModal() {
    const dispatch = useDispatch();
    const history = useHistory();
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [dueDate, setDueDate] = useState("");
    const [errors, setErrors] = useState({});
    const sessionUser = useSelector((state) => state.session.user);
    const { closeModal } = useModal();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const errorObj = {};

        if (!title) errorObj.title = "Please enter a valid name";
        if (!dueDate) errorObj.dueDate = "Please enter a valid due date";

        const item = {
            "title": title,
            "description": description,
            "user_id": sessionUser.id,
            "due_date": dueDate
        };

        const task = await dispatch(createOneTask(item));
        console.log("this is the task dispatch return", task)
        if (task) {
            closeModal();
            history.push(`/tasks/${task.id}`)
        } else {
            setErrors(errorObj)
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
                    {Object.values(errors).length &&
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
                        type="datetime-local"
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
                            Create task
                        </button>
                    </div>
                </div>
            </form>
        </div>
    )
};

export default CreateTaskModal;
