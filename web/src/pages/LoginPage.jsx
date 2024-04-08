import {
  Card,
  CardContent,
  Container,
  Typography,
  TextField,
  Button,
  Stack,
  Snackbar,
} from "@mui/material";
import { useQuery, gql } from "@apollo/client";
import { useEffect, useState } from "react";

const query = gql`
  query Query($username: String!, $password: String!) {
    getUserToken(username: $username, password: $password)
  }
`;

function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [snackMessage, setSnackMessage] = useState("");
  const [snackOpen, setSnackOpen] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      window.location.replace("/user-dashboard");
    }
  });

  const { loading, error, data } = useQuery(query, {
    variables: {
      username,
      password,
    },
  });

  const handleLogin = () => {
    if (username == "" || password == "") {
      setSnackMessage("Please enter username and password");
      setSnackOpen(true);
      return;
    }
    if (error) {
      setSnackMessage("Invalid username or password");
      setSnackOpen(true);
      return;
    }
    localStorage.setItem("token", data.getUserToken);
    setSnackMessage("Logged in successfully");
    setSnackOpen(true);
  };

  return (
    <Container className="h-[100vh] flex place-content-center" maxWidth="sm">
      <Card>
        <CardContent>
          <Stack gap={3}>
            <Typography variant="h5">
              <b>Login</b>
            </Typography>
            <TextField
              label="Username"
              variant="outlined"
              onChange={(e) => setUsername(e.target.value)}
            />
            <TextField
              label="Password"
              variant="outlined"
              onChange={(e) => setPassword(e.target.value)}
            />
            <Button variant="contained" onClick={handleLogin}>
              Login
            </Button>
          </Stack>
          <Snackbar
            open={snackOpen}
            autoHideDuration={6000}
            onClose={() => {
              setSnackOpen(false);
            }}
            message={snackMessage}
          />
        </CardContent>
      </Card>
    </Container>
  );
}

export default LoginPage;
