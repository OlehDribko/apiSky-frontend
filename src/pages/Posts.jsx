import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPosts, deletePost } from "../features/posts/postsSlice";
import PostCard from "../components/PostCard";
import { Typography, CircularProgress } from "@mui/material";
import { toast } from "react-toastify";

export default function Posts() {
  const dispatch = useDispatch();
  const { items, loading, error } = useSelector((state) => state.posts);

  useEffect(() => {
    dispatch(fetchPosts())
      .unwrap()
      .catch((err) => {
        toast.error(err || "Failed to load posts");
      });
  }, [dispatch]);

  const handleDelete = async (id) => {
    try {
      await dispatch(deletePost(id)).unwrap();
      toast.success("Post deleted");
    } catch (err) {
      toast.error(err || "Failed to delete post");
    }
  };

  if (loading) return <CircularProgress />;
  if (error) {
    toast.error(error);
  }

  return (
    <>
      <Typography variant="h4" mb={2}>
        My posts
      </Typography>
      {items.length === 0 ? (
        <Typography color="text.secondary">No posts yet.</Typography>
      ) : (
        items.map((post) => (
          <PostCard
            key={post.id || post._id}
            post={post}
            onDelete={handleDelete}
          />
        ))
      )}
    </>
  );
}
