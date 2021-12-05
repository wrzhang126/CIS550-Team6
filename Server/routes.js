// ===========================================================================
// IMPORTS
// ===========================================================================
const connection = require("./db");


// ===========================================================================
// ROUTE FUNCTIONS
// ===========================================================================
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
// ===========================================================================
// EXPORTS
// ===========================================================================
module.exports = {
    hello,
    test_db_query,
    get_song_by_id,
    all_songs
    
}
