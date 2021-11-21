import SearchByArtistPage from './components/SearchByArtistPage';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';

import './App.css'
function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/searchbyartist" element={<SearchByArtistPage/>}/>
          <Route path='/searchbysong' element={<div>I am a placeholder</div>}/>
        </Routes>

      </Router>
    </div>
    
  );
}

export default App;
