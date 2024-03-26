"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importStar(require("react"));
const react_2 = require("@ionic/react");
const icons_1 = require("ionicons/icons");
const DashboardPage = () => {
    const modal = (0, react_1.useRef)(null);
    const input = (0, react_1.useRef)(null);
    const [message, setMessage] = (0, react_1.useState)("This modal example uses triggers to automatically open a modal when the button is clicked.");
    function confirm() {
        var _a, _b;
        (_a = modal.current) === null || _a === void 0 ? void 0 : _a.dismiss((_b = input.current) === null || _b === void 0 ? void 0 : _b.value, "confirm");
    }
    function onWillDismiss(ev) {
        if (ev.detail.role === "confirm") {
            setMessage(`Hello, ${ev.detail.data}!`);
        }
    }
    return (<react_2.IonPage>
      <react_2.IonHeader>
        <react_2.IonToolbar>
          <react_2.IonTitle>Dashboard</react_2.IonTitle>
        </react_2.IonToolbar>
      </react_2.IonHeader>
      <react_2.IonContent fullscreen>
        <react_2.IonHeader collapse="condense">
          <react_2.IonToolbar>
            <react_2.IonTitle size="large">Tab 1</react_2.IonTitle>
          </react_2.IonToolbar>
        </react_2.IonHeader>
        <react_2.IonCard>
          <react_2.IonCardHeader>
            <react_2.IonCardTitle>Anime is best thing in existence</react_2.IonCardTitle>
            {/* <IonCardSubtitle>Card Subtitle</IonCardSubtitle> */}
          </react_2.IonCardHeader>

          <react_2.IonCardContent>
            <p>Well it is just my opinion</p>
          </react_2.IonCardContent>
          <div className="px-3 pb-3">
            <react_2.IonChip color="danger" className="m-0">
              Not Approved
            </react_2.IonChip>
          </div>
        </react_2.IonCard>
        <div className="fixed bottom-5 right-5">
          <react_2.IonFabButton id="open-modal">
            <react_2.IonIcon icon={icons_1.add}></react_2.IonIcon>
          </react_2.IonFabButton>
          <react_2.IonModal ref={modal} trigger="open-modal" onWillDismiss={(ev) => onWillDismiss(ev)}>
            <react_2.IonHeader>
              <react_2.IonToolbar>
                <react_2.IonButtons slot="start">
                  <react_2.IonButton onClick={() => { var _a; return (_a = modal.current) === null || _a === void 0 ? void 0 : _a.dismiss(); }}>
                    Cancel
                  </react_2.IonButton>
                </react_2.IonButtons>
                <react_2.IonTitle>Create Post</react_2.IonTitle>
                <react_2.IonButtons slot="end">
                  <react_2.IonButton strong={true} onClick={() => confirm()}>
                    Confirm
                  </react_2.IonButton>
                </react_2.IonButtons>
              </react_2.IonToolbar>
            </react_2.IonHeader>
            <react_2.IonContent className="ion-padding">
              <react_2.IonItem>
                <react_2.IonInput label="Post Title" labelPlacement="stacked" ref={input} type="text" placeholder="Enter your title"/>
              </react_2.IonItem>
              <react_2.IonItem>
                <react_2.IonTextarea label="Post Body" labelPlacement="stacked" className="h-48" placeholder="Type something here"></react_2.IonTextarea>
              </react_2.IonItem>
            </react_2.IonContent>
          </react_2.IonModal>
        </div>
      </react_2.IonContent>
    </react_2.IonPage>);
};
exports.default = DashboardPage;
