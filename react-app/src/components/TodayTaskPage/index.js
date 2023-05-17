import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllTasks } from "../../store/task";
import TaskCard from "../TaskCard";
import monthObj from "../../utilities/monthObj";
import "./TodayTaskPage.css"

const TodayTaskPage = () => {
    const dispatch = useDispatch();
    const tasks = useSelector((state) => state.tasks.allTasks);
    const allTasks = Object.values(tasks);
    const todayFullDate = new Date();
    const month = todayFullDate.getMonth();
    const day = todayFullDate.getDate();

    useEffect(() => {
        dispatch(getAllTasks());
    }, [dispatch]);

    if (!allTasks.length) return null;

    return (
        <div className="today-tasks-page-container">
            <div className="today-date-container">
                <h2>Today</h2>
                <p>{monthObj[month]}, {day}</p>
            </div>
            {allTasks.map((task) => <TaskCard key={task.id} task={task}/>)}
        </div>
    );
};

export default TodayTaskPage;
