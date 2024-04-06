import { useState } from "react";
import { Button, Modal, Box, Typography, TextField } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

export default function CreatePostModel() {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

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
      <Button variant="contained" startIcon={<AddIcon />} onClick={handleOpen}>
        Create Post
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Create Post
          </Typography>
          <Box
            id="modal-modal-description"
            sx={{ mt: 2 }}
            className="flex flex-col gap-4"
          >
            <TextField
              className="w-full"
              rows={6}
              placeholder="Create a title"
            />
            <TextField
              multiline
              className="w-full"
              rows={6}
              placeholder="Write a body"
            />
            <Button variant="contained" className="w-full">
              Post
            </Button>
          </Box>
        </Box>
      </Modal>
    </div>
  );
}
