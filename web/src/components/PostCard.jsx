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

import CheckIcon from "@mui/icons-material/Check";
// import CloseIcon from "@mui/icons-material/Close";

function PostCard({ post, isAdmin }) {
  return (
    <Card>
      <CardContent>
        <Stack gap={2}>
          <Stack>
            <Stack direction="row" justifyContent="space-between">
              <Typography variant="h5" component="div">
                {post.title}
              </Typography>
              {isAdmin && (
                <ButtonGroup>
                  <IconButton color="error">
                    <DeleteIcon />
                  </IconButton>
                  <IconButton>
                    <CheckIcon />
                  </IconButton>
                </ButtonGroup>
              )}
            </Stack>
            <Typography
              sx={{ fontSize: 14 }}
              color="text.secondary"
              gutterBottom
            >
              {post.user.username}
            </Typography>
          </Stack>
          {/* <Divider /> */}
          {/* <Stack direction="row" gap={2}> */}
          <Paper className="p-3">
            <Typography variant="h5" component="div">
              {post.content}
            </Typography>
          </Paper>
          {/* </Stack> */}

          {/* <Divider /> */}
          {post.isApproved ? (
            <Chip
              label="Approved"
              size="small"
              color="success"
              className="w-min"
            />
          ) : (
            <Chip
              label="Not Approved"
              size="small"
              color="error"
              className="w-min"
            />
          )}
        </Stack>
      </CardContent>
    </Card>
  );
}

export default PostCard;
