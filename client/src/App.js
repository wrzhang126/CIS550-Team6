import SearchByArtistPage from './components/SearchByArtistPage';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';

import './App.css'
function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/searchbyartist" element={<SearchByArtistPage/>}/>
        </Routes>
      </Router>
    </div>
    
  );
}

export default App;
