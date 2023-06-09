import { useState } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { updateOneComment } from "../../store/comment";
import "./EditCommentModal.css";

function EditCommentModal({ comment }) {
    const dispatch = useDispatch();
    // const sessionUser = useSelector((state) => state.session.user);
    const [description, setDescription] = useState(comment.description);
    const [errors, setErrors] = useState([]);
    const { closeModal } = useModal();
    // console.log("errors", errors);
    // console.log("comment", comment);

    const handleSubmit = async (e) => {
        e.preventDefault();

        comment.description = description;

        const data = await dispatch(updateOneComment(comment));
        // console.log("data", data)

        if (data) {
            setErrors(data);
        } else {
            setErrors([]);
            closeModal();
        }
    };

    return (
        <div className="edit-comment-modal-container">
            <form
                onSubmit={handleSubmit}
                encType="multipart/form-data"
                className="edit-comment-modal-form"
            >
                <div className="modal-error-container">
                    {errors?.map((error, idx) => <p key={idx}>{error}</p>)}
                </div>
                <div className="edit-comment-modal-details">
                    <textarea
                        id="comment-modal-input"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder="Comment..."
                    />
                </div>
                <div className="edit-comment-modal-submission-container">
                    <div className="edit-comment-modal-cancel-button">
                        <button
                            className="button-type"
                            onClick={closeModal}
                        >
                            Cancel
                        </button>
                    </div>
                    <div className="edit-comment-modal-submit-button">
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

export default EditCommentModal;
