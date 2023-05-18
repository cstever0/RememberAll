import { arrayToObj } from "../utilities/arrayToObj";

const ALL_TASKS = "api/tasks";
const ONE_TASK = "api/tasks/oneTask"

const loadAllTasks = (tasks) => {
    return {
        type: ALL_TASKS,
        tasks
    };
};

const loadOneTask = (task) => {
    return {
        type: ONE_TASK,
        task
    }
}

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

export const getOneTask = (id) => async (dispatch) => {
    const response = await fetch(`/api/tasks/${id}`);

    if (response.ok) {
        const task = await response.json();
        // console.log("this is the task response", task)
        dispatch(loadOneTask(task.task))
        return response
    }
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
        case ONE_TASK: {
            const newState = { ...state };
            newState.oneTask = { ...action.task};
            return newState;
        }
        default:
            return state;
    };
};

export default tasksReducer;
