import {
  Button,
  Modal,
  Box,
  Typography,
  TextField,
  MenuItem,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { gql, useMutation } from "@apollo/client";
import { useState } from "react";

const CREATE_USER = gql`
  mutation Mutation(
    $firstName: String!
    $lastName: String!
    $email: String!
    $username: String!
    $password: String!
    $type: String!
  ) {
    createUser(
      firstName: $firstName
      lastName: $lastName
      email: $email
      username: $username
      password: $password
      type: $type
    ) {
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

function CreateUserModal() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [type, setType] = useState("user");

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [createUser] = useMutation(CREATE_USER);

  const handleCreateUser = () => {
    createUser({
      variables: {
        firstName: firstName,
        lastName: lastName,
        email: email,
        username: username,
        password: password,
        type: type,
      },
    }).then(() => {
      window.location.reload();
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
        Create User
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Create User
          </Typography>
          <Box
            id="modal-modal-description"
            sx={{ mt: 2 }}
            className="flex flex-col gap-4"
          >
            <TextField
              className="w-full"
              rows={6}
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              placeholder="First Name"
            />
            <TextField
              className="w-full"
              rows={6}
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              placeholder="Last Name"
            />
            <TextField
              className="w-full"
              rows={6}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
            />
            <TextField
              className="w-full"
              rows={6}
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Username"
            />
            <TextField
              className="w-full"
              rows={6}
              value={password}
              type="password"
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
            />
            <TextField
              // id="outlined-select-currency"
              select
              label="Select"
              value={type}
              onChange={(e) => setType(e.target.value)}
              // helperText="Please select your currency"
            >
              <MenuItem value="user">User</MenuItem>
              <MenuItem value="admin">Admin</MenuItem>
              <MenuItem value="system">System</MenuItem>
            </TextField>
            {/* <TextField
              multiline
              className="w-full"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              rows={6}
              placeholder="Write a body"
            />
            <Button variant="contained" className="w-full" onClick={handlePost}>
              Post
            </Button> */}
            <Button
              variant="contained"
              className="w-full"
              onClick={handleCreateUser}
            >
              Create User
            </Button>
          </Box>
        </Box>
      </Modal>
    </div>
  );
}

export default CreateUserModal;
