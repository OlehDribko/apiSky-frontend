import styles from "./PostCard.module.css";

export default function PostCard({ post, onDelete }) {
  const formattedDate = new Date(post.createdAt).toLocaleString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <div className={styles.card}>
      <h3 className={styles.title}>{post.title}</h3>
      <p className={styles.text}>{post.text}</p>
      <p className={styles.date}>{formattedDate}</p>
      <button onClick={onDelete} className={styles.button}>
        🗑️ Delete
      </button>
    </div>
  );
}
