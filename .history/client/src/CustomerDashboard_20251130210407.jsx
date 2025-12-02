import { useEffect, useState } from "react";

export default function CustomerDashboard({ user }) {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    if (!user?._id) return;

    const fetchHistory = async () => {
      const res = await fetch(
        `http://localhost:3000/api/services/user/${user._id}`
      );
      const data = await res.json();
      setHistory(data);
    };

    fetchHistory();
  }, [user]);

  return (
    <div style={{ padding: "20px" }}>
      <h3>Welcome back, {user.name}!</h3>
      <p>Your previous services:</p>

      {history.length === 0 ? (
        <p>No previous services found.</p>
      ) : (
        <ul>
          {history.map((item) => (
            <li key={item._id}>{item.title}</li>
          ))}
        </ul>
      )}
    </div>
  );
}
