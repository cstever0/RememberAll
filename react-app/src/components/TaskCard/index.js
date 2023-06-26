import { NavLink } from "react-router-dom/cjs/react-router-dom.min";
// import OpenModalButton from "../OpenModalButton";
import "./TaskCard.css";

export default function TaskCard({ task, project }) {
    const displayDueDate = new Date(task.dueDate).toDateString();
    const dueDateTime = new Date(task.dueDate).getTime()
    const todayFullDate = new Date();
    const dateChecker = new Date(todayFullDate.setDate(todayFullDate.getDate() - 1));
    // console.log("task output", task);
    // console.log("project output", project);
    const overdue = dueDateTime < dateChecker.getTime() ? "task-card-due-date red" : "task-card-due-date"

    return (
        <NavLink key={task.id} to={`/tasks/${task.id}`}>
            <div className="task-card-container">
                <div className="task-card-title">
                    <h2>{task.title}</h2>
                </div>
                <div className="task-card-details-container">
                    <div className={overdue}>
                        {displayDueDate}
                    </div>
                    <div className="task-card-project">
                        {
                            project?.title ?
                                project.title
                                :
                                "No assigned project"
                        }
                    </div>
                </div>
            </div>
        </NavLink>
    )
}
