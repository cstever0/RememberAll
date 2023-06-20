import { useState } from "react";
import { useHistory, Redirect } from "react-router-dom/cjs/react-router-dom.min";
import { useDispatch, useSelector } from "react-redux";
import { useModal } from "../../context/Modal";
import { createOneLabel } from "../../store/label";
import "./CreateLabelModal.css";

function CreateLabelModal() {
    const dispatch = useDispatch();
    const sessionUser = useSelector((state) => state.session.user);
    const [title, setTitle] = useState("");
    const [errors, setErrors] = useState([]);
    const { closeModal } = useModal();

    if (!sessionUser) return <Redirect to="/login" />;

    const handleSubmit = async (e) => {
        e.preventDefault();
        // const errorObj = {};

        // if (!title) errorObj.title = "Please enter a name for this project";
        // if (title.length > 25) errorObj.title = "Please enter a name with less than 25 characters";

        const item = {
            "title": title
        };

        const label = await dispatch(createOneLabel(item));
        // console.log("label output", label)

        if (label) {
            setErrors(label);
        } else {
            closeModal();
        }
    };

    return (
        <div className="create-project-modal-container">
            <div className="create-project-modal-header">
                <h2>Add label</h2>
            </div>
            <form
                onSubmit={handleSubmit}
                encType="multipart/form-data"
                className="create-project-modal-form"
            >
                <div className="modal-error-container">
                    {errors?.map((error, idx) => <p key={idx}>{error}</p>)}
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
                            Add
                        </button>
                    </div>
                </div>
            </form>
        </div>
    )
};

export default CreateLabelModal;
