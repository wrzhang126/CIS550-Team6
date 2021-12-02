// ===========================================================================
// IMPORTS
// ===========================================================================
const connection = require("./db");


// ===========================================================================
// ROUTE FUNCTIONS
// ===========================================================================

// ------------------------------- Generic Routes -----------------------------
function hello(req, res) {
    // a GET request to /hello?name=Steve
    if (req.query.name) {
        res.send(`Hello, ${req.query.name}! Welcome to the the server!`)
    } else {
        res.send(`Hello! Welcome to the server!`)
    }
}
function test_db_query(req, res) {

    if (req.query.id) {

        // get any req params
        const artist_id = req.query.id
        
        connection.query(
            // query
            `SELECT *  
            FROM Artist a
            WHERE a.artist_id = "${artist_id}"`, 
            // callback
            function (error, results, fields) {
                if (error) {
                    console.log(error)
                    res.json({ error: error })
                } else if (results) {
                    res.json({ results: results })
                }
            }
        );
   
    } else {
        // Select top 10 popular artists whose genre is hip hop
        connection.query(
            // query
            `SELECT *  
            FROM Artist a
            WHERE artist_id IN (
                SELECT artist_id
                FROM ArtistGenre
                WHERE genre = 'hip hop'
            )
            ORDER BY popularity DESC
            LIMIT 10;`, 
            // callback
            function (error, results, fields) {
                if (error) {
                    console.log(error)
                    res.json({ error: error })
                } else if (results) {
                    res.json({ results: results })
                }
            }
        );
    }
}

// ------------------------------- Artist Routes -----------------------------
function all_artists(req, res) {
    
    // get pagesize from query parameter; if no pagesize was given set value to 10
    const pagesize = req.query.pagesize ? req.query.pagesize : 100
    // get page number; if no page number was given set value to 1
    const page = req.query.page ? req.query.page : 1
    
    connection.query(
        // query
        `SELECT a.artist_id, a.name, a.popularity
        FROM Artist a
        ORDER BY a.name
        LIMIT ${(page-1)*pagesize}, ${pagesize}`, 
        // callback
        function (error, results, fields) {
            if (error) {
                console.log(error)
                res.json({ error: error })
            } else if (results) {
                res.json({ results: results })
            }
        }
    );
}

function search_artists(req, res) {
    
    // get pagesize from query parameter; defualt 100
    const pagesize = req.query.pagesize ? req.query.pagesize : 100
    // get page number; defualt 1
    const page = req.query.page ? req.query.page : 1
    // get name prameter; default empty string
    const name = req.query.name ? req.query.name : ""
    // get popularity prameters; default 0 and 100 respectively
    const popularityHigh = req.query.popularityHigh ? req.query.popularityHigh : 100
    const popularityLow = req.query.popularityLow ? req.query.popularityLow : 0
    
    connection.query(
        // query
        `SELECT a.artist_id, a.name, a.popularity
        FROM Artist a
        WHERE       a.name LIKE '%${name}%' 
                AND a.popularity >= ${popularityLow}
                AND a.popularity <= ${popularityHigh}
        ORDER BY a.popularity DESC, a.name
        LIMIT ${(page-1)*pagesize}, ${pagesize}`, 
        // callback
        function (error, results, fields) {
            if (error) {
                console.log(error)
                res.json({ error: error })
            } else if (results) {
                res.json({ results: results })
            }
        }
    );
}

function get_artist_by_id(req, res) {
    // if id was passed in
    if (req.query.id) {
        // get id
        const artist_id = req.query.id
        
        connection.query(
            // query
            `SELECT *  
            FROM Artist a
            WHERE a.artist_id = "${artist_id}"`, 
            // callback
            function (error, results, fields) {
                if (error) {
                    console.log(error)
                    res.json({ error: error })
                } else if (results) {
                    res.json({ results: results })
                }
            }
        );
    // else id was not passed in
    } else {
        // return an empty array
        res.json({ results: [] })
    }
}

// ------------------------------- Song Routes -----------------------------
function all_songs(req, res) {
    
    // get pagesize from query parameter; if no pagesize was given set value to 10
    const pagesize = req.query.pagesize ? req.query.pagesize : 100
    // get page number; if no page number was given set value to 1
    const page = req.query.page ? req.query.page : 1
    
    connection.query(
        // query
        `SELECT s.song_id, s.title, s.album
        FROM Song s
        ORDER BY s.title
        LIMIT ${(page-1)*pagesize}, ${pagesize}`, 
        // callback
        function (error, results, fields) {
            if (error) {
                console.log(error)
                res.json({ error: error })
            } else if (results) {
                res.json({ results: results })
            }
        }
    );
}

function search_songs(req, res) {
    
    // get pagesize from query parameter; defualt 100
    const pagesize = req.query.pagesize ? req.query.pagesize : 100
    // get page number; defualt 1
    const page = req.query.page ? req.query.page : 1
    // get name prameter; default empty string
    const name = req.query.name ? req.query.name : ""
    // get song prameters; defaults 0 and 1 for low and high respectively
    const danceHigh = req.query.danceHigh ? req.query.danceHigh : 100
    const danceLow = req.query.danceLow ? req.query.danceLow : 0
    const energyHigh = req.query.energyHigh ? req.query.energyHigh : 100
    const energyLow = req.query.energyLow ? req.query.energyLow : 0
    const livenessHigh = req.query.livenessHigh ? req.query.livenessHigh : 100
    const livenessLow = req.query.livenessLow ? req.query.livenessLow : 0
    const tempoHigh = req.query.tempoHigh ? req.query.tempoHigh : 100
    const tempoLow = req.query.tempoLow ? req.query.tempoLow : 0
    const valenceHigh = req.query.valenceHigh ? req.query.valenceHigh : 100
    const valenceLow = req.query.valenceLow ? req.query.valenceLow : 0
    
    connection.query(
        // query
        `SELECT s.song_id, s.title, s.album
        FROM Song s
        WHERE       s.title LIKE '%${name}%' 
                AND s.danceability >= ${danceLow}
                AND s.danceability <= ${danceHigh}
                AND s.energy >= ${energyLow}
                AND s.energy <= ${energyHigh}
                AND s.liveness >= ${livenessLow}
                AND s.liveness <= ${livenessHigh}
                AND s.tempo >= ${tempoLow}
                AND s.tempo <= ${tempoHigh}
                AND s.valence >= ${valenceLow}
                AND s.valence <= ${valenceHigh}
        ORDER BY s.title
        LIMIT ${(page-1)*pagesize}, ${pagesize}`, 
        // callback
        function (error, results, fields) {
            if (error) {
                console.log(error)
                res.json({ error: error })
            } else if (results) {
                res.json({ results: results })
            }
        }
    );
}

function get_song_by_id(req, res) {
    // if id was passed in
    if (req.query.id) {
        // get id
        const song_id = req.query.id
        
        connection.query(
            // query
            `SELECT *  
            FROM Song s
            WHERE s.song_id = "${song_id}"`, 
            // callback
            function (error, results, fields) {
                if (error) {
                    console.log(error)
                    res.json({ error: error })
                } else if (results) {
                    res.json({ results: results })
                }
            }
        );
    // else id was not passed in
    } else {
        // return an empty array
        res.json({ results: [] })
    }
}

// ===========================================================================
// EXPORTS
// ===========================================================================
module.exports = {
    hello,
    test_db_query,
    all_artists,
    search_artists,
    get_artist_by_id,
    all_songs,
    search_songs,
    get_song_by_id
}