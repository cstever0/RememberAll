import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { useModal } from "../../context/Modal";
import { deleteOneProject } from "../../store/project";
import "./DeleteProjectModal.css"

export default function DeleteProjectModal({id}) {
    const dispatch = useDispatch();
    const history = useHistory();
    const { closeModal } = useModal();

    const deleteClick = async (e) => {
        e.preventDefault();
        await dispatch(deleteOneProject(id));
        closeModal();
        history.push("/projects");
    };

    return (
        <div className="delete-project-wrapper">
            <div className="confirm-delete-project">
                <h1>Confirm Delete</h1>
                <p>
                    Are you sure you want to delete this project?
                </p>
            </div>
            <div className="delete-project-buttons-container">
                <div className="cancel-delete-project-button">
                    <button onClick={closeModal}>
                        No (Keep project)
                    </button>
                </div>
                <div className="delete-project-button">
                    <button onClick={deleteClick}>
                        Yes (Delete project)
                    </button>
                </div>
            </div>
        </div>
    );
};
