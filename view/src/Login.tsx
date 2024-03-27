import {
  IonContent,
  IonHeader,
  IonLabel,
  IonSegment,
  IonSegmentButton,
  IonTitle,
  IonToolbar,
  IonInput,
  IonButton,
} from "@ionic/react";
import { useState } from "react";

const Login: React.FC = () => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  return (
    <div className="h-full">
      <IonHeader>
        <IonToolbar>
          <IonSegment value="all">
            <IonSegmentButton value="all">
              <IonLabel>User</IonLabel>
            </IonSegmentButton>
            <IonSegmentButton value="favorites">
              <IonLabel>Admin</IonLabel>
            </IonSegmentButton>
          </IonSegment>
        </IonToolbar>
      </IonHeader>
      <IonContent className="h-full">
        <div className="px-10 py-20 flex flex-col gap-10">
          <h1 className="text-center text-4xl font-bold">Login</h1>
          <IonInput
            label="Username"
            placeholder="Enter your username"
            value={username}
            onIonInput={(e: any) => setUsername(e.target.value)}
          />
          <IonInput
            label="Password"
            type="password"
            placeholder="Enter your password"
            value={password}
            onIonInput={(e: any) => setPassword(e.target.value)}
          />
          <IonButton className="w-full">Login</IonButton>
        </div>
      </IonContent>
    </div>
  );
};
export default Login;
