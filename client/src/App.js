import React from "react";
import SearchByArtistPage from "./components/SearchByArtistPage";
import SearchBySongPage from "./components/SearchBySongPage";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ArtistProfile from "./components/ArtistProfilePage";
import RankingPage from "./components/RankingPage";
import BoringPage from "./components/BoringPage";
import SearchSongsPage from "./components/SearchSongsPage";

function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/search/artists" element={<SearchByArtistPage />} />
          <Route path="/songs" element={<SearchSongsPage />} />
          <Route path="/artist/:id" element={<ArtistProfile />} />
          <Route path="/" element={<SearchByArtistPage />} />
          <Route path="/ranking" element={<RankingPage />} />
          <Route path="/boringpage" element={<BoringPage />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
