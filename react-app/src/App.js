import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import { authenticate } from "./store/session";
import SplashPage from "./components/SplashPage";
import CatchPage from "./components/404Page";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import Navigation from "./components/Navigation";
import TodayTaskPage from "./components/TodayTaskPage";
import UpcomingTaskPage from "./components/UpcomingTaskPage";
import SingleTaskPage from "./components/SingleTaskPage";
import AllProjectsPage from "./components/AllProjectsPage";
import SingleProjectPage from "./components/SingleProjectPage";
import AllLabelsPage from "./components/AllLabelsPage";
import SingleLabelPage from "./components/SingleLabelPage";

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(authenticate()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
      {isLoaded && (
        <Switch>
          <Route path="/tasks/:taskId">
            <ProtectedRoute>
              <Navigation isLoaded={isLoaded} />
              <SingleTaskPage />
            </ProtectedRoute>
          </Route>
          <Route path="/projects/:projectId">
            <ProtectedRoute>
              <Navigation isLoaded={isLoaded} />
              <SingleProjectPage />
            </ProtectedRoute>
          </Route>
          <Route path="/labels/:labelId">
            <ProtectedRoute>
              <Navigation isLoaded={isLoaded} />
              <SingleLabelPage />
            </ProtectedRoute>
          </Route>
          <Route path="/projects">
            <ProtectedRoute>
              <Navigation isLoaded={isLoaded} />
              <AllProjectsPage />
            </ProtectedRoute>
          </Route>
          <Route path="/labels">
            <ProtectedRoute>
              <Navigation isLoaded={isLoaded} />
              <AllLabelsPage />
            </ProtectedRoute>
          </Route>
          <Route path="/upcoming">
            <ProtectedRoute>
              <Navigation isLoaded={isLoaded} />
              <UpcomingTaskPage />
            </ProtectedRoute>
          </Route>
          <Route path="/home">
            <ProtectedRoute>
              <Navigation isLoaded={isLoaded} />
              <TodayTaskPage />
            </ProtectedRoute>
          </Route>
          <Route exact path={["/", "/login"]}>
            <SplashPage />
          </Route>
          <Route>
            <CatchPage />
          </Route>
        </Switch>
      )}
    </>
  );
}

export default App;
