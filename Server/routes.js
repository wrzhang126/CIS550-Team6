// ===========================================================================
// IMPORTS
// ===========================================================================
const connection = require("./db");


// ===========================================================================
// ROUTE FUNCTIONS
// ===========================================================================
async function hello(req, res) {
    // a GET request to /hello?name=Steve
    if (req.query.name) {
        res.send(`Hello, ${req.query.name}! Welcome to the the server!`)
    } else {
        res.send(`Hello! Welcome to the server!`)
    }
}
async function test_db_query(req, res) {

    if (req.query.id) {

        const artist_id = req.query.id
        console.log(artist_id)
        
        connection.query(
            `SELECT *  
            FROM Artist a
            WHERE a.artist_id = "${artist_id}"`, 
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
            `SELECT *  
            FROM Artist a
            WHERE artist_id IN (
                SELECT artist_id
                FROM ArtistGenre
                WHERE genre = 'hip hop'
            )
            ORDER BY popularity DESC
            LIMIT 10;`, 
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

// ===========================================================================
// ROUTE FUNCTIONS
// ===========================================================================
module.exports = {
    hello,
    test_db_query
}