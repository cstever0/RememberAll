import { useState } from "react";
import { Redirect } from "react-router-dom/cjs/react-router-dom.min";
import { useDispatch, useSelector } from "react-redux";
import { useModal } from "../../context/Modal";
import { updateOneProject } from "../../store/project";
import "./EditProjectModal.css";


function EditProjectModal({project}) {
    const dispatch = useDispatch();
    // const history = useHistory();
    const [title, setTitle] = useState(project.title);
    const [errors, setErrors] = useState({});
    const sessionUser = useSelector((state) => state.session.user);
    const { closeModal } = useModal();

    if (!sessionUser) return <Redirect to="/login" />;

    const handleSubmit = async (e) => {
        e.preventDefault();
        const errorObj = {};

        if (!title) errorObj.title = "Please enter a name for this project";
        if (title.length > 25) errorObj.title = "Please enter a name with less than 25 characters";

        project.title = title;

        if (Object.values(errorObj).length) {
            setErrors(errorObj);
        } else {
            closeModal();
            await dispatch(updateOneProject(project));
            // console.log("this is the project dispatch return", updatedProject);
        }
    };

    return (
        <div className="create-project-modal-container">
            <div className="create-project-modal-header">
                <h2>Edit project</h2>
            </div>
            <form
                onSubmit={handleSubmit}
                encType="multipart/form-data"
                className="create-project-modal-form"
            >
                <div className="modal-error-container">
                    {
                        Object.values(errors).length > 0 &&
                        Object.values(errors).map((error) => {
                            return <p>{error}</p>
                        })
                    }
                </div>
                <div className="create-project-modal-details">
                    <label className="create-project-modal-label">
                        Name
                    </label>
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    >
                    </input>
                </div>
                <div className="create-project-modal-submission-container">
                    <div className="create-project-modal-cancel-button">
                        <button
                            className="button-type"
                            onClick={closeModal}
                        >
                            Cancel
                        </button>
                    </div>
                    <div className="create-project-modal-submit-button">
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

export default EditProjectModal;
