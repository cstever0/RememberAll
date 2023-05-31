import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import SplashPage from "./components/SplashPage";
import TodayTaskPage from "./components/TodayTaskPage";
import { authenticate } from "./store/session";
import Navigation from "./components/Navigation";
import SingleTaskPage from "./components/SingleTaskPage";
import AllProjectsPage from "./components/AllProjectsPage";
import SingProjectPage from "./components/SingleProjectPage";
import UpcomingTaskPage from "./components/UpcomingTaskPage";
import ProtectedRoute from "./components/auth/ProtectedRoute";

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
              <SingProjectPage />
            </ProtectedRoute>
          </Route>
          <Route path="/projects">
            <ProtectedRoute>
              <Navigation isLoaded={isLoaded} />
              <AllProjectsPage />
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
        </Switch>
      )}
    </>
  );
}

export default App;
