import { useEffect, useState } from 'react';
import { libraryApi } from '../api';
import { useAuth } from '../context/AuthContext';

export default function LibraryPage() {
  const { user } = useAuth();
  const [albums, setAlbums] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState(null);
  const [draft, setDraft] = useState({ user_rating: 4, user_notes: '' });

  const loadLibrary = async () => {
    const response = await libraryApi.getLibrary();
    setAlbums(response.data || []);
    setLoading(false);
  };

  useEffect(() => {
    loadLibrary();
  }, []);

  const handleDelete = async (id) => {
    await libraryApi.deleteAlbum(id);
    await loadLibrary();
  };

  const startEdit = (album) => {
    setEditingId(album.id);
    setDraft({ user_rating: album.user_rating || 4, user_notes: album.user_notes || '' });
  };

  const saveEdit = async (id) => {
    const payload = {
      apple_catalog_id: albums.find((album) => album.id === id).apple_catalog_id,
      title: albums.find((album) => album.id === id).title,
      artist_name: albums.find((album) => album.id === id).artist_name,
      genre: albums.find((album) => album.id === id).genre,
      release_date: albums.find((album) => album.id === id).release_date,
      track_count: albums.find((album) => album.id === id).track_count,
      artwork_url: albums.find((album) => album.id === id).artwork_url,
      price: albums.find((album) => album.id === id).price,
      user_rating: draft.user_rating,
      user_notes: draft.user_notes
    };
    await libraryApi.updateAlbum(id, payload);
    setEditingId(null);
    await loadLibrary();
  };

  if (!user) {
    return <p className="empty-state">Please sign in to view your library.</p>;
  }

  return (
    <div className="panel">
      <h2>Your library</h2>
      {loading ? <p>Loading albums...</p> : albums.length === 0 ? <p className="empty-state">Your library is empty. Search for albums and save them.</p> : (
        <div className="card-grid">
          {albums.map((album) => (
            <div className="album-card" key={album.id}>
              <img src={album.artwork_url || 'https://via.placeholder.com/120'} alt={album.title} />
              <div>
                <h3>{album.title}</h3>
                <p>{album.artist_name}</p>
                <p>{album.genre || 'Genre unknown'}</p>
                <p>Rating: {album.user_rating || 'Not set'}</p>
                <p>{album.user_notes || 'No notes yet'}</p>
                <div className="action-row">
                  <button onClick={() => startEdit(album)}>Edit</button>
                  <button className="danger-btn" onClick={() => handleDelete(album.id)}>Delete</button>
                </div>
                {editingId === album.id && (
                  <div className="edit-form">
                    <label>
                      Rating
                      <select value={draft.user_rating} onChange={(e) => setDraft({ ...draft, user_rating: Number(e.target.value) })}>
                        {[1, 2, 3, 4, 5].map((value) => <option key={value} value={value}>{value}</option>)}
                      </select>
                    </label>
                    <label>
                      Notes
                      <textarea value={draft.user_notes} onChange={(e) => setDraft({ ...draft, user_notes: e.target.value })} />
                    </label>
                    <button onClick={() => saveEdit(album.id)}>Save</button>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
