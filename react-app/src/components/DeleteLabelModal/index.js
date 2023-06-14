import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { useModal } from "../../context/Modal";
import { deleteOneLabel } from "../../store/label";
import "./DeleteLabelModal.css"

function DeleteLabelModal({id}) {
    const dispatch = useDispatch();
    const history = useHistory();
    const { closeModal } = useModal();

    const confirmDelete = async (e) => {
        e.preventDefault();
        await dispatch(deleteOneLabel(id));
        closeModal();
        history.push("/labels");
    };

    return (
        <div className="delete-project-wrapper">
            <div className="confirm-delete-project">
                <h1>Confirm Delete</h1>
                <p>
                    Are you sure you want to delete this label?
                </p>
            </div>
            <div className="delete-project-buttons-container">
                <div className="cancel-delete-project-button">
                    <button onClick={closeModal}>
                        No (Keep label)
                    </button>
                </div>
                <div className="delete-project-button">
                    <button onClick={confirmDelete}>
                        Yes (Delete label)
                    </button>
                </div>
            </div>
        </div>
    );
};

export default DeleteLabelModal;
