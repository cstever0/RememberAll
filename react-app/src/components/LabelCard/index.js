import { NavLink } from "react-router-dom/cjs/react-router-dom.min";
import "./LabelCard.css";

const LabelCard = ({ label }) => {

    return(
            <NavLink
                to={`/labels/${label.id}`}
            >
                <div className="project-card-container">
                    <div className="project-card-title">
                        <i class="fas fa-circle"></i>
                        <p>{label.title}</p>
                    </div>
                </div>
            </NavLink>
    );
};

export default LabelCard;
