import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, Redirect } from "react-router-dom/cjs/react-router-dom.min";
import { getOneLabel } from "../../store/label";
import { getAllTasks } from "../../store/task";
import OpenModalButton from "../OpenModalButton";
import CreateTaskModal from "../CreateTaskModal";
import EditLabelModal from "../EditLabelModal";
import DeleteLabelModal from "../DeleteLabelModal";
import TaskCard from "../TaskCard";
import SidebarNav from "../SidebarNav";
import LoadingSpinner from "../LoadingSpinner";
import "./SingleLabelPage.css"

function SingleLabelPage () {
    const dispatch = useDispatch();
    const [isHidden, setIsHidden] = useState(true);
    const { labelId } = useParams();
    const label = useSelector((state) => state.projects.oneLabel);
    const tasks = useSelector((state) => state.tasks.allTasks);
    const allTasks = Object.values(tasks);
    const labelTasks = allTasks.filter(task => task.labelId === label.id);
    const sortedTasks = labelTasks.sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate))
    const sessionUser = useSelector((state) => state.session.user);
    // console.log("allTasks output", allTasks)

    useEffect(() => {
        dispatch(getOneLabel(labelId));
        setIsHidden(true);
    }, [dispatch, labelId]);

    useEffect(() => {
        dispatch(getAllTasks());
    }, [dispatch]);

    if (!sessionUser) return <Redirect to="/login" />;

    if (!Object.values(label).length) return <LoadingSpinner />;

    const handleClick = () => {
        setIsHidden(!isHidden);
    };

    const editLabelDropdown = isHidden ? "hidden" : "edit-project-dropdown";

    return (
        <div className="single-project-page-container">
            <SidebarNav />
            <div className="project-tasks-container">
                <div className="single-project-page-header">
                    <div className="single-project-header-details">
                        <h1>{project.title}</h1>
                    </div>
                    <div className="single-project-edit-button">
                        <button onClick={handleClick}>
                            <i className="fas fa-ellipsis-h"></i>
                        </button>
                        <div className="edit-project-dropdown-container">
                            <div className={editLabelDropdown}>
                                <div className="edit-project-modal-button">
                                    <OpenModalButton
                                        buttonText="Edit label"
                                        modalComponent={<EditLabelModal label={label} />}
                                        onButtonClick={handleClick}
                                    />
                                </div>
                                <div className="delete-project-modal-button">
                                    <OpenModalButton
                                        buttonText="Delete label"
                                        modalComponent={<DeleteLabelModal id={label.id} />}
                                        onButtonClick={handleClick}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="single-project-page-tasks-container">
                    <div className="single-project-tasks-section">
                        {
                            sortedTasks.length > 0 &&
                            sortedTasks.map((task) => <TaskCard key={task.id} task={task} project={project} />)
                        }
                    </div>
                    <div className="single-project-add-task-button">
                        <OpenModalButton
                            buttonText={<i class="fas fa-plus">Add task</i>}
                            modalComponent={<CreateTaskModal labelId={label.id} />}
                        />
                    </div>
                </div>
            </div>
        </div>
    )
};

export default SingleLabelPage;
