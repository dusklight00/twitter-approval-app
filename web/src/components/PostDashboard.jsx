import { useState, useEffect } from "react";
import PostCard from "./PostCard";
import { Stack } from "@mui/material";
import { gql, useQuery, useLazyQuery } from "@apollo/client";

const FETCH_USER_POST = gql`
  query Query {
    getUserPosts {
      postId
      title
      content
      isApproved
      user {
        username
      }
    }
  }
`;

const FETCH_ADMIN_POST = gql`
  query Query {
    getAllPosts {
      postId
      title
      content
      isApproved
      user {
        username
      }
    }
  }
`;

const TYPE = gql`
  query Query {
    getCurrentLoggedInUser {
      type
    }
  }
`;

function PostDashboard() {
  const [posts, setPosts] = useState([]);
  const [type, setType] = useState("");

  const [getUserPosts] = useLazyQuery(FETCH_USER_POST);
  const [getAdminPosts] = useLazyQuery(FETCH_ADMIN_POST);
  const [getType] = useLazyQuery(TYPE);

  useEffect(() => {
    const fetchPosts = () => {
      Promise.all([getType()]).then((data) => {
        const type = data[0].data.getCurrentLoggedInUser.type;
        setType(type);
        if (type == "admin") {
          Promise.all([getAdminPosts()]).then((data) => {
            setPosts(data[0].data.getAllPosts);
          });
        } else if (type == "user") {
          Promise.all([getUserPosts()]).then((data) => {
            console.log(data);
            setPosts(data[0].data.getUserPosts);
          });
        }
      });
    };
    fetchPosts();
  }, []);

  return (
    <Stack gap={3}>
      {[...posts].reverse().map((post, index) => (
        <PostCard key={index} isAdmin={type === "admin"} post={post} />
      ))}
    </Stack>
  );
}

export default PostDashboard;
