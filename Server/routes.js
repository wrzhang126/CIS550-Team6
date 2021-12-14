// ===========================================================================
// IMPORTS
// ===========================================================================
const connection = require("./db");

// ===========================================================================
// ROUTE FUNCTIONS
// ===========================================================================

// ------------------------------- Artist Routes -----------------------------
function all_artists(req, res) {
  // get pagesize from query parameter; if no pagesize was given set value to 10
  const pagesize = req.query.pagesize ? req.query.pagesize : 100;
  // get page number; if no page number was given set value to 1
  const page = req.query.page ? req.query.page : 1;

  connection.query(
    // query
    `SELECT a.artist_id, a.name, a.popularity
        FROM Artist a
        ORDER BY a.name
        LIMIT ${(page - 1) * pagesize}, ${pagesize}`,
    // callback
    function (error, results, fields) {
      if (error) {
        console.log(error);
        res.json({ error: error });
      } else if (results) {
        res.json({ results: results });
      }
    }
  );
}

function search_artists(req, res) {
  // get pagesize from query parameter; defualt 100
  const pagesize = req.query.pagesize ? req.query.pagesize : 100;
  // get page number; defualt 1
  const page = req.query.page ? req.query.page : 1;
  // get name prameter; default empty string
  const name = req.query.name ? req.query.name : "";
  // get popularity prameters; default 0 and 100 respectively
  const popularityHigh = req.query.popularityHigh
    ? req.query.popularityHigh
    : 100;
  const popularityLow = req.query.popularityLow ? req.query.popularityLow : 0;

  connection.query(
    // query
    `SELECT a.artist_id, a.name, a.popularity
        FROM Artist a
        WHERE       a.name LIKE '%${name}%'
                AND a.popularity >= ${popularityLow}
                AND a.popularity <= ${popularityHigh}
        ORDER BY a.popularity DESC, a.name
        LIMIT ${(page - 1) * pagesize}, ${pagesize}`,
    // callback
    function (error, results, fields) {
      if (error) {
        console.log(error);
        res.json({ error: error });
      } else if (results) {
        res.json({ results: results });
      }
    }
  );
}

function get_artist_by_id(req, res) {
  // if id was passed in
  if (req.params["id"]) {
    // get id
    const artist_id = req.params["id"];
    connection.query(
      // query
      `SELECT a.*, GROUP_CONCAT(ag.genre) AS genres
            FROM    Artist a
                    JOIN ArtistGenre ag on a.artist_id = ag.artist_id
            WHERE a.artist_id = "${artist_id}"`,
      // callback
      function (error, results, fields) {
        if (error) {
          console.log(error);
          res.json({ error: error });
        } else if (results) {
          res.json({ results: results });
        }
      }
    );
    // else id was not passed in
  } else {
    // return an empty array
    res.json({ results: [] });
  }
}

// ------------------------------- Song Routes -----------------------------
function all_songs(req, res) {
  // get pagesize from query parameter; if no pagesize was given set value to 10
  const pagesize = req.query.pagesize ? req.query.pagesize : 100;
  // get page number; if no page number was given set value to 1
  const page = req.query.page ? req.query.page : 1;

  connection.query(
    // query
    `SELECT s.song_id, s.title, s.album
        FROM Song s
        ORDER BY s.title
        LIMIT ${(page - 1) * pagesize}, ${pagesize}`,
    // callback
    function (error, results, fields) {
      if (error) {
        console.log(error);
        res.json({ error: error });
      } else if (results) {
        res.json({ results: results });
      }
    }
  );
}

function search_songs(req, res) {
  // get pagesize from query parameter; defualt 100
  const pagesize = req.query.pagesize ? req.query.pagesize : 100;
  // get page number; defualt 1
  const page = req.query.page ? req.query.page : 1;
  // get name prameter; default empty string
  const name = req.query.name ? req.query.name : "";
  // get song prameters; defaults 0 and 1 for low and high respectively
  const danceHigh = req.query.danceHigh ? req.query.danceHigh : 100;
  const danceLow = req.query.danceLow ? req.query.danceLow : 0;
  const energyHigh = req.query.energyHigh ? req.query.energyHigh : 100;
  const energyLow = req.query.energyLow ? req.query.energyLow : 0;
  const livenessHigh = req.query.livenessHigh ? req.query.livenessHigh : 100;
  const livenessLow = req.query.livenessLow ? req.query.livenessLow : 0;
  const tempoHigh = req.query.tempoHigh ? req.query.tempoHigh : 100;
  const tempoLow = req.query.tempoLow ? req.query.tempoLow : 0;
  const valenceHigh = req.query.valenceHigh ? req.query.valenceHigh : 100;
  const valenceLow = req.query.valenceLow ? req.query.valenceLow : 0;

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
        LIMIT ${(page - 1) * pagesize}, ${pagesize}`,
    // callback
    function (error, results, fields) {
      if (error) {
        console.log(error);
        res.json({ error: error });
      } else if (results) {
        res.json({ results: results });
      }
    }
  );
}

function get_song_by_id(req, res) {
  // if id was passed in
  if (req.query.id) {
    // get id
    const song_id = req.query.id;

    connection.query(
      // query
      `SELECT s.*, GROUP_CONCAT(a.name) AS artist_names, GROUP_CONCAT(a.artist_id) AS artist_ids
            FROM    Song s
                    Left JOIN SongArtist sa on s.song_id = sa.song_id
                    Left Join Artist a on sa.artist_id = a.artist_id
            WHERE s.song_id = "${song_id}"`,
      // callback
      function (error, results, fields) {
        if (error) {
          console.log(error);
          res.json({ error: error });
        } else if (results) {
          res.json({ results: results });
        }
      }
    );
    // else id was not passed in
  } else {
    // return an empty array
    res.json({ results: [] });
  }
}

// ------------------------------- Ranking Routes -----------------------------
function awarded_artist(req, res) {
  // get pagesize from query parameter; if no pagesize was given set value to 10
  var pagesize = req.query.pagesize ? req.query.pagesize : 100;
  // get page number; if no page number was given set value to 1
  var page = req.query.page ? req.query.page : 1;
  var start = (page - 1) * pagesize;
  connection.query(
    // query
    `SELECT a.*
            FROM SongArtist sa
            INNER JOIN (
                SELECT s.song_id
                FROM Song s
                        INNER JOIN BillboardRanking b ON s.song_id = b.song_id
                UNION
                SELECT s.song_id
                FROM Song s
                        INNER JOIN GrammyAwards GA on s.song_id = GA.song_id
                UNION
                SELECT s.song_id
                FROM Song s
                        INNER JOIN SpotifyRanking SR on s.song_id = SR.song_id
            ) s ON sa.song_id = s.song_id
            INNER JOIN Artist a ON sa.artist_id = a.artist_id
            LIMIT 200`,
    // callback
    function (error, results, fields) {
      if (error) {
        console.log(error);
        res.json({ error: error });
      } else if (results) {
        res.json({ results: results });
      }
    }
  );
}

// 
function search_grammy_songs(req, res) {
    const pagesize = req.query.pagesize ? req.query.pagesize : 10;
    const page = req.query.page ? req.query.page : 1;
    // get name prameter; default empty string
    const name = req.query.name ? req.query.name : "";
    // get ranking parameters
    const award = req.query.award ? req.query.award : "";
  
    if (req.query.year && !isNaN(req.query.year)) {
      const year = req.query.year;
  
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
            console.log(error);
            res.json({ error: error });
          } else if (results) {
            res.json({ results: results });
          }
        }
      );
    } else {
      const offset = (page - 1) * pagesize;
  
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
            console.log(error);
            res.json({ error: error });
          } else if (results) {
            res.json({ results: results });
          }
        }
      );
    }
  }

function search_billboard_ranking(req, res) {
  const pagesize = req.query.pagesize ? req.query.pagesize : 10;
  const page = req.query.page ? req.query.page : 1;
  // get name prameter; default empty string
  const name = req.query.name ? req.query.name : "";
  // get ranking parameters
  const rankLow = req.query.rankLow ? req.query.rankLow : 0;
  const rankHigh = req.query.rankHigh ? req.query.rankHigh : 100;

  if (req.query.week && !isNaN(req.query.week)) {
    const week = req.query.week;

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
          console.log(error);
          res.json({ error: error });
        } else if (results) {
          res.json({ results: results });
        }
      }
    );
  } else {
    const offset = (page - 1) * pagesize;

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
          console.log(error);
          res.json({ error: error });
        } else if (results) {
          res.json({ results: results });
        }
      }
    );
  }
}

function search_spotify_ranking(req, res) {
  const pagesize = req.query.pagesize ? req.query.pagesize : 10;
  const page = req.query.page ? req.query.page : 1;
  // get name prameter; default empty string
  const name = req.query.name ? req.query.name : "";

  // get ranking parameters
  const rankLow = req.query.rankLow ? req.query.rankLow : 0;
  const rankHigh = req.query.rankHigh ? req.query.rankHigh : 200;

  if (req.query.week && !isNaN(req.query.week)) {
    const week = req.query.week;

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
          console.log(error);
          res.json({ error: error });
        } else if (results) {
          res.json({ results: results });
        }
      }
    );
  } else {
    const offset = (page - 1) * pagesize;

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
          console.log(error);
          res.json({ error: error });
        } else if (results) {
          res.json({ results: results });
        }
      }
    );
  }
}

// ------------------------------- Recommendation Routes -----------------------------

// ------------------ CQ #4 -------------------
// --------------------------------------------
function get_awardstats_by_artist(req, res) {
  const pagesize = req.query.pagesize ? req.query.pagesize : 100;
  const page = req.query.page ? req.query.page : 1;
  const offset = (page - 1) * pagesize;
  
  console.log(`hello: page: ${page}, pagesize: ${pagesize}, offset: ${offset}`)

  if (req.query.artist_id) {

    const artist_id = req.query.artist_id;

    connection.query(
        // query
        `SELECT df3.artist_id, Artist.name AS artist, COUNT(DISTINCT song_id) AS num_songs , SUM(billboardTag) AS num_songs_billboard, SUM(spotifyTag) AS num_songs_spotify , SUM(grammyTag) AS num_songs_grammy
        FROM   (SELECT df2.*, CASE WHEN GA.song_id IS NULL THEN 0 ELSE 1 END AS grammyTag
            FROM   (SELECT df.*, CASE WHEN SP.song_id IS NULL THEN 0 ELSE 1 END AS spotifyTag
                    FROM   (SELECT SA.*, CASE WHEN BR.song_id IS NULL THEN 0 ELSE 1 END AS billboardTag
                            FROM    SongArtist SA
                                    LEFT JOIN ( SELECT DISTINCT song_id
                                                FROM  BillboardRanking)BR
                                    ON SA.song_id = BR.song_id
                            ) df
                            LEFT JOIN ( SELECT DISTINCT song_id
                                        FROM  SpotifyRanking)SP
                            ON SP.song_id = df.song_id
                    ) df2
                    LEFT JOIN ( SELECT DISTINCT song_id
                                FROM GrammyAwards) GA
                    ON GA.song_id = df2.song_id
            ) df3
            JOIN Artist ON Artist.artist_id = df3.artist_id
        WHERE df3.artist_id = '${artist_id}'
        GROUP BY (df3.artist_id)`,
        // callback
        function (error, results, fields) {
        if (error) {
            console.log(error);
            res.json({ error: error });
        } else if (results) {
            res.json({ results: results });
        }
        }
    );

  // else id was not passed in
  } else {

    connection.query(
        // query
        `SELECT df3.artist_id, Artist.name AS artist, COUNT(DISTINCT song_id) AS num_songs , SUM(billboardTag) AS num_songs_billboard, SUM(spotifyTag) AS num_songs_spotify , SUM(grammyTag) AS num_songs_grammy
        FROM   (SELECT df2.*, CASE WHEN GA.song_id IS NULL THEN 0 ELSE 1 END AS grammyTag
            FROM   (SELECT df.*, CASE WHEN SP.song_id IS NULL THEN 0 ELSE 1 END AS spotifyTag
                    FROM   (SELECT SA.*, CASE WHEN BR.song_id IS NULL THEN 0 ELSE 1 END AS billboardTag
                            FROM    SongArtist SA
                                    LEFT JOIN ( SELECT DISTINCT song_id
                                                FROM  BillboardRanking)BR
                                    ON SA.song_id = BR.song_id
                            ) df
                            LEFT JOIN ( SELECT DISTINCT song_id
                                        FROM  SpotifyRanking)SP
                            ON SP.song_id = df.song_id
                    ) df2
                    LEFT JOIN ( SELECT DISTINCT song_id
                                FROM GrammyAwards) GA
                    ON GA.song_id = df2.song_id
            ) df3
            JOIN Artist ON Artist.artist_id = df3.artist_id
        GROUP BY (df3.artist_id)
        ORDER BY num_songs_spotify DESC
        LIMIT ${offset}, ${pagesize}`,
        // callback
        function (error, results, fields) {
        if (error) {
            console.log(error);
            res.json({ error: error });
        } else if (results) {
            res.json({ results: results });
        }
        }
    );
  }
}

// ------------------ CQ #5 -------------------
// --------------------------------------------
function get_billboardsongs_by_artistid(req, res) {
  const pagesize = req.query.pagesize ? req.query.pagesize : 10;
  const page = req.query.page ? req.query.page : 1;
  // get name prameter; default empty string
  const name = req.query.name ? req.query.name : "%%";

  // if id was passed in
  if (req.query.artist_id) {
    const artist_id = req.query.artist_id;

    connection.query(
      // query
      `SELECT df2.artist_id, df2.artist, df2.latestweek, num, Song.*
        FROM   (SELECT df.* , Artist.name AS artist
            FROM   (SELECT DISTINCT BillboardRanking.song_id, MAX(BillboardRanking.week) as latestweek , count(BillboardRanking.week) AS num, SA.artist_id
                    FROM    BillboardRanking
                            JOIN SongArtist SA ON BillboardRanking.song_id = SA.song_id
                        WHERE SA.artist_id = "${artist_id}"
                        GROUP BY BillboardRanking.song_id, SA.artist_id
                    ) df
                    JOIN Artist ON df.artist_id = Artist.artist_id
            ) df2
            JOIN Song ON Song.song_id = df2.song_id
        WHERE Song.title LIKE '%${name}%'
        ORDER BY num DESC`,
      // callback
      function (error, results, fields) {
        if (error) {
          console.log(error);
          res.json({ error: error });
        } else if (results) {
          res.json({ results: results });
        }
      }
    );
    // else id was not passed in
  } else {
    // return songs by all artists
    connection.query(
      // query
      `SELECT df2.artist_id, df2.artist, df2.latestweek, Song.*
        FROM   (SELECT df.* , Artist.name AS artist
            FROM   (SELECT DISTINCT BillboardRanking.song_id, MAX(BillboardRanking.week) as latestweek , SA.artist_id
                    FROM    BillboardRanking
                            JOIN SongArtist SA ON BillboardRanking.song_id = SA.song_id
                    GROUP BY BillboardRanking.song_id, SA.artist_id
                    ) df
                    JOIN Artist ON df.artist_id=Artist.artist_id
            ) df2
            JOIN Song ON Song.song_id=df2.song_id
        WHERE Song.title LIKE '%${name}%'
        ORDER BY artist`,
      // callback
      function (error, results, fields) {
        if (error) {
          console.log(error);
          res.json({ error: error });
        } else if (results) {
          res.json({ results: results });
        }
      }
    );
  }
}

// TODO: MOVE THIS QUERY UP TO SONGS SECTION 
function get_songs_by_artistid(req, res) {
  console.log(req.params["id"]);
  // if id was passed in
  if (req.params["id"]) {
    const artist_id = req.params["id"];
    connection.query(
      // query
      `SELECT Artist.name AS artist , df.*
        FROM   (SELECT SA.artist_id, Song.*
                FROM    SongArtist SA
                        JOIN Song on SA.song_id = Song.song_id
                ) df
                JOIN Artist ON df.artist_id = Artist.artist_id
        WHERE Artist.artist_id = "${artist_id}"`,
      // callback
      function (error, results, fields) {
        if (error) {
          console.log(error);
          console.log("this isis si");
          res.json({ error: error });
        } else if (results) {
          console.log("hehehhehe");
          res.json({ results: results });
        }
      }
    );
    // else id was not passed in
  } else {
    // return an empty array
    res.json({ results: [] });
  }
}

// ------------------ CQ #6 -------------------
// --------------------------------------------
function get_spotifysongs_by_artistid(req, res) {
  const pagesize = req.query.pagesize ? req.query.pagesize : 10;
  const page = req.query.page ? req.query.page : 1;
  const offset = (page - 1) * pagesize;
  // get name prameter; default empty string
  const name = req.query.name ? req.query.name : "";

  // if id was passed in
  if (req.query.id) {
    const artist_id = req.query.id;
    console.log(artist_id)

    connection.query(
      // query
      `SELECT df2.artist_id, df2.artist, df2.latestweek, num, Song.* 
        FROM    (SELECT df.* , Artist.name AS artist 
                FROM    (SELECT DISTINCT SpotifyRanking.song_id, MAX(SpotifyRanking.week) as latestweek , count(SpotifyRanking.week) AS num, SA.artist_id 
                        FROM    SpotifyRanking
                                JOIN SongArtist SA  ON SpotifyRanking.song_id = SA.song_id
                        WHERE SA.artist_id = '${artist_id}'
                        GROUP BY SpotifyRanking.song_id
                        ) df
                        JOIN Artist ON df.artist_id=Artist.artist_id
                ) df2
                JOIN Song ON Song.song_id=df2.song_id
        WHERE Song.title LIKE '%${name}%'
        ORDER BY latestweek DESC`,
      // callback
      function (error, results, fields) {
        if (error) {
          console.log(error);
          res.json({ error: error });
        } else if (results) {
          res.json({ results: results });
        }
      }
    );
    // else id was not passed in
  } else {
    // return songs for all artists
    connection.query(
      // query
      `SELECT df2.artist_id, df2.artist, df2.latestweek, Song.* 
        FROM    (SELECT df.* , Artist.name AS artist 
                FROM    (SELECT DISTINCT SpotifyRanking.song_id, MAX(SpotifyRanking.week) as latestweek , SA.artist_id 
                        FROM    SpotifyRanking
                                JOIN SongArtist SA  ON SpotifyRanking.song_id = SA.song_id
                        GROUP BY SpotifyRanking.song_id
                        ) df
                        JOIN Artist ON df.artist_id=Artist.artist_id
                ) df2
                JOIN Song ON Song.song_id=df2.song_id
        WHERE Song.title LIKE '%${name}%'
        ORDER BY artist
        LIMIT ${offset}, ${pagesize}`,
      // callback
      function (error, results, fields) {
        if (error) {
          console.log(error);
          res.json({ error: error });
        } else if (results) {
          res.json({ results: results });
        }
      }
    );
  }
}

// ------------------ CQ #7 -------------------
// --------------------------------------------
function get_grammysongs_by_artistid(req, res) {
  const pagesize = req.query.pagesize ? req.query.pagesize : 10;
  const page = req.query.page ? req.query.page : 1;
  // get name prameter; default empty string
  const name = req.query.name ? req.query.name : "%%";

  // if id was passed in
  if (req.query.artist_id) {
    const artist_id = req.query.artist_id;

    connection.query(
      // query
      `SELECT df2.*, Song.* 
        FROM    (SELECT df.award, df.year, df.artist_id , Artist.name AS artist, df.song_id 
                FROM    (SELECT GA.*, SA.artist_id 
                        FROM    GrammyAwards GA
                                JOIN SongArtist SA ON GA.song_id = SA.song_id 
                        WHERE SA.artist_id = "${artist_id}"
                        ) df
                        JOIN Artist ON df.artist_id=Artist.artist_id
                ) df2
                JOIN Song ON Song.song_id=df2.song_id
        ORDER BY year DESC`,
      // callback
      function (error, results, fields) {
        if (error) {
          console.log(error);
          res.json({ error: error });
        } else if (results) {
          res.json({ results: results });
        }
      }
    );
    // else id was not passed in
  } else {
    // return an empty array
    connection.query(
      // query
      `SELECT df2.*, Song.* 
        FROM    (SELECT df.award, df.year, df.artist_id , Artist.name AS artist, df.song_id 
                FROM    (SELECT GA.*, SA.artist_id 
                        FROM    GrammyAwards GA
                                JOIN SongArtist SA ON GA.song_id = SA.song_id 
                        ) df
                        JOIN Artist ON df.artist_id=Artist.artist_id
                ) df2
                JOIN Song ON Song.song_id=df2.song_id
        ORDER BY artist`,
      // callback
      function (error, results, fields) {
        if (error) {
          console.log(error);
          res.json({ error: error });
        } else if (results) {
          res.json({ results: results });
        }
      }
    );
  }
}

// ------------------ CQ #1 -------------------
// --------------------------------------------
function get_top_spotify_and_billboard_artists(req, res) { 

    connection.query(
    // query
    `SELECT df.artist_id, Artist.name AS artist, SUM(SpotifyTag) AS total_spotify_consec, SUM(billboardTag)  AS total_billboard_consec
    FROM (  SELECT  SA.artist_id ,
                    IF(SP.song_id IS NULL, 0, 1) AS SpotifyTag ,
                    IF(BR.song_id IS NULL, 0, 1) AS billboardTag
            FROM    SongArtist SA
                    LEFT JOIN ( SELECT DISTINCT r1.song_id
                                FROM BillboardRanking r1
                                INNER JOIN BillboardRanking r2 ON r1.song_id = r2.song_id
                                WHERE DATEDIFF(r1.week, r2.week) = 7) BR
                    ON SA.song_id = BR.song_id
                    LEFT JOIN ( SELECT DISTINCT r1.song_id
                                FROM SpotifyRanking r1
                                INNER JOIN SpotifyRanking r2 ON r1.song_id = r2.song_id
                                WHERE DATEDIFF(r1.week, r2.week) = 7) SP
                    ON SA.song_id = SP.song_id) df
    
            JOIN Artist on df.artist_id = Artist.artist_id
    GROUP BY df.artist_id
    HAVING SUM(SpotifyTag) > 0 OR SUM(billboardTag) > 0
    ORDER BY total_spotify_consec DESC, total_billboard_consec DESC;`,
    // callback
    function (error, results, fields) {
        if (error) {
        console.log(error);
        res.json({ error: error });
        } else if (results) {
        res.json({ results: results });
        }
    }
    );

  }

// ------------------ CQ #2 -------------------
// --------------------------------------------
function get_consecutive_spotify_songs(req, res) { 

    connection.query(
    // query
    `SELECT SA.artist_id, Artist.name AS artist, df.*
    FROM    (   SELECT s.song_id, s.title, MAX(r1.week) as last_week , MIN(r2.week) AS first_week, COUNT(*) AS num_consec_weeks
                FROM    SpotifyRanking r1
                        INNER JOIN SpotifyRanking r2 ON r1.song_id = r2.song_id AND DATEDIFF(r1.week, r2.week) = 7
                        INNER JOIN Song s ON r1.song_id = s.song_id
                GROUP BY s.song_id) df
            JOIN SongArtist SA ON df.song_id=SA.song_id
            JOIN Artist ON SA.artist_id=Artist.artist_id
    ORDER BY artist;`,
    // callback
    function (error, results, fields) {
        if (error) {
        console.log(error);
        res.json({ error: error });
        } else if (results) {
        res.json({ results: results });
        }
    }
    );

  }

// ------------------ CQ #3 -------------------
// --------------------------------------------
function get_consecutive_billboard_songs(req, res) { 

    connection.query(
    // query
    `SELECT SA.artist_id, Artist.name AS artist, df.*
    FROM    (   SELECT s.song_id, s.title, MAX(r1.week) as last_week , MIN(r2.week) AS first_week, COUNT(*) AS num_consec_weeks
                FROM    BillboardRanking r1
                        INNER JOIN BillboardRanking r2 ON r1.song_id = r2.song_id AND DATEDIFF(r1.week, r2.week) = 7
                        INNER JOIN Song s ON r1.song_id = s.song_id
                GROUP BY s.song_id) df
            JOIN SongArtist SA ON df.song_id=SA.song_id
            JOIN Artist ON SA.artist_id=Artist.artist_id
    ORDER BY artist;`,
    // callback
    function (error, results, fields) {
        if (error) {
        console.log(error);
        res.json({ error: error });
        } else if (results) {
        res.json({ results: results });
        }
    }
    );

  }

// ===========================================================================
// EXPORTS
// ===========================================================================
module.exports = {
  all_artists,
  search_artists,
  get_artist_by_id,
  all_songs,
  search_songs,
  get_song_by_id,
  get_song_by_id,
  all_songs,
  search_songs,
  awarded_artist,
  get_songs_by_artistid,
  search_billboard_ranking,
  search_grammy_songs,
  search_spotify_ranking,
  get_billboardsongs_by_artistid,
  get_spotifysongs_by_artistid,
  get_grammysongs_by_artistid,
  get_awardstats_by_artist,
  get_top_spotify_and_billboard_artists,
  get_consecutive_spotify_songs,
  get_consecutive_billboard_songs,
};
