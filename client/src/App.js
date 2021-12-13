import SearchByArtistPage from './components/SearchByArtistPage';
import SearchBySongPage from './components/SearchBySongPage';
import RankingPage from './components/RankingPage';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element= {<SearchByArtistPage/>}/>
          <Route path="/searchbyartist" element={<SearchByArtistPage/>}/>
          <Route path="/songs" element={<SearchBySongPage/>}/>
          <Route path="/ranking" element={<RankingPage/>}/>
        </Routes>
      </Router>
    </div>
    
  );
}

export default App;
