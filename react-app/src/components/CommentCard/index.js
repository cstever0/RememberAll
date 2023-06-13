import { useState } from "react";
import OpenModalButton from "../OpenModalButton";
import "./CommentCard.css";

export default function CommentCard({ comment }) {
    const [isHiddenButton, setIsHiddenButton] = useState(true);
    const [isHiddenDropdown, setIsHiddenDropdown] = useState(true);
    const postDate = new Date(comment.createdAt).toDateString().slice(0, -5);


    const editCommentButton = isHiddenButton ? "hidden" : "edit-comment-button"
    const editCommentDropdown = isHiddenDropdown ? "hidden" : "edit-comment-dropdown";

    return (
        <div
            className="comment-card-container"
            onMouseEnter={() => setIsHiddenButton(false)}
            onMouseLeave={() => setIsHiddenButton(true)}
        >
            <div className={editCommentButton}>
                <button onClick={() => setIsHiddenDropdown(!isHiddenDropdown)}>
                    <i className="fas fa-ellipsis-h"></i>
                </button>
                <div className="edit-comment-dropdown-container">
                    <div className={editCommentDropdown}>
                        <div className="edit-comment-modal-button">
                            <OpenModalButton
                                buttonText="Edit comment"
                                // modalComponent={}
                                onButtonClick={() => setIsHiddenDropdown(true)}
                            />
                        </div>
                        <div>
                            <OpenModalButton
                                buttonText="Delete comment"
                                // modalComponent={}
                                onButtonClick={() => setIsHiddenDropdown(true)}
                            />
                        </div>
                    </div>
                </div>
            </div>
            <div className="comment-card-details">
                <div className="comment-description">
                    {comment.description}
                </div>
                <div className="comment-card-date">
                    {postDate}
                </div>
            </div>
        </div>
    )
};
