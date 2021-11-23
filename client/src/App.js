import SearchByArtistPage from './components/SearchByArtistPage';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/searchbyartist" element={<SearchByArtistPage/>}/>
          <Route path="/searchbysong" element={<SearchBySongPage/>}/>
        </Routes>
      </Router>
    </div>
    
  );
}

export default App;
