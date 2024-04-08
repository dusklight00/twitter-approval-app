import { useState, useEffect } from "react";
import PostCard from "./PostCard";
import { Stack } from "@mui/material";
import { gql, useQuery, useLazyQuery } from "@apollo/client";

const FETCH_USER_POST = gql`
  query Query {
    getUserPosts {
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
      title
      content
      isApproved
      user {
        username
      }
    }
  }
`;

const IS_ADMIN = gql`
  query Query {
    getCurrentLoggedInUser {
      isAdmin
    }
  }
`;

function PostDashboard() {
  const [posts, setPosts] = useState([]);
  const [isAdmin, setIsAdmin] = useState(false);

  const [getUserPosts] = useLazyQuery(FETCH_USER_POST);
  const [getAdminPosts] = useLazyQuery(FETCH_ADMIN_POST);
  const [getIsAdmin] = useLazyQuery(IS_ADMIN);

  useEffect(() => {
    const fetchPosts = () => {
      Promise.all([getIsAdmin()]).then((data) => {
        const isAdmin = data[0].data.getCurrentLoggedInUser.isAdmin;
        setIsAdmin(isAdmin);
        if (isAdmin) {
          Promise.all([getAdminPosts()]).then((data) => {
            setPosts(data[0].data.getAllPosts);
          });
        } else {
          Promise.all([getUserPosts()]).then((data) => {
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
        <PostCard key={index} isAdmin={isAdmin} post={post} />
      ))}
    </Stack>
  );
}

export default PostDashboard;
