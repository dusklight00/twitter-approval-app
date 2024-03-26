"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("@ionic/react");
const ProfilePage = () => {
    return (<react_1.IonPage>
      <react_1.IonHeader>
        <react_1.IonToolbar>
          <react_1.IonTitle>Profile</react_1.IonTitle>
        </react_1.IonToolbar>
      </react_1.IonHeader>
      <react_1.IonContent fullscreen>
        <react_1.IonHeader collapse="condense">
          <react_1.IonToolbar>
            <react_1.IonTitle size="large">Tab 3</react_1.IonTitle>
          </react_1.IonToolbar>
        </react_1.IonHeader>
        <react_1.IonCard>
          <react_1.IonCardHeader>
            <react_1.IonCardTitle>Settings</react_1.IonCardTitle>
            {/* <IonCardSubtitle>Card Subtitle</IonCardSubtitle> */}
          </react_1.IonCardHeader>

          <react_1.IonCardContent>
            <react_1.IonInput label="First Name" labelPlacement="stacked" type="text" placeholder="Enter your first name"/>
            <react_1.IonInput label="Last Name" labelPlacement="stacked" type="text" placeholder="Enter your last name"/>
            <react_1.IonInput label="Gender" labelPlacement="stacked" type="text" placeholder="Enter your gender"/>
            <react_1.IonInput label="Twitter Handle" labelPlacement="stacked" type="text" placeholder="Enter your twitter handle"/>
          </react_1.IonCardContent>
          <div className="px-3 pb-3">
            <react_1.IonButton className="w-full">Save</react_1.IonButton>
          </div>
        </react_1.IonCard>
      </react_1.IonContent>
    </react_1.IonPage>);
};
exports.default = ProfilePage;
