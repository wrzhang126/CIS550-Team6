import React from "react";
import SearchByArtistPage from "./components/SearchByArtistPage";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ArtistProfile from "./components/ArtistProfilePage";
import RankingPage from "./components/RankingPage";
import BoringPage from "./components/BoringPage";
import SearchSongsPage from "./components/SearchSongsPage";
import StartPage from "./components/StartPage";
import Navigationbar from "./components/Navbar";

function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/search/artists" element={<SearchByArtistPage />} />
          <Route path="/search/songs" element={<SearchSongsPage />} />
          <Route path="/artist/:id" element={<ArtistProfile />} />
          <Route path="/" element={<StartPage />} />
          <Route path="/ranking" element={<RankingPage />} />
          <Route path="/boringpage" element={<BoringPage />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
