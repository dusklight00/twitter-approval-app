"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_router_dom_1 = require("react-router-dom");
const react_1 = require("@ionic/react");
const icons_1 = require("ionicons/icons");
const DashboardPage_1 = __importDefault(require("./pages/DashboardPage"));
const ProfilePage_1 = __importDefault(require("./pages/ProfilePage"));
const Dashboard = () => {
    return (<react_1.IonTabs>
      <react_1.IonRouterOutlet>
        <react_router_dom_1.Route exact path="/tab1">
          <DashboardPage_1.default />
        </react_router_dom_1.Route>
        <react_router_dom_1.Route path="/tab3">
          <ProfilePage_1.default />
        </react_router_dom_1.Route>
        <react_router_dom_1.Route exact path="/">
          <react_router_dom_1.Redirect to="/tab1"/>
        </react_router_dom_1.Route>
      </react_1.IonRouterOutlet>
      <react_1.IonTabBar slot="bottom">
        <react_1.IonTabButton tab="tab1" href="/tab1">
          <react_1.IonIcon aria-hidden="true" icon={icons_1.homeOutline}/>
          <react_1.IonLabel>Dashboard</react_1.IonLabel>
        </react_1.IonTabButton>
        <react_1.IonTabButton tab="tab3" href="/tab3">
          <react_1.IonIcon aria-hidden="true" icon={icons_1.personCircleOutline}/>
          <react_1.IonLabel>Profile</react_1.IonLabel>
        </react_1.IonTabButton>
      </react_1.IonTabBar>
    </react_1.IonTabs>);
};
exports.default = Dashboard;
