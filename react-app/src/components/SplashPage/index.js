import LoginFormPage from "../LoginFormPage";
import SignupFormPage from "../SignupFormPage";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom/cjs/react-router-dom.min";
import { login } from "../../store/session";
import "./SplashPage.css"

function SplashPage() {
    const dispatch = useDispatch();
    const sessionUser = useSelector((state) => state.session.user);

    if (sessionUser) return <Redirect to="/home" />;

    const handleClick = async (e) => {
        e.preventDefault();
        await dispatch(login('demo@aa.io', 'password'));
    };

    return (
        <div className="splash-page-container">
            <h1 className="splash-page-title">RememberAll</h1>
            <h3 className="splash-page-statement">
                Organize everything in one place
            </h3>
            <div className="splash-page-forms-container">
                <div className="splash-signup-form-container">
                    <div className="splash-signup-form">
                        <SignupFormPage />
                    </div>
                </div>
                <div className="splash-login-form-container">
                    <div className="splash-login-form">
                        <LoginFormPage />
                    </div>
                </div>
            </div>
            <div className="splash-page-demo-button">
                <button
                    className="button-type"
                    onClick={handleClick}
                >
                    Demo User
                </button>
            </div>
        </div>
    )
}

export default SplashPage;
