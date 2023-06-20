import { arrayToObj } from "../utilities/arrayToObj";

const ALL_LABELS = "api/labels";
const ONE_LABEL = "api/labels/labelId";
const CREATE_LABEL = "api/labels/new";
const UPDATE_LABEL = "api/labels/edit";
const DELETE_LABEL = "api/labels/delete";

const loadAllLabels = (labels) => {
    return {
        type: ALL_LABELS,
        labels
    };
};

const loadOneLabel = (label) => {
    return {
        type: ONE_LABEL,
        label
    };
};

const createNewLabel = (label) => {
    return {
        type: CREATE_LABEL,
        label
    };
};

const updateOldLabel = (label) => {
    return {
        type: UPDATE_LABEL,
        label
    };
};

const deleteOldLabel = (id) => {
    return {
        type: DELETE_LABEL,
        id
    };
};

export const getAllLabels= () => async (dispatch) => {
    const response = await fetch(`/api/labels/`);

    if (response.ok) {
        const labels = await response.json();
        // console.log("this is the fetch's response", labels);
        const labelsObj = arrayToObj(labels.labels);
        dispatch(loadAllLabels(labelsObj));
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

export const getOneLabel = (id) => async (dispatch) => {
    const response = await fetch(`/api/labels/${id}`);

    if (response.ok) {
        const label = await response.json();
        // console.log("this is the fetch's response", label);
        dispatch(loadOneLabel(label.label));
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

export const createOneLabel = (label) => async (dispatch) => {
    const response = await fetch(`/api/labels/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(label)
    });

    if (response.ok) {
        const label = await response.json();
        // console.log("this is POST response", label);
        dispatch(createNewLabel(label));
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

export const updateOneLabel = (label) => async (dispatch) => {
    const response = await fetch(`/api/labels/${label.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(label)
    });

    if (response.ok) {
        const label = await response.json();
        dispatch(updateOldLabel(label));
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

export const deleteOneLabel = (id) => async (dispatch) => {
    const response = await fetch(`/api/labels/${id}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
        }
    });

    if (response.ok) {
        dispatch(deleteOldLabel(id));
        return null;
    }
};

const initialState = {
    allLabels: {},
    oneLabel: {}
};

const labelsReducer = (state = initialState, action) => {
    switch(action.type) {
        case ALL_LABELS: {
            const newState = { ...state };
            newState.allLabels = { ...action.labels };
            return newState;
        }
        case ONE_LABEL: {
            const newState = { ...state };
            newState.oneLabel = { ...action.label };
            return newState;
        }
        case CREATE_LABEL: {
            const newState = { ...state, allLabels: { ...state.allLabels } };
            newState.allLabels[action.label.id] = action.label;
            return newState;
        }
        case UPDATE_LABEL: {
            const newState = { ...state, allLabels: { ...state.allLabels } };
            newState.allLabels[action.label.id] = action.label;
            newState.oneLabel = action.label
            return newState;
        }
        case DELETE_LABEL: {
            const newState = { ...state, allLabels: { ...state.allLabels } };
            delete newState.allLabels[action.id];
            return newState;
        }
        default:
            return state;
    };
};

export default labelsReducer;
