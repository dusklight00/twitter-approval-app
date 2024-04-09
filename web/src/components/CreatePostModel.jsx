import { useState } from "react";
import { Button, Modal, Box, Typography, TextField } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { gql, useMutation } from "@apollo/client";

const CREATE_POST = gql`
  mutation Mutation($title: String!, $content: String!) {
    createPost(title: $title, content: $content) {
      title
      content
      userId
    }
  }
`;

const INCREASE_TWITTED = gql`
  mutation Mutation($userId: ID!) {
    increaseTweeted(userId: $userId) {
      id
      firstName
      lastName
      email
      type
      username
      tweeted
      approved
    }
  }
`;

export default function CreatePostModel() {
  const [createPost] = useMutation(CREATE_POST);
  const [increaseTweeted] = useMutation(INCREASE_TWITTED);

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handlePost = async () => {
    createPost({
      variables: {
        title: title,
        content: content,
      },
    }).then((data) => {
      const userId = data.data.createPost.userId;
      increaseTweeted({
        variables: {
          userId,
        },
      }).then(() => {
        window.location.reload();
      });
    });
    handleClose();
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
              value={title}
              rows={6}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Create a title"
            />
            <TextField
              multiline
              className="w-full"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              rows={6}
              placeholder="Write a body"
            />
            <Button variant="contained" className="w-full" onClick={handlePost}>
              Post
            </Button>
          </Box>
        </Box>
      </Modal>
    </div>
  );
}
