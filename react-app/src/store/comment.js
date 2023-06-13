import { arrayToObj } from "../utilities/arrayToObj";

const ALL_COMMENTS = "api/comments";

const loadAllComments = (comments) => {
    return {
        type: ALL_COMMENTS,
        comments
    };
};

export const getAllComments = () => async (dispatch) => {
    const response = await fetch(`/api/comments/`);

    if (response.ok) {
        const comments = await response.json();
        // console.log("this is the fetch's response", comments);
        const commentsObj = arrayToObj(comments.comments);
        dispatch(loadAllComments(commentsObj));
        return response
    } else if (response.status < 500) {
        const data = await response.json();
        if (data.errors) {
            return data.errors;
        }
    } else {
        return ["An error occurred. Please try again."]
    }
};


const initialState = {
    allComments: {},
    oneComment: {}
};

const commentsReducer = (state = initialState, action) => {
    switch(action.type) {
        case ALL_COMMENTS: {
            const newState = { ...state };
            newState.allComments = { ...action.comments };
            return newState
        }
        default:
            return state;
    };
};

export default commentsReducer;
