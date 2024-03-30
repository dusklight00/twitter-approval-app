import {
  Container,
  IconButton,
  Button,
  Typography,
  Stack,
} from "@mui/material";
import SettingsIcon from "@mui/icons-material/Settings";
import AddIcon from "@mui/icons-material/Add";

import AdminCard from "./components/AdminCard";
import UserCard from "./components/UserCard";

function App() {
  return (
    <>
      <Container>
        <Stack direction="row" justifyContent="space-between" className="pt-10">
          <Button variant="contained" startIcon={<AddIcon />}>
            Create
          </Button>
          <IconButton>
            <SettingsIcon />
          </IconButton>
        </Stack>
        <Typography variant="h5" component="h5" my="30px">
          <b>Users</b>
        </Typography>
        <Stack gap={3}>
          <AdminCard />
          <UserCard />
        </Stack>
      </Container>
    </>
  );
}

export default App;
