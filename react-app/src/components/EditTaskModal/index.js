import { useState } from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { useDispatch, useSelector } from "react-redux";
import { useModal } from "../../context/Modal";
import { updateOneTask } from "../../store/task";
import "./EditTaskModal.css";

function EditTaskModal({task}) {
    const dispatch = useDispatch();
    const history = useHistory();
    const sessionUser = useSelector((state) => state.session.user);
    const projects = useSelector((state) => state.projects.allProjects);
    const allProjects = Object.values(projects);
    const userProjects = allProjects.filter((project) => project.userId === sessionUser.id);
    const [title, setTitle] = useState(task.title);
    const [description, setDescription] = useState(task.description);
    const [dueDate, setDueDate] = useState(task.dueDate.slice(0,10));
    const [projectId, setProjectId] = useState(task.projectId);
    const [errors, setErrors] = useState({});
    const { closeModal } = useModal();
    // console.log("this is dueDate", dueDate);
    // console.log("this is task", task)
    console.log("this is projectId", projectId);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const errorObj = {};

        if (!title) errorObj.title = "Please enter a valid name";
        if (title.length > 50) errorObj.title = "Please enter a name with less than 50 characters";
        if (description.length > 250) errorObj.description = "Please keep you description under 250 characters";
        if (!dueDate) errorObj.dueDate = "Please enter a valid due date";

        task.title = title;
        task.description = description;
        task.due_date = dueDate;

        if (projectId < 1) task.project_id = "";
        else task.project_id = projectId;

        if (Object.values(errorObj).length) {
            setErrors(errorObj);
        } else {
            await dispatch(updateOneTask(task));
            closeModal();
            // history.push(`/tasks/${task.id}`)
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
                        />
                    </div>
                    <div className="create-task-modal-select-field">
                        <select
                            value={projectId}
                            id="select-project"
                            onChange={(e) => setProjectId(e.target.value)}
                        >
                            <option
                                value={""}
                            >Your Projects
                            </option>
                            {
                                userProjects.length > 0 &&
                                userProjects.map((project) => (
                                    <option key={project.id} value={project.id}>{project.title}</option>
                                ))
                            }
                        </select>
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
                            type="submit"
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
