import { useState } from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { useDispatch, useSelector } from "react-redux";
import { useModal } from "../../context/Modal";
import { createOneTask } from "../../store/task";
// import "./CreateTaskModal.css";

function CreateTaskProject() {
    const dispatch = useDispatch();
    const history = useHistory();
    const todayFullDate = new Date();
    const sessionUser = useSelector((state) => state.session.user);
    const projects = useSelector((state) => state.projects.allProjects);
    const allProjects = Object.values(projects);
    const userProjects = allProjects.filter((project) => project.userId === sessionUser.id);
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [dueDate, setDueDate] = useState("");
    const [projectId, setProjectId] = useState();
    const [errors, setErrors] = useState({});
    const { closeModal } = useModal();
    // console.log("userProjects output", userProjects)
    console.log("projectId", projectId)

    const handleSubmit = async (e) => {
        e.preventDefault();
        const errorObj = {};

        if (!title) errorObj.title = "Please enter a valid name";
        if (!dueDate) errorObj.dueDate = "Please enter a valid due date";
        if (new Date(dueDate).getTime() < todayFullDate.getTime()) errorObj.dueDate = "Due dates must not be in the past";

        if (!projectId) {
            const item = {
                "title": title,
                "description": description,
                "user_id": sessionUser.id,
                "due_date": dueDate
            };


            const task = await dispatch(createOneTask(item));
            // console.log("this is the task dispatch return", task);
            if (task) {
                closeModal();
                history.push(`/tasks/${task.id}`);
            } else {
                setErrors(errorObj)
            }
        } else {
            const item = {
                "title": title,
                "description": description,
                "user_id": sessionUser.id,
                "project_id": projectId,
                "due_date": dueDate
            }

            const task = await dispatch(createOneTask(item));
            // console.log("this is the task dispatch return", task)
            if (task) {
                closeModal();
                history.push(`/projects/${projectId}`)
            } else {
                setErrors(errorObj);
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
                        min={new Date().toISOString().split('T')[0]}
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

export default CreateTaskProject;
