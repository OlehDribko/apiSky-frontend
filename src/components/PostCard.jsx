import {
  Card,
  CardContent,
  CardActions,
  Typography,
  Button,
} from "@mui/material";

export default function PostCard({ post, onDelete }) {
  const id = post.id || post._id;

  return (
    <Card sx={{ mb: 2 }}>
      <CardContent>
        <Typography variant="h6">{post.title}</Typography>
        <Typography variant="body2" sx={{ mt: 1, whiteSpace: "pre-wrap" }}>
          {post.text}
        </Typography>
        {post.createdAt && (
          <Typography
            variant="caption"
            color="text.secondary"
            sx={{ display: "block", mt: 1 }}
          >
            {new Date(post.createdAt).toLocaleString()}
          </Typography>
        )}
      </CardContent>
      <CardActions>
        <Button color="error" onClick={() => onDelete(id)}>
          Delete
        </Button>
      </CardActions>
    </Card>
  );
}
