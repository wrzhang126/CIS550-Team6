import Navigationbar from './Navbar';
import Filter from './Filter';
import Body from './Body';
import '../App.css'

export default function SearchByArtistPage() {
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

