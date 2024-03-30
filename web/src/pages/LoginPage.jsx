import {
  Card,
  CardContent,
  Container,
  Typography,
  TextField,
  Button,
  Stack,
} from "@mui/material";

function LoginPage() {
  return (
    <Container className="h-[100vh] flex place-content-center" maxWidth="sm">
      <Card>
        <CardContent>
          <Stack gap={3}>
            <Typography variant="h5">
              <b>Login</b>
            </Typography>
            <TextField label="Username" variant="outlined" />
            <TextField label="Password" variant="outlined" />
            <Button variant="contained">Login</Button>
          </Stack>
        </CardContent>
      </Card>
    </Container>
  );
}

export default LoginPage;
