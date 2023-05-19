import { arrayToObj } from "../utilities/arrayToObj";

const ALL_PROJECTS = "api/projects";
const ONE_PROJECT = "api/projects/projectId";
const CREATE_PROJECT = "api/projects/new";

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

export const getAllProjects = () => async (dispatch) => {
    const response = await fetch(`/api/projects/`);

    if (response.ok) {
        const projects = await response.json();
        const projectsObj = arrayToObj(projects.projects);
        dispatch(loadAllProjects(projectsObj))
        return response;
    };
};

const initialState = {
    allProjects: {},
    oneProject: {}
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
        default:
            return state;
    };
};

export default projectsReducer;
