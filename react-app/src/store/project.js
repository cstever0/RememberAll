import { arrayToObj } from "../utilities/arrayToObj";

const ALL_PROJECTS = "api/projects";
const ONE_PROJECT = "api/projects/projectId";

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
        default:
            return state;
    };
};

export default projectsReducer;
