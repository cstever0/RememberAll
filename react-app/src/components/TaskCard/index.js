import { NavLink } from "react-router-dom/cjs/react-router-dom.min";
import OpenModalButton from "../OpenModalButton";
import "./TaskCard.css";

export default function TaskCard({task, project}) {
    console.log("task output", task);
    console.log("project output", project);
    const displayDueDate = new Date(task.dueDate).toDateString();

    return (
        <div className="task-card-container">
            <NavLink key={task.id} to={`/tasks/${task.id}`}>
                <h1 className="task-card-title">
                    {task.title}
                </h1>
                <div className="task-card-details-container">
                    <div className="task-card-due-date">
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
            </NavLink>
        </div>
    )
}
