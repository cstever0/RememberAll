import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllTasks } from "../../store/task";
// import "./TodayTaskPage.css"

const TodayTaskPage = () => {
    const dispatch = useDispatch();
    const tasks = useSelector((state) => state.tasks.allTasks);
    const allTasks = Object.values(tasks);

    useEffect(() => {
        dispatch(getAllTasks());
    }, [dispatch]);

    if (!allTasks.length) return null;

    return (
        <div className="today-tasks-page-container">
            {allTasks.map((task) => <div>{task.title}</div>)}
        </div>
    );
};

export default TodayTaskPage;
