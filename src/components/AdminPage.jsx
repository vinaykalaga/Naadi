import React, { useEffect, useState } from "react";
import { createBasicAuthToken, getAdminBookings } from "../api/adminApi";
import "../styles/admin.css";

function AdminPage() {
  const [username, setUsername] = useState("admin");
  const [password, setPassword] = useState("");
  const [bookings, setBookings] = useState([]);
  const [authToken, setAuthToken] = useState(localStorage.getItem("adminToken") || "");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const loadBookings = async (token) => {
    setLoading(true);
    setError("");

    try {
      const data = await getAdminBookings(token);
      setBookings(data);
      setAuthToken(token);
      localStorage.setItem("adminToken", token);
    } catch (err) {
      setError(err.message);
      localStorage.removeItem("adminToken");
      setAuthToken("");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (authToken) {
      loadBookings(authToken);
    }
  }, []);

  const handleLogin = async (event) => {
    event.preventDefault();
    const token = createBasicAuthToken(username, password);
    await loadBookings(token);
  };

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    setAuthToken("");
    setBookings([]);
    setPassword("");
  };

  if (!authToken) {
    return (
      <main className="admin-page">
        <div className="admin-login-card">
          <h1>🎨 Ojas Admin Login</h1>
          <p>Login to view demo class bookings.</p>

          <form onSubmit={handleLogin}>
            <input
              type="text"
              placeholder="Admin username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />

            <input
              type="password"
              placeholder="Admin password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <button type="submit" disabled={loading}>
              {loading ? "Checking..." : "Login"}
            </button>

            {error && <p className="admin-error">{error}</p>}
          </form>
        </div>
      </main>
    );
  }

  return (
    <main className="admin-page">
      <div className="admin-dashboard">
        <div className="admin-header">
          <div>
            <h1>📋 Demo Class Bookings</h1>
            <p>Total bookings: {bookings.length}</p>
          </div>

          <button onClick={handleLogout}>Logout</button>
        </div>

        {loading && <p>Loading bookings...</p>}

        {error && <p className="admin-error">{error}</p>}

        <div className="admin-table-wrapper">
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Parent</th>
                <th>Child</th>
                <th>Age</th>
                <th>Phone</th>
                <th>Email</th>
                <th>Class</th>
                <th>Message</th>
              </tr>
            </thead>

            <tbody>
              {bookings.map((booking) => (
                <tr key={booking.id}>
                  <td>{booking.id}</td>
                  <td>{booking.parentName}</td>
                  <td>{booking.childName}</td>
                  <td>{booking.childAge}</td>
                  <td>{booking.phone}</td>
                  <td>{booking.email}</td>
                  <td>{booking.preferredClass}</td>
                  <td>{booking.message || "-"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </main>
  );
}

export default AdminPage;