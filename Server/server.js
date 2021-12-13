// ===========================================================================
// IMPORTS
// ===========================================================================
// dependencies
const express = require("express");
const cors = require("cors");

// local imports
const routes = require("./routes");

// configure .env variables
require("dotenv").config();

// ===========================================================================
// EXPRESS CONFIGURATION
// ===========================================================================
const app = express();
const PORT = process.env.SERVER_PORT || 8080;

// set up app to allow CORS connection
app.use(cors({ origin: "*" }));

// ===========================================================================
// ROUTING
// ===========================================================================
app.get("/", routes.hello);
app.get("/artist", routes.test_db_query);
app.get("/all/artists", routes.all_artists);
app.get("/search/artists", routes.search_artists);
app.get("/artist/:id", routes.get_artist_by_id);
app.get("/songs/artist/:id", routes.get_songs_by_artistid);
app.get("/songs", routes.all_songs);
app.get("/song", routes.get_song_by_id);
app.get("/search/songs", routes.search_songs);

app.get("/ranking", routes.awarded_artist);
app.get("/awards", routes.get_awardstats_by_artist);
app.get("/awards/billboard", routes.get_billboardsongs_by_artistid);
app.get("/awards/spotify", routes.get_spotifysongs_by_artistid);
app.get("/awards/grammy", routes.get_grammysongs_by_artistid);

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
