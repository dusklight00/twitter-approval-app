import React, { useState, useRef, useEffect } from "react";
import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonChip,
  IonFab,
  IonFabButton,
  IonIcon,
  IonButtons,
  IonButton,
  IonModal,
  IonItem,
  IonInput,
  IonTextarea,
} from "@ionic/react";
import { add } from "ionicons/icons";
import { OverlayEventDetail } from "@ionic/core/components";
import ExploreContainer from "../components/ExploreContainer";
import { gql, useQuery, useMutation } from "@apollo/client";
import e from "cors";

const FETCH_POSTS = gql`
  query Query {
    getUserPosts {
      title
      content
      isApproved
    }
  }
`;

const CREATE_POST = gql`
  mutation Mutation($title: String!, $content: String!) {
    createPost(title: $title, content: $content) {
      title
      content
    }
  }
`;

const USER_DATA = gql`
  query Query {
    getCurrentLoggedInUser {
      isAdmin
    }
  }
`;

const FETCH_ALL_POSTS = gql`
  query Query {
    getAllPosts {
      content
      isApproved
      title
      postId
      user {
        username
      }
    }
  }
`;

const APPROVE_POST = gql`
  mutation Mutation($postId: ID!) {
    approvePost(postId: $postId) {
      postId
      title
      content
      userId
      isApproved
      user {
        id
        firstName
        lastName
        email
        isAdmin
        username
      }
    }
  }
`;

interface Post {
  title: string;
  content: string;
  isApproved: boolean;
}

const DashboardPage: React.FC = () => {
  const modal = useRef<HTMLIonModalElement>(null);
  const input = useRef<HTMLIonInputElement>(null);

  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [posts, setPosts] = useState<Post[]>([]);
  const [isAdmin, setIsAdmin] = useState(false);

  const [createPost, { data: mutation, error: mutationError }] =
    useMutation(CREATE_POST);
  const [approvePost, _] = useMutation(APPROVE_POST);

  const { loading, error, data } = useQuery(FETCH_POSTS);
  const { data: userData } = useQuery(USER_DATA);
  const { error: allPostError, data: allPostData } = useQuery(FETCH_ALL_POSTS);

  const handleApprovePost = async (e: any) => {
    console.log(allPostData);
    const postId = e.currentTarget.id;
    const result = await approvePost({
      variables: {
        postId,
      },
    });
    setPosts(allPostData?.getAllPosts ? allPostData.getAllPosts : []);
    console.log(result);
  };

  // console.log(allPostData);

  if (loading) console.log("loading");
  if (error) console.log(error);
  // if (data) console.log(data);

  console.log(isAdmin);

  useEffect(() => {
    setIsAdmin(userData?.getCurrentLoggedInUser.isAdmin);
    if (isAdmin)
      setPosts(allPostData?.getAllPosts ? allPostData.getAllPosts : []);
    else setPosts(data?.getUserPosts ? data.getUserPosts : []);
  }, [data, isAdmin, userData]);

  const [message, setMessage] = useState(
    "This modal example uses triggers to automatically open a modal when the button is clicked."
  );

  async function confirm() {
    try {
      const { data } = await createPost({
        variables: {
          title: title,
          content: body,
        },
      });
      console.log("Post created", data);
      const newPost: Post = {
        title: data.createPost.title,
        content: data.createPost.content,
        isApproved: false,
      };
      setPosts([...posts, newPost]);
      console.log(newPost);
    } catch (error) {
      console.error("Error creating post", error);
    }
    modal.current?.dismiss(input.current?.value, "confirm");
  }

  function onWillDismiss(ev: CustomEvent<OverlayEventDetail>) {
    if (ev.detail.role === "confirm") {
      setMessage(`Hello, ${ev.detail.data}!`);
    }
  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Dashboard</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Tab 1</IonTitle>
          </IonToolbar>
        </IonHeader>

        {[...posts].reverse().map((post: any, index: number) => (
          <div key={index}>
            <IonCard>
              <IonCardHeader>
                <IonCardTitle>{post.title}</IonCardTitle>
                {isAdmin ? (
                  <IonCardSubtitle>{post.user.username}</IonCardSubtitle>
                ) : (
                  ""
                )}
                {/* <IonCardSubtitle>Card Subtitle</IonCardSubtitle> */}
              </IonCardHeader>

              <IonCardContent>
                <p>{post.content}</p>
              </IonCardContent>
              <div className="px-3 pb-3">
                {post.isApproved ? (
                  <IonChip color="success" className="m-0">
                    Approved
                  </IonChip>
                ) : (
                  <IonChip color="danger" className="m-0">
                    Not Approved
                  </IonChip>
                )}
                {isAdmin ? (
                  <IonButton id={post.postId} onClick={handleApprovePost}>
                    Approve
                  </IonButton>
                ) : (
                  ""
                )}
              </div>
            </IonCard>
          </div>
        ))}
        <div className="fixed bottom-5 right-5">
          <IonFabButton id="open-modal">
            <IonIcon icon={add}></IonIcon>
          </IonFabButton>
          <IonModal
            ref={modal}
            trigger="open-modal"
            onWillDismiss={(ev) => onWillDismiss(ev)}
          >
            <IonHeader>
              <IonToolbar>
                <IonButtons slot="start">
                  <IonButton onClick={() => modal.current?.dismiss()}>
                    Cancel
                  </IonButton>
                </IonButtons>
                <IonTitle>Create Post</IonTitle>
                <IonButtons slot="end">
                  <IonButton strong={true} onClick={() => confirm()}>
                    Confirm
                  </IonButton>
                </IonButtons>
              </IonToolbar>
            </IonHeader>
            <IonContent className="ion-padding">
              <IonItem>
                <IonInput
                  label="Post Title"
                  labelPlacement="stacked"
                  ref={input}
                  value={title}
                  onInput={(e: any) => setTitle(e.target.value)}
                  type="text"
                  placeholder="Enter your title"
                />
              </IonItem>
              <IonItem>
                <IonTextarea
                  label="Post Body"
                  labelPlacement="stacked"
                  value={body}
                  onInput={(e: any) => setBody(e.target.value)}
                  className="h-48"
                  placeholder="Type something here"
                ></IonTextarea>
              </IonItem>
            </IonContent>
          </IonModal>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default DashboardPage;
