import { IonApp, setupIonicReact } from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";

/* Core CSS required for Ionic components to work properly */
import "@ionic/react/css/core.css";

/* Basic CSS for apps built with Ionic */
import "@ionic/react/css/normalize.css";
import "@ionic/react/css/structure.css";
import "@ionic/react/css/typography.css";

/* Optional CSS utils that can be commented out */
import "@ionic/react/css/padding.css";
import "@ionic/react/css/float-elements.css";
import "@ionic/react/css/text-alignment.css";
import "@ionic/react/css/text-transformation.css";
import "@ionic/react/css/flex-utils.css";
import "@ionic/react/css/display.css";

import Login from "./Login";
import Dashboard from "./Dashboard";

/* Theme variables */
import "./theme/variables.css";
import { Redirect, Route } from "react-router";
import { useState } from "react";

setupIonicReact();

const App: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(
    localStorage.getItem("token") ? true : false
  );
  return (
    <IonApp>
      <IonReactRouter>
        <Route exact path="/login">
          {isLoggedIn ? (
            <Redirect to="/" />
          ) : (
            <Login setIsLoggedIn={setIsLoggedIn} />
          )}
        </Route>
        <Route path="/">
          {!isLoggedIn ? (
            <Redirect to="/login" />
          ) : (
            <Dashboard setIsLoggedIn={setIsLoggedIn} />
          )}
        </Route>
      </IonReactRouter>
    </IonApp>
  );
};

export default App;
