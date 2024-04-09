import DeleteIcon from "@mui/icons-material/Delete";
import {
  Grid,
  Card,
  CardContent,
  Chip,
  Paper,
  Divider,
  ButtonGroup,
  Stack,
  Typography,
  Button,
  IconButton,
} from "@mui/material";

function UserCard({ user }) {
  return (
    <Card>
      <CardContent>
        <Stack gap={2}>
          <Stack>
            <Stack direction="row" justifyContent="space-between">
              <Typography variant="h5" component="div">
                {user.firstName} {user.lastName}
              </Typography>
              {/* <ButtonGroup>
                <Button variant="text">Change Password</Button>
                <IconButton color="error">
                  <DeleteIcon />
                </IconButton>
              </ButtonGroup> */}
            </Stack>
            <Typography
              sx={{ fontSize: 14 }}
              color="text.secondary"
              gutterBottom
            >
              {user.username}
            </Typography>
          </Stack>
          {/* <Divider /> */}
          <Stack direction="row" gap={2}>
            {user.type === "admin" || user.type === "user" ? (
              <Paper className="p-3">
                <Typography variant="h5" component="div">
                  {user.tweeted}
                </Typography>
                <Typography
                  sx={{ fontSize: 14 }}
                  color="text.secondary"
                  gutterBottom
                >
                  Tweeted
                </Typography>
              </Paper>
            ) : (
              ""
            )}
            {user.type === "admin" ? (
              <Paper className="p-3">
                <Typography variant="h5" component="div">
                  {user.approved}
                </Typography>
                <Typography
                  sx={{ fontSize: 14 }}
                  color="text.secondary"
                  gutterBottom
                >
                  Approved
                </Typography>
              </Paper>
            ) : (
              ""
            )}
          </Stack>

          {/* <Divider /> */}
          {user.type === "admin" ? (
            <Chip
              label="Admin"
              size="small"
              color="success"
              className="w-min"
            />
          ) : user.type === "user" ? (
            <Chip
              label="Not admin"
              size="small"
              color="error"
              className="w-min"
            />
          ) : (
            <Chip
              label="System"
              size="small"
              color="warning"
              className="w-min"
            />
          )}
        </Stack>
      </CardContent>
    </Card>
  );
}

export default UserCard;
