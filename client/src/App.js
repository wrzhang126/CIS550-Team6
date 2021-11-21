import Navigationbar from './components/Navbar';
import Filter from './components/Filter';
import Body from './components/Body';
import Image from 'react-bootstrap/Image';

import './App.css'
function App() {
  return (
    <div>
      <Navigationbar/>
    <div id="main">
      <div id="sticky" style={{width: "20%", minWidth: "400px", padding: "10px 0px 0px 10px"}}>
          <Filter/>
      </div>
      <div id="sticky"style={{width: "70%", minWidth: "700px", padding: "10px 0px 0px 10px"}}>
        <Body />
      </div>
    </div>
    </div>
    
  );
}

export default App;
