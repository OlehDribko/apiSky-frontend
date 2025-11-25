import { useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPosts, deletePost } from "../features/posts/postsSlice";
import PostCard from "../components/PostCard";
import ClipLoader from "react-spinners/ClipLoader";
import { toast } from "react-toastify";
import styles from "./Posts.module.css";

export default function Posts() {
  const dispatch = useDispatch();
  const { posts, loading, error } = useSelector((state) => state.posts);

  const loadPosts = useCallback(() => {
    dispatch(fetchPosts())
      .unwrap()
      .catch((err) => toast.error(` Failed to load posts: ${err}`));
  }, [dispatch]);

  const handleDelete = useCallback(
    async (id) => {
      try {
        await dispatch(deletePost(id)).unwrap();
        toast.success(" Post deleted");
      } catch (err) {
        toast.error(` Failed to delete post: ${err}`);
      }
    },
    [dispatch]
  );

  useEffect(() => {
    loadPosts();
  }, [loadPosts]);

  if (loading) {
    return (
      <div className={styles.spinner}>
        <ClipLoader color="#1976d2" size={50} />
      </div>
    );
  }

  if (error) {
    return <div className={styles.error}>{error}</div>;
  }

  if (!Array.isArray(posts)) {
    return <div className={styles.error}>⚠️ Posts data is invalid</div>;
  }

  if (posts.length === 0) {
    return <div className={styles.empty}>📭 No posts yet. Create one!</div>;
  }

  const sortedPosts = [...posts].sort(
    (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
  );

  return (
    <div className={styles.wrapper}>
      {sortedPosts.map((post, index) => (
        <PostCard
          key={post._id || post.id || index}
          post={post}
          onDelete={() => handleDelete(post._id || post.id)}
        />
      ))}
    </div>
  );
}
