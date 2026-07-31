import { Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import AnalyticsPage from './pages/AnalyticsPage';
import LibraryPage from './pages/LibraryPage';
import SearchPage from './pages/SearchPage';

export default function App() {
  return (
    <div className="app-shell">
      <Navbar />
      <main className="main-content">
        <Routes>
          <Route path="/" element={<SearchPage />} />
          <Route path="/library" element={<LibraryPage />} />
          <Route path="/analytics" element={<AnalyticsPage />} />
        </Routes>
      </main>
    </div>
  );
}
