"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("@ionic/react");
const react_router_1 = require("@ionic/react-router");
/* Core CSS required for Ionic components to work properly */
require("@ionic/react/css/core.css");
/* Basic CSS for apps built with Ionic */
require("@ionic/react/css/normalize.css");
require("@ionic/react/css/structure.css");
require("@ionic/react/css/typography.css");
/* Optional CSS utils that can be commented out */
require("@ionic/react/css/padding.css");
require("@ionic/react/css/float-elements.css");
require("@ionic/react/css/text-alignment.css");
require("@ionic/react/css/text-transformation.css");
require("@ionic/react/css/flex-utils.css");
require("@ionic/react/css/display.css");
const Login_1 = __importDefault(require("./Login"));
const Dashboard_1 = __importDefault(require("./Dashboard"));
/* Theme variables */
require("./theme/variables.css");
const react_router_2 = require("react-router");
(0, react_1.setupIonicReact)();
const App = () => {
    const isLoggedIn = false;
    return (<react_1.IonApp>
      <react_router_1.IonReactRouter>
        <react_router_2.Route exact path="/login">
          <Login_1.default />
        </react_router_2.Route>
        <react_router_2.Route path="/">
          {isLoggedIn ? <react_router_2.Redirect to="/login"/> : <Dashboard_1.default />}
        </react_router_2.Route>
      </react_router_1.IonReactRouter>
    </react_1.IonApp>);
};
exports.default = App;
