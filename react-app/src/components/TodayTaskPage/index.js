import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllTasks } from "../../store/task";
import SidebarNav from "../SidebarNav";
import TaskCard from "../TaskCard";
import monthObj from "../../utilities/monthObj";
import "./TodayTaskPage.css"

const TodayTaskPage = () => {
    const dispatch = useDispatch();
    const tasks = useSelector((state) => state.tasks.allTasks);
    const projects = useSelector((state) => state.projects.allProjects);
    const allTasks = Object.values(tasks);
    const todayFullDate = new Date();
    const month = todayFullDate.getMonth();
    const day = todayFullDate.getDate();
    // console.log("this is new Date", todayFullDate)
    // console.log("projects output", projects[17])

    useEffect(() => {
        dispatch(getAllTasks());
    }, [dispatch]);

    // if (!allTasks.length) return null;

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
                        allTasks.length > 0 &&
                        allTasks.map((task) => <TaskCard key={task.id} task={task} project={projects[task.projectId]} />)
                    }
                </div>
            </div>
        </div>
    );
};

export default TodayTaskPage;
