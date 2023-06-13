import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

function CatchPage() {
    const history = useHistory();


    const handleClick = () => {
        history.push("/home");
    };

    return (
        <div className="catch-page-container">
            <h1>404 Not Found</h1>
            <h3>Nothing to see here</h3>
            <button
                className="button-type"
                onClick={handleClick}
            >
                Back to home
            </button>
        </div>
    )
};

export default CatchPage;
