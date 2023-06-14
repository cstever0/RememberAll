import { arrayToObj } from "../utilities/arrayToObj";

const ALL_COMMENTS = "api/comments";
const CREATE_COMMENT = "api/comments/new";
const UPDATE_COMMENT = "api/comments/edit";
const DELETE_COMMENT = "api/comments/delete";

const loadAllComments = (comments) => {
    return {
        type: ALL_COMMENTS,
        comments
    };
};

const createNewComment = (comment) => {
    return {
        type: CREATE_COMMENT,
        comment
    };
};

const updateOldComment = (comment) => {
    return {
        type: UPDATE_COMMENT,
        comment
    };
};

const deleteOldComment = (id) => {
    return {
        type: DELETE_COMMENT,
        id
    };
};

export const getAllComments = () => async (dispatch) => {
    const response = await fetch(`/api/comments/`);

    if (response.ok) {
        const comments = await response.json();
        // console.log("this is the fetch's response", comments);
        const commentsObj = arrayToObj(comments.comments);
        dispatch(loadAllComments(commentsObj));
        return response;
    } else if (response.status < 500) {
        const data = await response.json();
        if (data.errors) {
            return data.errors;
        }
    } else {
        return ["An error occurred. Please try again."]
    }
};

export const createOneComment = (comment) => async (dispatch) => {
    const response = await fetch(`/api/comments/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(comment)
    });

    if (response.ok) {
        const comment = await response.json();
        // console.log("this is POST response", comment);
        dispatch(createNewComment(comment));
        return null;
    } else if (response.status < 500) {
        const data = await response.json();
        if (data.errors) {
            return data.errors;
        }
    } else {
        return ["An error occurred. Please try again."];
    }
};

export const updateOneComment = (comment) => async (dispatch) => {
    const response = await fetch(`/api/comments/${comment.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(comment)
    });

    if (response.ok) {
        const comment = await response.json();
        dispatch(updateOldComment(comment));
        return null;
    } else if (response.status < 500) {
        const data = await response.json();
        if (data.errors) {
            return data.errors;
        }
    } else {
        return ["An error occurred. Please try again."]
    }
};

export const deleteOneComment = (id) => async (dispatch) => {
    const response = await fetch(`/api/comments/${id}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
        }
    });

    if (response.ok) {
        dispatch(deleteOldComment(id));
        return null;
    }
};

const initialState = {
    allComments: {},
    oneComment: {}
};

const commentsReducer = (state = initialState, action) => {
    switch (action.type) {
        case ALL_COMMENTS: {
            const newState = { ...state };
            newState.allComments = { ...action.comments };
            return newState
        }
        case CREATE_COMMENT: {
            const newState = { ...state, allComments: { ...state.allComments } };
            newState.allComments[action.comment.id] = action.comment;
            return newState;
        }
        case UPDATE_COMMENT: {
            const newState = { ...state, allComments: { ...state.allComments } };
            newState.allComments[action.comment.id] = action.comment;
            return newState;
        }
        case DELETE_COMMENT: {
            const newState = { ...state, allComments: { ...state.allComments } };
            delete newState.allComments[action.id];
            return newState;
        }
        default:
            return state;
    };
};

export default commentsReducer;
