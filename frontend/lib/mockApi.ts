const STORAGE_KEY = 'music_catalog_mock_store';

export type MockUser = {
  id: string;
  email: string;
  password: string;
  createdAt: string;
};

export type MockLibraryItem = {
  id: string;
  userId: string;
  apple_catalog_id: number;
  title: string;
  artist_name: string;
  genre: string;
  release_date: string;
  track_count: number;
  artwork_url: string;
  collection_price: number;
  user_rating: number | null;
  user_notes: string | null;
  created_at: string;
  updated_at: string;
};

export type MockStore = {
  users: MockUser[];
  library: MockLibraryItem[];
};

const defaultStore: MockStore = {
  users: [],
  library: [],
};

const sampleResults = [
  {
    apple_catalog_id: 1440849774,
    title: 'A Rush of Blood to the Head',
    artist_name: 'Coldplay',
    genre: 'Alternative',
    release_date: '2002-08-08',
    track_count: 11,
    artwork_url: 'https://is1-ssl.mzstatic.com/image/thumb/Music124/v4/b8/43/35/b84335c6-197c-5bc6-ff52-5797354b88c9/886973031872.jpg/600x600bb.jpg',
    collection_price: 9.99,
    preview_url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3'
  },
  {
    apple_catalog_id: 1445025413,
    title: '21',
    artist_name: 'Adele',
    genre: 'Pop',
    release_date: '2011-01-24',
    track_count: 11,
    artwork_url: 'https://is1-ssl.mzstatic.com/image/thumb/Music124/v4/5f/5c/15/5f5c154c-2447-1662-8863-fd8c83c6d53c/886444793556.jpg/600x600bb.jpg',
    collection_price: 9.99,
    preview_url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3'
  },
  {
    apple_catalog_id: 1440814203,
    title: 'In Rainbows',
    artist_name: 'Radiohead',
    genre: 'Rock',
    release_date: '2007-10-10',
    track_count: 10,
    artwork_url: 'https://is2-ssl.mzstatic.com/image/thumb/Music124/v4/ea/03/13/ea0313e4-9d35-8fad-1c2f-4e6c7df8ed90/0886971309299.jpg/600x600bb.jpg',
    collection_price: 9.99,
    preview_url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3'
  },
  {
    apple_catalog_id: 1441039061,
    title: 'Lemonade',
    artist_name: 'Beyoncé',
    genre: 'R&B/Soul',
    release_date: '2016-04-23',
    track_count: 12,
    artwork_url: 'https://is4-ssl.mzstatic.com/image/thumb/Music122/v4/37/97/42/3797421f-1fd9-b341-b3ae-9d05a495d8f7/886446028553.jpg/600x600bb.jpg',
    collection_price: 9.99,
    preview_url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3'
  },
];

function getStore(): MockStore {
  if (typeof window === 'undefined') return defaultStore;
  const stored = window.localStorage.getItem(STORAGE_KEY);
  if (!stored) {
    // Seed demo user and sample library for quick demo mode
    const demoUserId = createId();
    const demoUser = {
      id: demoUserId,
      email: 'demo@example.com',
      password: 'password123',
      createdAt: nowISO(),
    };

    const seededLibrary = sampleResults.map((r, idx) => ({
      id: createId(),
      userId: demoUserId,
      apple_catalog_id: r.apple_catalog_id,
      title: r.title,
      artist_name: r.artist_name,
      genre: r.genre,
      release_date: r.release_date,
      track_count: r.track_count,
      artwork_url: r.artwork_url,
      collection_price: r.collection_price ?? 0,
      // Add some realistic demo ratings/notes for a few items
      user_rating: idx === 0 ? 5 : idx === 1 ? 4 : idx === 3 ? 3 : null,
      user_notes: idx === 0 ? 'One of my all-time favorites.' : idx === 1 ? 'Great singles here.' : idx === 3 ? 'Solid listen, worth revisiting.' : null,
      created_at: nowISO(),
      updated_at: nowISO(),
    }));

    const seeded: MockStore = { users: [demoUser], library: seededLibrary };
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(seeded));
    return seeded;
  }
  try {
    const parsed = JSON.parse(stored) as MockStore;
    // If store exists but has no users, add demo user and sample items
    if ((!parsed.users || parsed.users.length === 0) && parsed.library && parsed.library.length === 0) {
      const demoUserId = createId();
      const demoUser = {
        id: demoUserId,
        email: 'demo@example.com',
        password: 'password123',
        createdAt: nowISO(),
      };
      const seededLibrary = sampleResults.map((r, idx) => ({
        id: createId(),
        userId: demoUserId,
        apple_catalog_id: r.apple_catalog_id,
        title: r.title,
        artist_name: r.artist_name,
        genre: r.genre,
        release_date: r.release_date,
        track_count: r.track_count,
        artwork_url: r.artwork_url,
        collection_price: r.collection_price ?? 0,
        user_rating: idx === 0 ? 5 : idx === 1 ? 4 : idx === 3 ? 3 : null,
        user_notes: idx === 0 ? 'One of my all-time favorites.' : idx === 1 ? 'Great singles here.' : idx === 3 ? 'Solid listen, worth revisiting.' : null,
        created_at: nowISO(),
        updated_at: nowISO(),
      }));
      parsed.users = [demoUser];
      parsed.library = seededLibrary;
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(parsed));
      return parsed;
    }
    return parsed as MockStore;
  } catch {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(defaultStore));
    return defaultStore;
  }
}

function saveStore(store: MockStore) {
  if (typeof window === 'undefined') return;
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(store));
}

function nowISO() {
  return new Date().toISOString();
}

function createId() {
  return typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function'
    ? crypto.randomUUID()
    : Math.random().toString(36).slice(2, 11);
}

function authToken(userId: string) {
  return `mock-token:${userId}`;
}

function userIdFromToken(token: string) {
  if (!token?.startsWith('mock-token:')) return null;
  return token.split(':')[1];
}

function apiResponse(data: any, message = 'OK') {
  return {
    success: true,
    message,
    data,
    timestamp: new Date().toISOString(),
    path: '',
  };
}

function apiError(message: string) {
  return { success: false, message, data: null, timestamp: new Date().toISOString(), path: '' };
}

export async function registerMock(payload: { email: string; password: string }) {
  const store = getStore();
  const existing = store.users.find((user) => user.email === payload.email.toLowerCase());
  if (existing) {
    throw { response: { data: { message: 'Email already registered' } } };
  }
  const user = {
    id: createId(),
    email: payload.email.toLowerCase(),
    password: payload.password,
    createdAt: nowISO(),
  };
  store.users.push(user);
  saveStore(store);
  return apiResponse({ token: authToken(user.id), email: user.email, user_id: user.id }, 'Registered successfully');
}

export async function loginMock(payload: { email: string; password: string }) {
  const store = getStore();
  const user = store.users.find(
    (entry) => entry.email === payload.email.toLowerCase() && entry.password === payload.password
  );
  if (!user) {
    throw { response: { data: { message: 'Invalid email or password' } } };
  }
  return apiResponse({ token: authToken(user.id), email: user.email, user_id: user.id }, 'Logged in successfully');
}

export async function searchMock(query: string) {
  const normalized = query.toLowerCase();
  const results = sampleResults.filter((item) =>
    item.title.toLowerCase().includes(normalized) || item.artist_name.toLowerCase().includes(normalized)
  );
  return apiResponse(results, 'Search completed');
}

const sampleSongs = [
  {
    trackId: 1,
    trackName: 'Yellow',
    artistName: 'Coldplay',
    collectionName: 'Parachutes',
    artworkUrl100: 'https://is1-ssl.mzstatic.com/image/thumb/Music124/v4/b8/43/35/b84335c6-197c-5bc6-ff52-5797354b88c9/886973031872.jpg/100x100bb.jpg',
    artworkUrl600: 'https://is1-ssl.mzstatic.com/image/thumb/Music124/v4/b8/43/35/b84335c6-197c-5bc6-ff52-5797354b88c9/886973031872.jpg/600x600bb.jpg',
    previewUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3',
    trackTimeMillis: 297000,
  },
  {
    trackId: 2,
    trackName: 'Fix You',
    artistName: 'Coldplay',
    collectionName: 'X&Y',
    artworkUrl100: 'https://is1-ssl.mzstatic.com/image/thumb/Music124/v4/b8/43/35/b84335c6-197c-5bc6-ff52-5797354b88c9/886973031872.jpg/100x100bb.jpg',
    previewUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3',
    trackTimeMillis: 402000,
  },
  {
    trackId: 3,
    trackName: 'Adventure of a Lifetime',
    artistName: 'Coldplay',
    collectionName: 'A Head Full of Dreams',
    artworkUrl100: 'https://is1-ssl.mzstatic.com/image/thumb/Music124/v4/b8/43/35/b84335c6-197c-5bc6-ff52-5797354b88c9/886973031872.jpg/100x100bb.jpg',
    previewUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3',
    trackTimeMillis: 273000,
  },
  {
    trackId: 4,
    trackName: 'Rolling in the Deep',
    artistName: 'Adele',
    collectionName: '21',
    artworkUrl100: 'https://is1-ssl.mzstatic.com/image/thumb/Music124/v4/5f/5c/15/5f5c154c-2447-1662-8863-fd8c83c6d53c/886444793556.jpg/100x100bb.jpg',
    previewUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3',
    trackTimeMillis: 223000,
  },
  {
    trackId: 5,
    trackName: 'Someone Like You',
    artistName: 'Adele',
    collectionName: '21',
    artworkUrl100: 'https://is1-ssl.mzstatic.com/image/thumb/Music124/v4/5f/5c/15/5f5c154c-2447-1662-8863-fd8c83c6d53c/886444793556.jpg/100x100bb.jpg',
    previewUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3',
    trackTimeMillis: 285000,
  },
  {
    trackId: 6,
    trackName: 'Skyfall',
    artistName: 'Adele',
    collectionName: 'Skyfall (James Bond)',
    artworkUrl100: 'https://is1-ssl.mzstatic.com/image/thumb/Music124/v4/5f/5c/15/5f5c154c-2447-1662-8863-fd8c83c6d53c/886444793556.jpg/100x100bb.jpg',
    previewUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3',
    trackTimeMillis: 331000,
  },
  {
    trackId: 7,
    trackName: 'Paranoid Android',
    artistName: 'Radiohead',
    collectionName: 'OK Computer',
    artworkUrl100: 'https://is2-ssl.mzstatic.com/image/thumb/Music124/v4/ea/03/13/ea0313e4-9d35-8fad-1c2f-4e6c7df8ed90/0886971309299.jpg/100x100bb.jpg',
    previewUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3',
    trackTimeMillis: 405000,
  },
  {
    trackId: 8,
    trackName: 'Creep',
    artistName: 'Radiohead',
    collectionName: 'Pablo Honey',
    artworkUrl100: 'https://is2-ssl.mzstatic.com/image/thumb/Music124/v4/ea/03/13/ea0313e4-9d35-8fad-1c2f-4e6c7df8ed90/0886971309299.jpg/100x100bb.jpg',
    previewUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3',
    trackTimeMillis: 238000,
  },
];

export async function searchSongsMock(query: string) {
  const normalized = query.toLowerCase();
  const results = sampleSongs.filter((song) =>
    song.trackName.toLowerCase().includes(normalized) ||
    song.artistName.toLowerCase().includes(normalized) ||
    song.collectionName.toLowerCase().includes(normalized)
  );
  return apiResponse(results, 'Songs search completed');
}

function ensureUser(userId: string) {
  const store = getStore();
  const user = store.users.find((entry) => entry.id === userId);
  if (!user) {
    throw { response: { data: { message: 'Authentication required' } } };
  }
  return user;
}

export async function getLibraryMock(token: string | null) {
  const userId = userIdFromToken(token ?? '');
  if (!userId) throw { response: { data: { message: 'Authentication required' } } };
  ensureUser(userId);
  const store = getStore();
  const data = store.library.filter((item) => item.userId === userId);
  return apiResponse(data, 'Library fetched');
}

export async function addItemMock(token: string | null, payload: any) {
  const userId = userIdFromToken(token ?? '');
  if (!userId) throw { response: { data: { message: 'Authentication required' } } };
  ensureUser(userId);
  const store = getStore();
  if (store.library.some((item) => item.userId === userId && item.apple_catalog_id === payload.apple_catalog_id)) {
    throw { response: { data: { message: 'Album already in library' } } };
  }
  const item = {
    id: createId(),
    userId,
    apple_catalog_id: payload.apple_catalog_id,
    title: payload.title,
    artist_name: payload.artist_name,
    genre: payload.genre || 'Unknown',
    release_date: payload.release_date || new Date().toISOString().slice(0, 10),
    track_count: payload.track_count || 0,
    artwork_url: payload.artwork_url || '',
    collection_price: payload.collection_price || 0,
    user_rating: payload.user_rating ?? null,
    user_notes: payload.user_notes ?? null,
    created_at: nowISO(),
    updated_at: nowISO(),
  };
  store.library.push(item);
  saveStore(store);
  return apiResponse(item, 'Saved to library');
}

export async function updateItemMock(token: string | null, id: string, payload: any) {
  const userId = userIdFromToken(token ?? '');
  if (!userId) throw { response: { data: { message: 'Authentication required' } } };
  ensureUser(userId);
  const store = getStore();
  const item = store.library.find((entry) => entry.id === id && entry.userId === userId);
  if (!item) {
    throw { response: { data: { message: 'Item not found' } } };
  }
  item.user_rating = payload.user_rating ?? item.user_rating;
  item.user_notes = payload.user_notes ?? item.user_notes;
  item.updated_at = nowISO();
  saveStore(store);
  return apiResponse(item, 'Library item updated');
}

export async function deleteItemMock(token: string | null, id: string) {
  const userId = userIdFromToken(token ?? '');
  if (!userId) throw { response: { data: { message: 'Authentication required' } } };
  ensureUser(userId);
  const store = getStore();
  const index = store.library.findIndex((entry) => entry.id === id && entry.userId === userId);
  if (index === -1) {
    throw { response: { data: { message: 'Item not found' } } };
  }
  store.library.splice(index, 1);
  saveStore(store);
  return apiResponse(null, 'Library item removed');
}

export async function analyticsMock(token: string | null) {
  const userId = userIdFromToken(token ?? '');
  if (!userId) throw { response: { data: { message: 'Authentication required' } } };
  ensureUser(userId);
  const store = getStore();
  const library = store.library.filter((entry) => entry.userId === userId);
  const genres = library.reduce<Record<string, number>>((acc, item) => {
    const genre = item.genre || 'Unknown';
    acc[genre] = (acc[genre] || 0) + 1;
    return acc;
  }, {});
  const releasesByYear = library.reduce<Record<string, number>>((acc, item) => {
    const year = item.release_date?.slice(0, 4) || 'Unknown';
    acc[year] = (acc[year] || 0) + 1;
    return acc;
  }, {});
  const ratings = library.reduce<Record<string, number>>((acc, item) => {
    const rating = item.user_rating == null ? 'Unrated' : String(item.user_rating);
    acc[rating] = (acc[rating] || 0) + 1;
    return acc;
  }, {});
  const trackBuckets = library.reduce<Record<string, number>>((acc, item) => {
    const count = item.track_count || 0;
    const bucket = count <= 5 ? '1-5' : count <= 10 ? '6-10' : count <= 15 ? '11-15' : '16+';
    acc[bucket] = (acc[bucket] || 0) + 1;
    return acc;
  }, {});
  return apiResponse(
    {
      totalAlbums: library.length,
      averageRating:
        library.filter((item) => item.user_rating != null).reduce((sum, item) => sum + (item.user_rating ?? 0), 0) /
        Math.max(1, library.filter((item) => item.user_rating != null).length),
      averagePrice:
        library.filter((item) => item.collection_price != null).reduce((sum, item) => sum + (item.collection_price ?? 0), 0) /
        Math.max(1, library.length),
      topArtist: library.length === 0 ? 'N/A' : Object.entries(library.reduce<Record<string, number>>((acc, item) => {
        acc[item.artist_name] = (acc[item.artist_name] || 0) + 1;
        return acc;
      }, {})).sort((a, b) => b[1] - a[1])[0][0],
      topGenre: library.length === 0 ? 'N/A' : Object.entries(genres).sort((a, b) => b[1] - a[1])[0][0],
      genres: Object.entries(genres).map(([name, count]) => ({ name, count })),
      releasesByYear: Object.entries(releasesByYear).map(([year, count]) => ({ year, count })),
      ratings: Object.entries(ratings).map(([name, count]) => ({ name, count })),
      trackCounts: Object.entries(trackBuckets).map(([bucket, count]) => ({ bucket, count })),
    },
    'Analytics generated'
  );
}

export async function insightsMock(token: string | null) {
  const userId = userIdFromToken(token ?? '');
  if (!userId) throw { response: { data: { message: 'Authentication required' } } };
  ensureUser(userId);
  const store = getStore();
  const library = store.library.filter((entry) => entry.userId === userId);
  
  if (library.length === 0) {
    return apiResponse('Your library is empty. Search and save a few albums to start generating insights.', 'Insights generated');
  }

  // Calculate analytics
  const genres = library.reduce<Record<string, number>>((acc, item) => {
    const genre = item.genre || 'Unknown';
    acc[genre] = (acc[genre] || 0) + 1;
    return acc;
  }, {});
  
  const topGenre = Object.entries(genres).sort((a, b) => b[1] - a[1])[0][0];
  
  const artists = library.reduce<Record<string, number>>((acc, item) => {
    acc[item.artist_name] = (acc[item.artist_name] || 0) + 1;
    return acc;
  }, {});
  const topArtist = Object.entries(artists).sort((a, b) => b[1] - a[1])[0][0];
  
  const years = Array.from(new Set(library.map((item) => item.release_date?.slice(0, 4) || 'Unknown'))).length;
  
  const avgRating = library.filter((i) => i.user_rating != null).reduce((sum, i) => sum + (i.user_rating ?? 0), 0) / 
                    Math.max(1, library.filter((i) => i.user_rating != null).length);

  // 1. Main library overview
  let insights = `📚 **Your Music Library Overview**\n`;
  insights += `You have ${library.length} albums in your collection with a strong ${topGenre} profile. ${topArtist} is your most frequent artist. Your collection spans ${years} years.\n\n`;

  // 2. Mood Classification
  const moodData = classifyMoodFrontend(topGenre, avgRating);
  insights += `🎵 **Your Music Mood**\n${moodData}\n\n`;

  // 3. Artist Recommendations
  const recommendations = generateRecommendationsFrontend(library, topGenre, topArtist);
  insights += `⭐ **Artist Deep Dive**\n${recommendations}\n\n`;

  // 4. Playlist Suggestions
  const playlists = generatePlaylistsFrontend(library, topGenre);
  insights += `🎧 **Suggested Playlists**\n${playlists}\n\n`;

  // 5. Quality Analysis
  const quality = analyzeQualityFrontend(library, avgRating);
  insights += `💎 **Collection Quality**\n${quality}`;

  return apiResponse(insights, 'Insights generated');
}

function classifyMoodFrontend(topGenre: string, avgRating: number): string {
  const genre = topGenre.toLowerCase();
  let moodType = '';
  let energyLevel = '';

  if (genre.includes('metal') || genre.includes('rock') || genre.includes('punk')) {
    moodType = 'HIGH ENERGY & REBELLIOUS';
    energyLevel = '⚡⚡⚡';
  } else if (genre.includes('classical') || genre.includes('jazz') || genre.includes('ambient')) {
    moodType = 'CALM & INTROSPECTIVE';
    energyLevel = '😌';
  } else if (genre.includes('pop') || genre.includes('edm') || genre.includes('dance')) {
    moodType = 'UPBEAT & DANCEABLE';
    energyLevel = '💃';
  } else if (genre.includes('blues') || genre.includes('soul') || genre.includes('r&b')) {
    moodType = 'SOULFUL & EMOTIONAL';
    energyLevel = '💜';
  } else if (genre.includes('hip-hop') || genre.includes('rap')) {
    moodType = 'DYNAMIC & EXPRESSIVE';
    energyLevel = '🔥';
  } else {
    moodType = 'ECLECTIC & DIVERSE';
    energyLevel = '🌈';
  }

  const ratingQuality = avgRating >= 4.5 ? 'You rate albums very highly!' 
                                         : avgRating >= 3.5 ? 'You have solid taste with consistent quality.'
                                         : 'You\'re open to exploring different styles.';

  return `${energyLevel} ${moodType}\nYour ${topGenre} genre dominates your collection. ${ratingQuality}`;
}

function generateRecommendationsFrontend(library: any[], topGenre: string, topArtist: string): string {
  // Top 3 artists by album count
  const artistCounts = library.reduce<Record<string, any[]>>((acc, item) => {
    if (!acc[item.artist_name]) acc[item.artist_name] = [];
    acc[item.artist_name].push(item);
    return acc;
  }, {});

  const topArtists = Object.entries(artistCounts)
    .sort((a, b) => b[1].length - a[1].length)
    .slice(0, 3)
    .map(([artist, albums]) => {
      const avgRating = albums.filter((i) => i.user_rating != null).reduce((sum, i) => sum + (i.user_rating ?? 0), 0) / 
                        Math.max(1, albums.filter((i) => i.user_rating != null).length);
      return `• **${artist}** – ${albums.length} album${albums.length > 1 ? 's' : ''} (★ ${avgRating.toFixed(1)} avg)`;
    })
    .join('\n');

  // Underrated gems
  const gems = library
    .filter((i) => i.user_rating != null && i.user_rating <= 3 && (i.track_count == null || i.track_count > 8))
    .slice(0, 2)
    .map((i) => `• **${i.title}** by ${i.artist_name} – Give this another listen!`)
    .join('\n');

  const gemsSection = gems || 'All rated albums are highly appreciated!';

  return `Most Prolific:\n${topArtists}\n\nUnderrated Gems to Revisit:\n${gemsSection}`;
}

function generatePlaylistsFrontend(library: any[], topGenre: string): string {
  // Era-based playlist
  const eraMap: Record<string, number> = {};
  library.forEach((item) => {
    const year = parseInt(item.release_date?.slice(0, 4) || '2020');
    let era = '';
    if (year < 1990) era = '80s & Earlier';
    else if (year < 2000) era = '90s';
    else if (year < 2010) era = '2000s';
    else if (year < 2020) era = '2010s';
    else era = '2020s';
    eraMap[era] = (eraMap[era] || 0) + 1;
  });

  const topEra = Object.entries(eraMap).sort((a, b) => b[1] - a[1])[0];
  let playlists = `🎬 '${topEra[0]} Selection' – Your largest collection era (${topEra[1]} albums)\n`;

  // Rating-based playlists
  const highRated = library.filter((i) => i.user_rating != null && i.user_rating >= 5).length;
  const goodRated = library.filter((i) => i.user_rating != null && i.user_rating >= 4).length;

  if (highRated > 0) {
    playlists += `⭐ 'Favorites' – ${highRated} albums rated 5 stars\n`;
  }
  if (goodRated > 2) {
    playlists += `😍 'Solid Picks' – ${goodRated} albums rated 4+ stars\n`;
  }

  playlists += `🎸 '${topGenre} Master Class' – Dive deeper into your favorite genre`;

  return playlists;
}

function analyzeQualityFrontend(library: any[], avgRating: number): string {
  const ratedCount = library.filter((i) => i.user_rating != null).length;
  const completion = Math.round((ratedCount * 100) / library.length);

  let analysis = `You've rated ${ratedCount}/${library.length} albums (${completion}% completion).\n`;

  const qualityTier = avgRating >= 4.5 ? '🌟 EXCELLENT – Highly curated collection'
                                        : avgRating >= 4.0 ? '🎯 GREAT – Strong decision-making'
                                        : avgRating >= 3.0 ? '📈 GOOD – Room to explore more gems'
                                        : '🔍 DISCOVERING – Keep exploring!';

  analysis += qualityTier;

  return analysis;
}
