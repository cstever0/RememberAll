import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllTasks } from "../../store/task";
import SidebarNav from "../SidebarNav";
import TaskCard from "../TaskCard";
import monthObj from "../../utilities/monthObj";
import "./TodayTaskPage.css"
import LoadingSpinner from "../LoadingSpinner";

const TodayTaskPage = () => {
    const dispatch = useDispatch();
    const tasks = useSelector((state) => state.tasks.allTasks);
    const projects = useSelector((state) => state.projects.allProjects);
    // const sessionUser = useSelector((state) => state.session.user);
    const todayFullDate = new Date();
    const todayTasks = Object.values(tasks).filter(task => new Date(task.dueDate).getTime() <= todayFullDate.getTime());
    const sortedTasks = todayTasks.sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate))
    const month = todayFullDate.getMonth();
    const day = todayFullDate.getDate();
    // console.log("this is new Date", todayFullDate)
    // console.log("projects output", projects[17])
    // console.log("allTasks filtered", sortedTasks)

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
                        <h2>Today</h2>
                        <p>{monthObj[month]}, {day}</p>
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

export default TodayTaskPage;
