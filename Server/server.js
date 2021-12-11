// ===========================================================================
// IMPORTS
// ===========================================================================
// dependencies
const express = require("express");
const cors = require('cors');

// local imports
const routes = require('./routes')

// configure .env variables
require('dotenv').config()

// ===========================================================================
// EXPRESS CONFIGURATION
// ===========================================================================
const app = express();
const PORT = process.env.SERVER_PORT || 8080 ;

// set up app to allow CORS connection
app.use(cors({origin: '*'}));

// ===========================================================================
// ROUTING
// ===========================================================================
app.get("/", routes.hello);
app.get("/artist", routes.test_db_query);
app.get("/all/artists", routes.all_artists);
app.get("/search/artists", routes.search_artists);
app.get("/find/artist", routes.get_artist_by_id);
app.get("/find/artist/song", routes.get_songs_by_artistid);
app.get("/all/songs", routes.all_songs);
app.get("/search/songs", routes.search_songs);
app.get("/find/song", routes.get_song_by_id);
app.get("/songs", routes.all_songs);
app.get("/song", routes.get_song_by_id);
app.get("/search/songs", routes.search_songs);
app.get("/rankings/Billboard", routes.search_billboard_ranking);
app.get("/rankings/Spotify", routes.search_spotify_ranking);
app.get("/awards/Grammy", routes.search_grammy_songs);
app.get("/rankings/Billboard/artist", routes.get_billboardsongs_by_artistid);
app.get("/rankings/Spotify/artist", routes.get_spotifysongs_by_artistid);
app.get("/awards/Grammy/artist", routes.get_grammysongs_by_artistid);

// ===========================================================================
// LISTENER
// ===========================================================================
app.listen(PORT, (err) => {
  if (err) {
    console.log(err.message);
  } else {
    console.log(`App running on port ${PORT}`);
  }
});
