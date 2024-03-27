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
  IonToast,
} from "@ionic/react";
import { useState } from "react";
import { useQuery, gql } from "@apollo/client";

const query = gql`
  query Query($username: String!, $password: String!) {
    getUserToken(username: $username, password: $password)
  }
`;

interface LoginProps {
  setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
}

const Login: React.FC<LoginProps> = ({ setIsLoggedIn }) => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [isToastOpen, setIsToastOpen] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");

  const { loading, error, data } = useQuery(query, {
    variables: {
      username,
      password,
    },
  });

  if (error) console.log(error);
  if (loading) console.log("loading");
  if (data) console.log(data);

  const handleSubmit = () => {
    if (username === "" || password === "") {
      setMessage("Please fill all the fields");
      setIsToastOpen(true);
      return;
    }
    if (error) {
      setMessage("Invalid credentials");
      setIsToastOpen(true);
      return;
    }
    setIsLoggedIn(true);
  };

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
          <IonButton className="w-full" onClick={handleSubmit}>
            Login
          </IonButton>
          <IonToast
            isOpen={isToastOpen}
            message={message}
            onDidDismiss={() => setIsToastOpen(false)}
            duration={5000}
          ></IonToast>
        </div>
      </IonContent>
    </div>
  );
};
export default Login;
