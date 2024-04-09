import { useEffect, useState } from "react";

import {
  Container,
  IconButton,
  Button,
  Typography,
  Stack,
  Modal,
  Box,
  TextField,
} from "@mui/material";
import SettingsIcon from "@mui/icons-material/Settings";
import AddIcon from "@mui/icons-material/Add";

import AdminCard from "../components/AdminCard";
import UserCard from "../components/UserCard";
import PostCard from "../components/PostCard";
import PostDashboard from "../components/PostDashboard";
import CreatePostModel from "../components/CreatePostModel";
import Settings from "../components/Settings";
import UserDashboard from "../components/UserDashboard";
import CreateUserModal from "../components/CreateUserModal";
import { gql, useQuery, useLazyQuery } from "@apollo/client";

const TYPE = gql`
  query Query {
    getCurrentLoggedInUser {
      type
    }
  }
`;

function Dashboard() {
  const [type, setType] = useState("");
  const [getType] = useLazyQuery(TYPE);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      window.location.replace("/login");
    }
    Promise.all([getType()]).then((data) => {
      const type = data[0].data.getCurrentLoggedInUser.type;
      setType(type);
    });
  }, []);

  return (
    <Container>
      <Stack direction="row" justifyContent="space-between" className="pt-10">
        {type !== "" && (type === "admin" || type === "user") ? (
          <CreatePostModel />
        ) : (
          ""
        )}
        {type !== "" && type === "system" ? <CreateUserModal /> : ""}
        <Settings />
      </Stack>
      <Typography variant="h5" component="h5" my="30px">
        <b>
          {type !== "" && type === "system" ? "Users" : ""}
          {type !== "" && (type === "admin" || type === "user") ? "Posts" : ""}
        </b>
      </Typography>
      {type !== "" && (type === "admin" || type === "user") ? (
        <PostDashboard type={type} />
      ) : (
        ""
      )}
      {type !== "" && type === "system" ? <UserDashboard type={type} /> : ""}
    </Container>
  );
}

export default Dashboard;
