import { Redirect, Route } from "react-router-dom";
import {
  IonIcon,
  IonLabel,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs,
} from "@ionic/react";
import { personCircleOutline, homeOutline } from "ionicons/icons";
import DashboardPage from "./pages/DashboardPage";
import ProfilePage from "./pages/ProfilePage";

interface DashboardProps {
  setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
}

const Dashboard: React.FC<DashboardProps> = ({ setIsLoggedIn }) => {
  return (
    <IonTabs>
      <IonRouterOutlet>
        <Route exact path="/tab1">
          <DashboardPage />
        </Route>
        <Route path="/tab3">
          <ProfilePage setIsLoggedIn={setIsLoggedIn} />
        </Route>
        <Route exact path="/">
          <Redirect to="/tab1" />
        </Route>
      </IonRouterOutlet>
      <IonTabBar slot="bottom">
        <IonTabButton tab="tab1" href="/tab1">
          <IonIcon aria-hidden="true" icon={homeOutline} />
          <IonLabel>Dashboard</IonLabel>
        </IonTabButton>
        <IonTabButton tab="tab3" href="/tab3">
          <IonIcon aria-hidden="true" icon={personCircleOutline} />
          <IonLabel>Profile</IonLabel>
        </IonTabButton>
      </IonTabBar>
    </IonTabs>
  );
};
export default Dashboard;
