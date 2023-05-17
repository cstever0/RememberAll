import { arrayToObj } from "../utilities/arrayToObj";

const ALL_TASKS = "api/tasks";

const loadAllTasks = (tasks) => {
    return {
        type: ALL_TASKS,
        tasks
    };
};

export const getAllTasks = () => async (dispatch) => {
    const response = await fetch(`/api/tasks/`);

    if (response.ok) {
        const tasks = await response.json();
        // console.log("this is the fetch's response", tasks.tasks);
        const tasksObj = arrayToObj(tasks.tasks)
        dispatch(loadAllTasks(tasksObj))
        return response;
    };
};

const initialState = {
    allTasks : {},
    oneTask: {}
}

const tasksReducer = (state = initialState, action) => {
    switch(action.type) {
        case ALL_TASKS: {
            const newState = { ...state };
            newState.allTasks = { ...action.tasks };
            return newState;
        }
        default:
            return state;
    };
};

export default tasksReducer;
