import { NavLink } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Navbar() {
  const { user, logout } = useAuth();

  return (
    <nav className="navbar">
      <div className="brand">Music Catalog Insights</div>
      <div className="nav-links">
        <NavLink to="/">Search</NavLink>
        <NavLink to="/library">Library</NavLink>
        <NavLink to="/analytics">Analytics</NavLink>
      </div>
      <div className="nav-actions">
        {user ? (
          <>
            <span>Hi, {user.username}</span>
            <button className="ghost-btn" onClick={logout}>Logout</button>
          </>
        ) : (
          <span>Sign in to save albums</span>
        )}
      </div>
    </nav>
  );
}
