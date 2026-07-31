import { useEffect, useState } from 'react';
import { libraryApi } from '../api';
import { useAuth } from '../context/AuthContext';

export default function SearchPage() {
  const { user, login, register } = useAuth();
  const [query, setQuery] = useState('coldplay');
  const [type, setType] = useState('album');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [authMode, setAuthMode] = useState('login');
  const [authForm, setAuthForm] = useState({ username: '', email: '', password: '', full_name: '' });

  useEffect(() => {
    handleSearch();
  }, []);

  const handleSearch = async () => {
    setLoading(true);
    const response = await libraryApi.search(query || 'coldplay', type, 10);
    setResults(response.data || []);
    setLoading(false);
  };

  const handleAddToLibrary = async (item) => {
    if (!user) {
      setMessage('Please sign in before saving albums.');
      return;
    }

    const payload = {
      apple_catalog_id: item.apple_catalog_id,
      title: item.title,
      artist_name: item.artist_name,
      genre: item.genre,
      release_date: item.release_date,
      track_count: item.track_count,
      artwork_url: item.artwork_url,
      price: item.price,
      user_rating: 4,
      user_notes: 'Added from search'
    };

    await libraryApi.addAlbum(payload);
    setMessage(`${item.title} saved to your library.`);
  };

  const handleAuthSubmit = async (e) => {
    e.preventDefault();
    if (authMode === 'login') {
      await login({ username: authForm.username, password: authForm.password });
    } else {
      await register({ username: authForm.username, email: authForm.email, password: authForm.password, full_name: authForm.full_name });
    }
    setMessage(authMode === 'login' ? 'Welcome back!' : 'Account created!');
  };

  return (
    <div className="page-grid">
      <section className="panel">
        <h2>Search the iTunes catalog</h2>
        <div className="search-bar">
          <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search albums or artists" />
          <select value={type} onChange={(e) => setType(e.target.value)}>
            <option value="album">Album</option>
            <option value="song">Song</option>
            <option value="artist">Artist</option>
          </select>
          <button onClick={handleSearch}>Search</button>
        </div>
        {message && <p className="status-message">{message}</p>}
        {loading ? (
          <p>Loading results...</p>
        ) : (
          <div className="card-grid">
            {results.map((item) => (
              <div className="album-card" key={item.apple_catalog_id || item.title}>
                <img src={item.artwork_url || 'https://via.placeholder.com/120'} alt={item.title} />
                <div>
                  <h3>{item.title}</h3>
                  <p>{item.artist_name}</p>
                  <p>{item.genre || 'Genre unknown'}</p>
                  <p>{item.release_date ? new Date(item.release_date).getFullYear() : 'Unknown year'}</p>
                  <button onClick={() => handleAddToLibrary(item)}>Save to library</button>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      <aside className="panel auth-panel">
        <h3>{user ? 'You are signed in' : 'Sign in to save albums'}</h3>
        {!user ? (
          <form onSubmit={handleAuthSubmit} className="auth-form">
            <div className="toggle">
              <button type="button" className={authMode === 'login' ? 'active' : ''} onClick={() => setAuthMode('login')}>Login</button>
              <button type="button" className={authMode === 'register' ? 'active' : ''} onClick={() => setAuthMode('register')}>Register</button>
            </div>
            <input placeholder="Username" value={authForm.username} onChange={(e) => setAuthForm({ ...authForm, username: e.target.value })} required />
            {authMode === 'register' && (
              <>
                <input placeholder="Email" value={authForm.email} onChange={(e) => setAuthForm({ ...authForm, email: e.target.value })} required />
                <input placeholder="Full name" value={authForm.full_name} onChange={(e) => setAuthForm({ ...authForm, full_name: e.target.value })} />
              </>
            )}
            <input type="password" placeholder="Password" value={authForm.password} onChange={(e) => setAuthForm({ ...authForm, password: e.target.value })} required />
            <button type="submit">{authMode === 'login' ? 'Login' : 'Create account'}</button>
          </form>
        ) : (
          <p>Your library is ready. Head over to the library or analytics pages.</p>
        )}
      </aside>
    </div>
  );
}
