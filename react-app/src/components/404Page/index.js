import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import "./404Page.css";

function CatchPage() {
    const history = useHistory();


    const handleClick = () => {
        history.push("/home");
    };

    return (
        <div className="catch-page-container">
            <div className="catch-page-details">
                <h1>404 Not Found</h1>
                <h3>Nothing to see here</h3>
            </div>
            <div className="catch-page-button">
                <button
                    className="button-type"
                    onClick={handleClick}
                >
                    Back to home
                </button>
            </div>
        </div>
    )
};

export default CatchPage;
