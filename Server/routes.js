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

/*function get_song_by_id(req, res) {
    // if id was passed in
    if (req.query.id) {
        // get id
        const song_id = req.query.id

        connection.query(
            // query
            `SELECT *, year(release_date) AS year
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
    var pagesize = req.query.pagesize ? req.query.pagesize : 100;
    // get page number; if no page number was given set value to 1
    var page = req.query.page ? req.query.page : 1;
    var start = (page - 1) * pagesize;
    connection.query(
        // query
        `SELECT *, year(release_date) AS year
        FROM Song s
        ORDER BY s.title
        LIMIT 0, 100`,
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
    const startYear = req.query.startYear ? req.query.startYear : 1000
    const endYear = req.query.endYear ? req.query.endYear : 2021
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
        `SELECT s.song_id, s.title, s.album, s.album_id, year(release_date) AS year
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
                AND year(release_date) >= ${startYear}
                AND year(release_date) <= ${endYear}
        ORDER BY s.title
        LIMIT 200`,
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
}*/

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

// ------------------------------- Ranking Routes -----------------------------

function search_billboard_ranking(req, res) {

    const pagesize = req.query.pagesize ? req.query.pagesize : 10
    const page = req.query.page ? req.query.page : 1
    // get name prameter; default empty string
    const name = req.query.name ? req.query.name : ""
    // get ranking parameters
    const rankLow = req.query.rankLow ? req.query.rankLow : 0
    const rankHigh = req.query.rankHigh ? req.query.rankHigh : 100


    if (req.query.week && !isNaN(req.query.week)) {

      const week = req.query.week

      connection.query(
          // query
          `SELECT df.*, df2.title FROM
          (SELECT * FROM BillboardRanking
            WHERE week = '${week}'
            AND ranking >= ${rankLow}
            AND ranking <= ${rankHigh})df
            JOIN (SELECT song_id, title FROM Song WHERE title LIKE '%${name}%') df2
            ON df.song_id = df2.song_id
           ORDER BY ranking`,
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
    else {

      const offset = (page - 1) * pagesize

      connection.query(
          // query
          `SELECT df.*, df2.title FROM
          (SELECT * FROM BillboardRanking
            WHERE ranking >= ${rankLow}
            AND ranking <= ${rankHigh})df
            JOIN (SELECT song_id, title FROM Song
              WHERE title LIKE '%${name}%') df2
            ON df.song_id = df2.song_id
           ORDER BY week, ranking
          LIMIT ${offset}, ${pagesize}`,
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

function search_spotify_ranking(req, res) {

    const pagesize = req.query.pagesize ? req.query.pagesize : 10
    const page = req.query.page ? req.query.page : 1
    // get name prameter; default empty string
    const name = req.query.name ? req.query.name : ""

    // get ranking parameters
    const rankLow = req.query.rankLow ? req.query.rankLow : 0
    const rankHigh = req.query.rankHigh ? req.query.rankHigh : 200


    if (req.query.week && !isNaN(req.query.week)) {

      const week = req.query.week

      connection.query(
          // query
          `SELECT df.*, df2.title FROM
          (SELECT * FROM SpotifyRanking
            WHERE week = '${week}'
            AND ranking >= ${rankLow}
            AND ranking <= ${rankHigh})df
            JOIN (SELECT song_id, title FROM Song WHERE title LIKE '%${name}%') df2
            ON df.song_id = df2.song_id
           ORDER BY ranking`,
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
    else {

      const offset = (page - 1) * pagesize

      connection.query(
          // query
          `SELECT df.*, df2.title FROM
          (SELECT * FROM SpotifyRanking
            WHERE ranking >= ${rankLow}
            AND ranking <= ${rankHigh})df
            JOIN (SELECT song_id, title FROM Song
              WHERE title LIKE '%${name}%') df2
            ON df.song_id = df2.song_id
           ORDER BY week, ranking
          LIMIT ${offset}, ${pagesize}`,
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



// ------------------------------- Recommendation Routes -----------------------------


function get_awardstats_by_artist(req, res) {

    const pagesize = req.query.pagesize ? req.query.pagesize : 10
    const page = req.query.page ? req.query.page : 1
    // get name prameter; default empty string
    const artistname = req.query.name ? req.query.name : ""


    // if id was passed in
    if (req.query.artistname && !isNan(req.query.artisname)) {

        const artist_id = req.query.id

        connection.query(
            // query
            `SELECT df3.artist_id, Artist.name AS artist, COUNT(DISTINCT song_id) AS num_songs ,
            SUM(billboardTag) AS num_songs_billboard, SUM(spotifyTag) AS num_songs_spotify ,
            SUM(grammyTag) AS num_songs_grammy  FROM (SELECT df2.*,
            CASE WHEN GA.song_id IS NULL THEN 0 ELSE 1 END AS grammyTag
            FROM (SELECT df.*, CASE WHEN SP.song_id IS NULL THEN 0 ELSE 1 END AS spotifyTag
            FROM (SELECT SA.*, CASE WHEN BR.song_id IS NULL THEN 0 ELSE 1 END AS billboardTag FROM SongArtist SA
            LEFT  JOIN (SELECT DISTINCT song_id FROM  BillboardRanking)BR on SA.song_id = BR.song_id) df
            LEFT JOIN (SELECT DISTINCT song_id FROM  SpotifyRanking)SP on SP.song_id = df.song_id)  df2
            LEFT JOIN (SELECT DISTINCT song_id FROM GrammyAwards) GA on GA.song_id = df2.song_id) df3
            JOIN Artist ON Artist.artist_id = df3.artist_id
            WHERE artist LIKE '${artistname}'
            GROUP BY (df3.artist_id)`,
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
        connection.query(
            // query
            `SELECT df3.artist_id, Artist.name AS artist, COUNT(DISTINCT song_id) AS num_songs ,
            SUM(billboardTag) AS num_songs_billboard, SUM(spotifyTag) AS num_songs_spotify ,
            SUM(grammyTag) AS num_songs_grammy  FROM (SELECT df2.*,
            CASE WHEN GA.song_id IS NULL THEN 0 ELSE 1 END AS grammyTag
            FROM (SELECT df.*, CASE WHEN SP.song_id IS NULL THEN 0 ELSE 1 END AS spotifyTag
            FROM (SELECT SA.*, CASE WHEN BR.song_id IS NULL THEN 0 ELSE 1 END AS billboardTag FROM SongArtist SA
            LEFT  JOIN (SELECT DISTINCT song_id FROM  BillboardRanking)BR on SA.song_id = BR.song_id) df
            LEFT JOIN (SELECT DISTINCT song_id FROM  SpotifyRanking)SP on SP.song_id = df.song_id)  df2
            LEFT JOIN (SELECT DISTINCT song_id FROM GrammyAwards) GA on GA.song_id = df2.song_id) df3
            JOIN Artist ON Artist.artist_id = df3.artist_id
            GROUP BY (df3.artist_id)
            ORDER BY artist
            LIMIT ${offset}, ${pagesize}`,
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

function search_grammy_songs(req, res) {

    const pagesize = req.query.pagesize ? req.query.pagesize : 10
    const page = req.query.page ? req.query.page : 1
    // get name prameter; default empty string
    const name = req.query.name ? req.query.name : ""
    // get ranking parameters
    const award = req.query.award ? req.query.award : ""


    if (req.query.year && !isNaN(req.query.year)) {

      const year = req.query.year

      connection.query(
          // query
          `SELECT df.*, df2.title FROM
          (SELECT * FROM GrammyAwards
            WHERE year = ${year}
            AND award LIKE '%{award}%')df
            JOIN (SELECT song_id, title FROM Song
              WHERE title LIKE '%${name}%') df2
            ON df.song_id = df2.song_id
           ORDER BY year, award`,
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
    else{

      const offset = (page - 1) * pagesize

      connection.query(
          // query
          `SELECT df.*, df2.title FROM
          (SELECT * FROM GrammyAwards
            WHERE award LIKE '%{award}%')df
            JOIN (SELECT song_id, title FROM Song
              WHERE title LIKE '%${name}%') df2
            ON df.song_id = df2.song_id
           ORDER BY year, award
          LIMIT ${offset}, ${pagesize}`,
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

function get_billboardsongs_by_artistid(req, res) {

    const pagesize = req.query.pagesize ? req.query.pagesize : 10
    const page = req.query.page ? req.query.page : 1
    // get name prameter; default empty string
    const name = req.query.name ? req.query.name : ""

    // if id was passed in
    if (req.query.id) {

        const artist_id = req.query.id

        connection.query(
            // query
            `SELECT df2.artist_id, df2.artist, df2.latestweek, Song.* FROM
              (SELECT df.* , Artist.name AS artist FROM
              (SELECT DISTINCT BillboardRanking.song_id, MAX(BillboardRanking.week) as latestweek ,
              SA.artist_id FROM BillboardRanking
              JOIN SongArtist SA
              ON BillboardRanking.song_id = SA.song_id
              WHERE SA.artist_id = "${artist_id}"
              GROUP BY BillboardRanking.song_id) df
              JOIN Artist ON df.artist_id=Artist.artist_id) df2
              JOIN Song ON Song.song_id=df2.song_id
              WHERE Song.title LIKE '${name}'
              ORDER BY artist`,
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
        connection.query(
            // query
            `SELECT df2.artist_id, df2.artist, df2.latestweek, Song.* FROM
            (SELECT df.* , Artist.name AS artist FROM
            (SELECT DISTINCT BillboardRanking.song_id, MAX(BillboardRanking.week) as latestweek ,
            SA.artist_id FROM BillboardRanking
            JOIN SongArtist SA
            ON BillboardRanking.song_id = SA.song_id
            GROUP BY BillboardRanking.song_id) df
            JOIN Artist ON df.artist_id=Artist.artist_id) df2
            JOIN Song ON Song.song_id=df2.song_id
            WHERE Song.title LIKE '${name}'
            ORDER BY artist
            LIMIT ${offset}, ${pagesize}`,
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


function get_songs_by_artistid(req, res) {
    // if id was passed in
    if (req.query.id) {
        const artist_id = req.query.id

        connection.query(
            // query
            `SELECT Artist.name AS artist , df.* FROM
            (SELECT SA.artist_id, Song.* FROM SongArtist SA
              JOIN Song on SA.song_id=Song.song_id) df
              JOIN Artist ON df.artist_id
              WHERE Artist.artist_id = "${artist_id}"`,
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
        connection.query(
            // query
            `SELECT Artist.name AS artist , df.* FROM
            (SELECT SA.artist_id, Song.* FROM SongArtist SA
              JOIN Song on SA.song_id=Song.song_id) df
              JOIN Artist ON df.artist_id
              ORDER BY artist`,
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


function get_spotifysongs_by_artistid(req, res) {

    const pagesize = req.query.pagesize ? req.query.pagesize : 10
    const page = req.query.page ? req.query.page : 1
    // get name prameter; default empty string
    const name = req.query.name ? req.query.name : ""


    // if id was passed in
    if (req.query.id) {

        const artist_id = req.query.id

        connection.query(
            // query
            `SELECT df2.artist_id, df2.artist, df2.latestweek, Song.* FROM
              (SELECT df.* , Artist.name AS artist FROM
              (SELECT DISTINCT SpotifyRanking.song_id, MAX(SpotifyRanking.week) as latestweek ,
              SA.artist_id FROM SpotifyRanking
              JOIN SongArtist SA
              ON SpotifyRanking.song_id = SA.song_id
              WHERE SA.artist_id = "${artist_id}"
              GROUP BY SpotifyRanking.song_id) df
              JOIN Artist ON df.artist_id=Artist.artist_id) df2
              JOIN Song ON Song.song_id=df2.song_id
              WHERE Song.title LIKE '${name}'
              ORDER BY latestweek DESC`,
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
        connection.query(
            // query
            `SELECT df2.artist_id, df2.artist, df2.latestweek, Song.* FROM
              (SELECT df.* , Artist.name AS artist FROM
              (SELECT DISTINCT SpotifyRanking.song_id, MAX(SpotifyRanking.week) as latestweek ,
              SA.artist_id FROM SpotifyRanking
              JOIN SongArtist SA
              ON SpotifyRanking.song_id = SA.song_id
              GROUP BY SpotifyRanking.song_id) df
              JOIN Artist ON df.artist_id=Artist.artist_id) df2
              JOIN Song ON Song.song_id=df2.song_id
              WHERE Song.title LIKE '${name}'
              ORDER BY artist
              LIMIT ${offset}, ${pagesize}`,
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

function get_grammysongs_by_artistid(req, res) {

    const pagesize = req.query.pagesize ? req.query.pagesize : 10
    const page = req.query.page ? req.query.page : 1
    // get name prameter; default empty string
    const name = req.query.name ? req.query.name : ""

    // if id was passed in
    if (req.query.id) {

        const artist_id = req.query.id

        connection.query(
            // query
            `SELECT df2.*, Song.* FROM
              (SELECT df.award, df.year, df.artist_id , Artist.name AS artist, df.song_id FROM
              (SELECT GA.*,
              SA.artist_id FROM GrammyAwards GA
              JOIN SongArtist SA
              WHERE SA.artist_id = "${artist_id}"
              ON GA.song_id = SA.song_id) df
              JOIN Artist ON df.artist_id=Artist.artist_id) df2
              JOIN Song ON Song.song_id=df2.song_id
              WHERE Song.title LIKE '${name}'
              ORDER BY year DESC`,
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
        connection.query(
            // query
            `SELECT df2.*, Song.* FROM
              (SELECT df.award, df.year, df.artist_id , Artist.name AS artist, df.song_id FROM
              (SELECT GA.*,
              SA.artist_id FROM GrammyAwards GA
              JOIN SongArtist SA
              ON GA.song_id = SA.song_id) df
              JOIN Artist ON df.artist_id=Artist.artist_id) df2
              JOIN Song ON Song.song_id=df2.song_id
              ORDER BY artist
              LIMIT ${offset}, ${pagesize}`,
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
    get_song_by_id,
    get_song_by_id,
    all_songs,
    search_songs,
    get_songs_by_artistid,
    search_billboard_ranking,
    search_grammy_songs,
    search_spotify_ranking,
    get_billboardsongs_by_artistid,
    get_spotifysongs_by_artistid,
    get_grammysongs_by_artistid
}
