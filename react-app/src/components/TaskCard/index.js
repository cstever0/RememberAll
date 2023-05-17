import { NavLink } from "react-router-dom/cjs/react-router-dom.min";
import OpenModalButton from "../OpenModalButton";
import "./TaskCard.css";

export default function TaskCard({task}) {

    return (
        <div className="task-card-container">
            <NavLink key={task.id} to={`/tasks/${task.id}`}>
                <h1 className="task-card-title">
                    {task.title}
                </h1>
                <div className="task-card-details-container">
                    <div className="task-card-due-date">
                        {task.dueDate}
                    </div>
                    <div className="task-card-project">
                        project placeholder
                    </div>
                </div>
            </NavLink>
        </div>
    )
}
