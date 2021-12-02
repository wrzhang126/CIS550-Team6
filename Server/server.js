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
