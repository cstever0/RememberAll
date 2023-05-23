import { arrayToObj } from "../utilities/arrayToObj";

const ALL_TASKS = "api/tasks";
const ONE_TASK = "api/tasks/taskId";
const CREATE_TASK = "api/tasks/new";
const UPDATE_TASK = "api/tasks/edit";
const DELETE_TASK = "api/tasks/delete";

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
    };
};

const createNewTask = (task) => {
    return {
        type: CREATE_TASK,
        task
    };
};

const updateOldTask = (task) => {
    return {
        type: UPDATE_TASK,
        task
    };
};

const deleteOldTask = (id) => {
    return {
        type: DELETE_TASK,
        id
    };
};

export const getAllTasks = () => async (dispatch) => {
    const response = await fetch(`/api/tasks/`);

    if (response.ok) {
        const tasks = await response.json();
        // console.log("this is the fetch's response", tasks.tasks);
        const tasksObj = arrayToObj(tasks.tasks);
        dispatch(loadAllTasks(tasksObj));
        return response;
    };
};

export const getOneTask = (id) => async (dispatch) => {
    const response = await fetch(`/api/tasks/${id}`);

    if (response.ok) {
        const task = await response.json();
        // console.log("this is the task response", task)
        dispatch(loadOneTask(task.task))
        return response;
    }
};

export const createOneTask = (task) => async (dispatch) => {
    const response = await fetch("/api/tasks/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(task)
    });

    if (response.ok) {
        const task = await response.json();
        // console.log("this is the task response", task)
        dispatch(createNewTask(task));
        return task;
    }
};

export const updateOneTask = (task) => async (dispatch) => {
    const response = await fetch(`/api/tasks/${task.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(task)
    });

    if (response.ok) {
        const task = await response.json();
        // console.log("this is the task response", task)
        dispatch(updateOldTask(task));
        return task;
    };
};

export const deleteOneTask = (id) => async (dispatch) => {
    const response = await fetch(`/api/tasks/${id}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
        }
    });

    if (response.ok) {
        const task = await response.json();
        dispatch(deleteOldTask(id));
        return task;
    };
};

const initialState = {
    allTasks: {},
    oneTask: {}
};

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
        case CREATE_TASK: {
            const newState = { ...state, allTasks: { ...state.allTasks } };
            newState.allTasks[action.task.id] = action.task;
            return newState;
        }
        case UPDATE_TASK: {
            const newState = { ...state, allTasks: { ...state.allTasks } };
            // const newState = { ...state, allTasks: { ...state.allTasks }, oneTask: { ...state.oneTask } };
            newState.allTasks[action.task.id] = action.task;
            newState.oneTask = action.task;
            return newState;
        }
        case DELETE_TASK: {
            const newState = { ...state, allTasks: { ...state.allTasks } };
            delete newState.allTasks[action.id];
            return newState;
        }
        default:
            return state;
    };
};

export default tasksReducer;
