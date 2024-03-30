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
import CloseIcon from "@mui/icons-material/Close";

function PostCard() {
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
                <IconButton color="error">
                  <DeleteIcon />
                </IconButton>
                <IconButton>
                  <CheckIcon />
                </IconButton>
                <IconButton>
                  <CloseIcon />
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
          {/* <Stack direction="row" gap={2}> */}
          <Paper className="p-3">
            <Typography variant="h5" component="div">
              anime is best
            </Typography>
          </Paper>
          {/* </Stack> */}

          {/* <Divider /> */}
          <Chip
            label="Not Approved"
            size="small"
            color="error"
            className="w-min"
          />
        </Stack>
      </CardContent>
    </Card>
  );
}

export default PostCard;
