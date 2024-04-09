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
import { gql, useMutation } from "@apollo/client";
// import CloseIcon from "@mui/icons-material/Close";

const APPROVE_POST = gql`
  mutation Mutation($postId: ID!) {
    approvePost(postId: $postId) {
      postId
      title
      content
      userId
      isApproved
      user {
        id
        firstName
        lastName
        email
        type
        username
      }
    }
  }
`;

const INCREASE_APPROVED = gql`
  mutation Mutation($userId: ID!) {
    increaseApproved(userId: $userId) {
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

function PostCard({ post, isAdmin }) {
  const [approvePost, _] = useMutation(APPROVE_POST);
  const [increaseApproved, __] = useMutation(INCREASE_APPROVED);

  const handleApprove = async (e) => {
    const postId = e.currentTarget.id;
    const approveData = await approvePost({
      variables: {
        postId,
      },
    });
    const userId = approveData.data.approvePost.userId;
    await increaseApproved({
      variables: {
        userId,
      },
    });
    window.location.reload();
  };

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
                  {/* <IconButton color="error">
                    <DeleteIcon />
                  </IconButton> */}
                  <IconButton id={post.postId} onClick={handleApprove}>
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
