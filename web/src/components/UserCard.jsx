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

function UserCard() {
  return (
    <Card>
      <CardContent>
        <Stack gap={2}>
          <Stack>
            <Stack direction="row" justifyContent="space-between">
              <Typography variant="h5" component="div">
                Rahul Raj
              </Typography>
              <ButtonGroup>
                <Button variant="text">Change Password</Button>
                <IconButton color="error">
                  <DeleteIcon />
                </IconButton>
              </ButtonGroup>
            </Stack>
            <Typography
              sx={{ fontSize: 14 }}
              color="text.secondary"
              gutterBottom
            >
              dusklight00
            </Typography>
          </Stack>
          {/* <Divider /> */}
          <Stack direction="row" gap={2}>
            <Paper className="p-3">
              <Typography variant="h5" component="div">
                12
              </Typography>
              <Typography
                sx={{ fontSize: 14 }}
                color="text.secondary"
                gutterBottom
              >
                Tweeted
              </Typography>
            </Paper>
          </Stack>

          {/* <Divider /> */}
          <Chip
            label="Not admin"
            size="small"
            color="error"
            className="w-min"
          />
        </Stack>
      </CardContent>
    </Card>
  );
}

export default UserCard;
