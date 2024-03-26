"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("@ionic/react");
const Login = () => {
    return (<div className="h-full">
      <react_1.IonHeader>
        <react_1.IonToolbar>
          <react_1.IonSegment value="all">
            <react_1.IonSegmentButton value="all">
              <react_1.IonLabel>User</react_1.IonLabel>
            </react_1.IonSegmentButton>
            <react_1.IonSegmentButton value="favorites">
              <react_1.IonLabel>Admin</react_1.IonLabel>
            </react_1.IonSegmentButton>
          </react_1.IonSegment>
        </react_1.IonToolbar>
      </react_1.IonHeader>
      <react_1.IonContent className="h-full">
        <div className="px-10 py-20 flex flex-col gap-10">
          <h1 className="text-center text-4xl font-bold">Login</h1>
          <react_1.IonInput label="Username" placeholder="Enter your username"/>
          <react_1.IonInput label="Password" type="password" placeholder="Enter your password"/>
          <react_1.IonButton className="w-full">Login</react_1.IonButton>
        </div>
      </react_1.IonContent>
    </div>);
};
exports.default = Login;
