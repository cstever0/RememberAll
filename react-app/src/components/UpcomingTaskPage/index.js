import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllTasks } from "../../store/task";
import { Redirect } from "react-router-dom/cjs/react-router-dom.min";
import SidebarNav from "../SidebarNav";
import TaskCard from "../TaskCard";
import monthObj from "../../utilities/monthObj";
import "./UpcomingTaskPage.css"
import LoadingSpinner from "../LoadingSpinner";

const UpcomingTaskPage = () => {
    const dispatch = useDispatch();
    const tasks = useSelector((state) => state.tasks.allTasks);
    const projects = useSelector((state) => state.projects.allProjects);
    const sessionUser = useSelector((state) => state.session.user);
    const todayFullDate = new Date();
    const allTasks = Object.values(tasks);
    const sortedTasks = allTasks.sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate));
    const month = todayFullDate.getMonth();
    const day = todayFullDate.getDate();
    // console.log("this is new Date", todayFullDate)
    // console.log("projects output", projects[17])

    useEffect(() => {
        dispatch(getAllTasks());
    }, [dispatch]);

    if (!sessionUser) return <Redirect to="/login" />;
    if (!allTasks.length) return <LoadingSpinner />;

    return (
        <div className="today-tasks-page-container">
            <SidebarNav />
            <div className="today-tasks-container">
                <div className="today-tasks-list-container">
                    <div className="today-date-container">
                        <h2>All Tasks</h2>
                        {/* <p>{monthObj[month]}, {day}</p> */}
                    </div>
                    {
                        sortedTasks.length > 0 &&
                        sortedTasks.map((task) => <TaskCard key={task.id} task={task} project={projects[task.projectId]} />)
                    }
                </div>
            </div>
        </div>
    );
};

export default UpcomingTaskPage;
