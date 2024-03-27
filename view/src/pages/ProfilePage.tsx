import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardTitle,
  IonChip,
  IonButton,
  IonInput,
} from "@ionic/react";
import ExploreContainer from "../components/ExploreContainer";

interface ProfilePageProps {
  setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
}

const ProfilePage: React.FC<ProfilePageProps> = ({ setIsLoggedIn }) => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Profile</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Tab 3</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonCard>
          <IonCardHeader>
            <IonCardTitle>Settings</IonCardTitle>
            {/* <IonCardSubtitle>Card Subtitle</IonCardSubtitle> */}
          </IonCardHeader>

          <IonCardContent>
            <IonInput
              label="First Name"
              labelPlacement="stacked"
              type="text"
              placeholder="Enter your first name"
            />
            <IonInput
              label="Last Name"
              labelPlacement="stacked"
              type="text"
              placeholder="Enter your last name"
            />
            <IonInput
              label="Gender"
              labelPlacement="stacked"
              type="text"
              placeholder="Enter your gender"
            />
            <IonInput
              label="Twitter Handle"
              labelPlacement="stacked"
              type="text"
              placeholder="Enter your twitter handle"
            />
          </IonCardContent>
          <div className="px-3 pb-3">
            <IonButton className="w-full">Save</IonButton>
            <IonButton className="w-full" onClick={() => setIsLoggedIn(false)}>
              Logout
            </IonButton>
          </div>
        </IonCard>
      </IonContent>
    </IonPage>
  );
};

export default ProfilePage;
