import { useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createPost } from "../features/posts/postsSlice";
import {
  TextField,
  Button,
  Box,
  Typography,
  CircularProgress,
} from "@mui/material";
import { toast } from "react-toastify";

export default function NewPost() {
  const [form, setForm] = useState({ title: "", text: "" });
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.posts);

  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault();
      if (!form.title.trim() || !form.text.trim()) {
        toast.error("Title and text are required");
        return;
      }
      try {
        await dispatch(createPost(form)).unwrap();
        toast.success("Post created successfully");
        setForm({ title: "", text: "" });
      } catch (err) {
        toast.error(err || "Failed to create post");
      }
    },
    [dispatch, form] // 👈 залежності
  );

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{ maxWidth: 600, mx: "auto" }}
    >
      <Typography variant="h5" mb={2}>
        New Post
      </Typography>
      <TextField
        label="Title"
        fullWidth
        margin="normal"
        value={form.title}
        onChange={(e) => setForm({ ...form, title: e.target.value })}
      />
      <TextField
        label="Text"
        fullWidth
        multiline
        rows={4}
        margin="normal"
        value={form.text}
        onChange={(e) => setForm({ ...form, text: e.target.value })}
      />
      <Button type="submit" variant="contained" fullWidth sx={{ mt: 2 }}>
        {loading ? <CircularProgress size={24} /> : "Create"}
      </Button>
    </Box>
  );
}
