import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import SplashPage from "./components/SplashPage";
import TodayTaskPage from "./components/TodayTaskPage";
import { authenticate } from "./store/session";
import Navigation from "./components/Navigation";
import SingleTaskPage from "./components/SingleTaskPage";
import AllProjectsPage from "./components/AllProjectsPage";

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
            <Navigation isLoaded={isLoaded} />
            <SingleTaskPage />
          </Route>
          <Route path="/projects">
            <Navigation isLoaded={isLoaded} />
            <AllProjectsPage />
          </Route>
          <Route path="/home">
            <Navigation isLoaded={isLoaded} />
            <TodayTaskPage />
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
