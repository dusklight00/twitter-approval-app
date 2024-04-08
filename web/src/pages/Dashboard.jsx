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

function Dashboard() {
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      window.location.replace("/login");
    }
  });

  return (
    <Container>
      <Stack direction="row" justifyContent="space-between" className="pt-10">
        <CreatePostModel />
        <Settings />
      </Stack>
      <Typography variant="h5" component="h5" my="30px">
        <b>Posts</b>
      </Typography>
      <PostDashboard />
    </Container>
  );
}

export default Dashboard;
