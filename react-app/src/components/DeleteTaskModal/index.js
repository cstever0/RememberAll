import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { useModal } from "../../context/Modal";
import { deleteOneTask } from "../../store/task";
import "./DeleteTaskModal.css"

export default function DeleteTaskModal({id}) {
    const dispatch = useDispatch();
    const history = useHistory();
    const { closeModal } = useModal();

    const deleteClick = async (e) => {
        e.preventDefault();
        await dispatch(deleteOneTask(id));
        closeModal();
        history.push("/home");
    };

    return (
        <div className="delete-task-wrapper">
            <div className="confirm-delete-task">
                <h1>Confirm Delete</h1>
                <p>
                    Are you sure you want to delete this task?
                </p>
            </div>
            <div className="delete-task-buttons">
                <button onClick={closeModal}>
                    No (Keep task)
                </button>
                <button onClick={deleteClick}>
                    Yes (Delete task)
                </button>
            </div>
        </div>
    );
};
