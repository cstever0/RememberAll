import { arrayToObj } from "../utilities/arrayToObj";

const ALL_PROJECTS = "api/projects";
const ONE_PROJECT = "api/projects/projectId";
const CREATE_PROJECT = "api/projects/new";
const UPDATE_PROJECT = "api/projects/edit";
const DELETE_PROJECT = "api/projects/delete"

const loadAllProjects = (projects) => {
    return {
        type: ALL_PROJECTS,
        projects
    };
};

const loadOneProject = (project) => {
    return {
        type: ONE_PROJECT,
        project
    };
};

const createNewProject = (project) => {
    return {
        type: CREATE_PROJECT,
        project
    };
};

const updateOldProject = (project) => {
    return {
        type: UPDATE_PROJECT,
        project
    };
};

const deleteOldProject = (id) => {
    return {
        type: DELETE_PROJECT,
        id
    };
};

export const getAllProjects = () => async (dispatch) => {
    const response = await fetch(`/api/projects/`);

    if (response.ok) {
        const projects = await response.json();
        const projectsObj = arrayToObj(projects.projects);
        dispatch(loadAllProjects(projectsObj));
        return response;
    };
};

export const getOneProject = (id) => async (dispatch) => {
    const response = await fetch(`/api/projects/${id}`);

    if (response.ok) {
        const project = await response.json();
        dispatch(loadOneProject(project.project));
        return response;
    };
};

export const createOneProject = (project) => async (dispatch) => {
    const response = await fetch("/api/projects/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(project)
    });

    if (response.ok) {
        const project = await response.json();
        // console.log("this is the project response", project)
        dispatch(createNewProject(project));
        return project;
    };
};

export const updateOneProject = (project) => async (dispatch) => {
    const response = await fetch(`/api/projects/${project.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(project)
    });

    if (response.ok) {
        const project = await response.json();
        // console.log("this is the project response", project)
        dispatch(updateOldProject(project));
        return project;
    };
};

export const deleteOneProject = (id) => async (dispatch) => {
    const response = await fetch(`/api/tasks/${id}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
        }
    });

    if (response.ok) {
        const project = await response.json();
        dispatch(deleteOldProject(id));
        return project;
    }
};

const initialState = {
    allProjects: {},
    oneProject: {}
};

const projectsReducer = (state = initialState, action) => {
    switch(action.type) {
        case ALL_PROJECTS: {
            const newState = { ...state };
            newState.allProjects = { ...action.projects };
            return newState;
        }
        case ONE_PROJECT: {
            const newState = { ...state };
            newState.oneProject = { ...action.project };
            return newState;
        }
        case CREATE_PROJECT: {
            const newState = { ...state, allProjects: { ...state.allProjects } };
            newState.allProjects[action.project.id] = action.project;
            return newState;
        }
        case UPDATE_PROJECT: {
            const newState = { ...state, allProjects: { ...state.allProjects } };
            newState.allProjects[action.project.id] = action.project;
            newState.oneProject = action.project
            return newState;
        }
        case DELETE_PROJECT: {
            const newState = { ...state, allProjects: { ...state.allProjects } };
            delete newState.allProjects[action.id];
            return newState;
        }
        default:
            return state;
    };
};

export default projectsReducer;
