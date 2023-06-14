import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllLabels } from "../../store/label";
import { Redirect } from "react-router-dom/cjs/react-router-dom.min";
import SidebarNav from "../SidebarNav";
import LabelCard from "../LabelCard";
import OpenModalButton from '../OpenModalButton';
import CreateLabelModal from "../CreateLabelModal";
import LoadingSpinner from "../LoadingSpinner";
import "./AllLabelsPage.css";

const AllLabelsPage = () => {
    const dispatch = useDispatch();
    const labels = useSelector((state) => state.labels.allLabels);
    const allLabels = Object.values(labels);
    const sessionUser = useSelector((state) => state.session.user);

    useEffect(() => {
        dispatch(getAllLabels());
    }, [dispatch]);

    if (!sessionUser) return <Redirect to="/login" />;

    if (!labels) return <LoadingSpinner />

    return (
        <div className="all-projects-page-container">
            <SidebarNav />
            <div className="all-projects-container">
                <div className="all-projects-list-container">
                    <div className="all-projects-header-container">
                        <h2>Labels</h2>
                        <OpenModalButton
                            modalComponent={<CreateLabelModal />}
                            buttonText={<i class="fas fa-plus">Add label</i>}
                        />
                    </div>
                    <div className="all-projects-list">
                        {
                            allLabels.length > 0 &&
                            allLabels.map((label) => <LabelCard key={label.id} label={label} />)
                        }
                    </div>
                </div>
            </div>
        </div>
    )
};

export default AllLabelsPage;
