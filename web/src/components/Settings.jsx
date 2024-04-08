import { useState } from "react";
import {
  Button,
  Modal,
  Box,
  Typography,
  TextField,
  IconButton,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import SettingsIcon from "@mui/icons-material/Settings";
import { gql, useMutation } from "@apollo/client";

const CREATE_POST = gql`
  mutation Mutation($title: String!, $content: String!) {
    createPost(title: $title, content: $content) {
      title
      content
    }
  }
`;

export default function Settings() {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.reload();
  };

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };

  return (
    <div>
      <IconButton onClick={handleOpen}>
        <SettingsIcon />
      </IconButton>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Settings
          </Typography>
          <Box
            id="modal-modal-description"
            sx={{ mt: 2 }}
            className="flex flex-col gap-4"
          >
            <Button
              variant="contained"
              className="w-full"
              onClick={handleLogout}
            >
              Logout
            </Button>
          </Box>
        </Box>
      </Modal>
    </div>
  );
}
