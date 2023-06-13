import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { deleteOneComment } from "../../store/comment";
import "./DeleteCommentModal.css";

function DeleteCommentModal({id}) {
    const dispatch = useDispatch();
    const { closeModal } = useModal();

    const confirmDelete = async (e) => {
        e.preventDefault();
        await dispatch(deleteOneComment(id));
        closeModal();
    };


    return (
        <div className="delete-project-wrapper">
            <div className="confirm-delete-project">
                <h1>Confirm Delete</h1>
                <p>
                    Are you sure you want to delete this comment?
                </p>
            </div>
            <div className="delete-project-buttons-container">
                <div className="cancel-delete-project-button">
                    <button onClick={closeModal}>
                        No (Keep comment)
                    </button>
                </div>
                <div className="delete-project-button">
                    <button onClick={confirmDelete}>
                        Yes (Delete comment)
                    </button>
                </div>
            </div>
        </div>
    )
};

export default DeleteCommentModal;
