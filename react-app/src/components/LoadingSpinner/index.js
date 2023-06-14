import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import "./LoadingSpinner.css";

function LoadingSpinner() {
    const history = useHistory();

    const handleClick = () => {
        history.push("/home");
    };

    return (
        <div className="loading-container">
            <div id="outer-circle">
            </div>
            <div className="stuck-load-button">
                <button
                    onClick={handleClick}
                >
                    Did something go wrong?
                </button>
            </div>
        </div>
    )
};

export default LoadingSpinner;
