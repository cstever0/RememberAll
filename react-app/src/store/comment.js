import { arrayToObj } from "../utilities/arrayToObj";

const ALL_COMMENTS = "api/comments";

const loadAllComments = (comments) => {
    return {
        type: ALL_COMMENTS,
        comments
    };
};

export const getAllComments = () => async (dispatch) => {
    const response = await fetch()
}
