import {
  Container,
  IconButton,
  Button,
  Typography,
  Stack,
} from "@mui/material";
import SettingsIcon from "@mui/icons-material/Settings";
import AddIcon from "@mui/icons-material/Add";

import AdminCard from "../components/AdminCard";
import UserCard from "../components/UserCard";
import PostCard from "../components/PostCard";

function AdminDashboard() {
  return (
    <Container>
      <Stack direction="row" justifyContent="space-between" className="py-10">
        <Typography variant="h5" component="h5">
          <b>Posts</b>
        </Typography>
        <IconButton>
          <SettingsIcon />
        </IconButton>
      </Stack>

      <Stack gap={3}>
        {/* <AdminCard /> */}
        {/* <UserCard /> */}
        <PostCard />
      </Stack>
    </Container>
  );
}

export default AdminDashboard;
