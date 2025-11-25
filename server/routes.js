const { Pool, types } = require('pg');
const config = require('./config.json')

// Override the default parsing for BIGINT (PostgreSQL type ID 20)
types.setTypeParser(20, val => parseInt(val, 10)); //DO NOT DELETE THIS

// Create PostgreSQL connection using database credentials provided in config.json
const connection = new Pool({
  host: config.rds_host,
  user: config.rds_user,
  password: config.rds_password,
  port: config.rds_port,
  database: config.rds_db,
  ssl: {
    rejectUnauthorized: false,
  },
});
connection.connect((err) => err && console.log(err));

// Route 1: GET /authors
const authors = async function(req, res) {
  const names = ['Kevin Zheng', 'Amy Westerhoff', 'Jenny Yin', 'Namitra Kalicharran'];
  res.json({authors:names});
}

// Route 2: GET /random_song
const random_song = async function(req, res) {
        connection.query(`
        SELECT *
            FROM song
            ORDER BY RANDOM()
            LIMIT 1
        `, (err, data) => {
        if (err) {
            console.error('Database error:', err);
            res.json({});
        }
        else if (!data || data.rows.length === 0) {  //Check if any rows exist
            console.log('No data found.');
            res.json({ message: 'No tables found.' }); 
        }
        else { //Data exists — return it
        //console.log('Data found:', data.rows);
        res.json(data.rows);
        }
        });
}


// Route 3: GET /top50/:code
const top50 = async function (req, res) {

    const countryCode = req.params.code.toUpperCase();

    connection.query( 
        `SELECT
            MIN(s.song_name) AS song_name,
            STRING_AGG(DISTINCT a.artist_name, ', ') AS artists,
            MIN(ce.chart_position) AS best_position,
            MAX(ce.chart_date) AS most_recent_date
        FROM chart_entry ce
                JOIN song s ON ce.song_id = s.song_id
                JOIN song_artist sa ON s.song_id = sa.song_id
                JOIN artist a ON sa.artist_id = a.artist_id
        WHERE ce.country_code = '${countryCode}'
        AND ce.chart_date >= (
            SELECT DATE_TRUNC('month', MAX(chart_date))
            FROM chart_entry
            WHERE country_code = '${countryCode}'
        )
        GROUP BY s.song_id
        ORDER BY best_position ASC, most_recent_date DESC
        LIMIT 50;
        `, (err, data) => {
        if (err) {
            console.error('Database error:', err);
            res.json({});
        }
        else if (!data || data.rows.length === 0) {  //Check if any rows exist
            console.log('No data found.');
            res.json({ message: 'No tables found.' }); 
        }
        else { //Data exists — return it
        //console.log('Data found:', data.rows);
        res.json(data.rows);
        }
    });
}


// Route 4: GET /global50
const global50 = async function (req, res) {

    connection.query(`
        SELECT
            MIN(s.song_name) AS song_name,
            STRING_AGG(DISTINCT a.artist_name, ', ') AS artists,
            COUNT(DISTINCT ce.country_code) AS countries_charted,
            MIN(ce.chart_position) AS best_position,
            MAX(ce.chart_date) AS latest_date
        FROM chart_entry ce
        JOIN song s ON ce.song_id = s.song_id
        JOIN song_artist sa ON s.song_id = sa.song_id
        JOIN artist a ON sa.artist_id = a.artist_id
        WHERE ce.chart_date >= (
            SELECT DATE_TRUNC('month', MAX(chart_date))
            FROM chart_entry
        )
        GROUP BY s.song_id
        ORDER BY countries_charted DESC, best_position ASC
        LIMIT 50;

        `, (err, data) => {
        if (err) {
            console.error('Database error:', err);
            res.json({});
        }
        else if (!data || data.rows.length === 0) {  //Check if any rows exist
            console.log('No data found.');
            res.json({ message: 'No tables found.' }); 
        }
        else { //Data exists — return it
        //console.log('Data found:', data.rows);
        res.json(data.rows);
        }
    });
}


// Route 5 : GET /topArtists
const topArtists = async function (req, res) {

    connection.query(`
            SELECT
                a.artist_id,
                a.artist_name,
                STRING_AGG(DISTINCT a.artist_genre, ', ') AS artist_genres,
                COUNT(DISTINCT s.song_id) AS total_charting_songs,
                ROUND(AVG(ce.chart_position), 2) AS avg_chart_position,
                COUNT(DISTINCT ce.country_code) AS countries_charted,
                MIN(ce.chart_position) AS best_position
            FROM artist a
            JOIN song_artist sa ON a.artist_id = sa.artist_id
            JOIN song s ON sa.song_id = s.song_id
            JOIN chart_entry ce ON s.song_id = ce.song_id
            WHERE ce.chart_date = (SELECT MAX(chart_date) FROM chart_entry)
            GROUP BY a.artist_id, a.artist_name
            ORDER BY avg_chart_position ASC, total_charting_songs DESC
            LIMIT 50;
        `, (err, data) => {
        if (err) {
            console.error('Database error:', err);
            res.json({});
        }
        else if (!data || data.rows.length === 0) {  //Check if any rows exist
            console.log('No data found.');
            res.json({ message: 'No tables found.' }); 
        }
        else { //Data exists — return it
        //console.log('Data found:', data.rows);
        res.json(data.rows);
        }
    });
}

// Route 6 : GET /topGenres
const topGenres = async function (req, res) {

    connection.query(`
        SELECT
            a.artist_genre,
            COUNT(DISTINCT s.song_id) AS songs_in_chart,
            ROUND(AVG(ce.chart_position), 2) AS avg_position
        FROM chart_entry ce
        JOIN song s ON ce.song_id = s.song_id
        JOIN song_artist sa ON s.song_id = sa.song_id
        JOIN artist a ON sa.artist_id = a.artist_id
        WHERE ce.chart_date = (SELECT MAX(chart_date) FROM chart_entry)
            AND a.artist_genre IS NOT NULL
        GROUP BY a.artist_genre
        ORDER BY songs_in_chart DESC
        LIMIT 50;
        `, (err, data) => {
        if (err) {
            console.error('Database error:', err);
            res.json({});
        }
        else if (!data || data.rows.length === 0) {  //Check if any rows exist
            console.log('No data found.');
            res.json({ message: 'No tables found.' }); 
        }
        else { //Data exists — return it
        //console.log('Data found:', data.rows);
        res.json(data.rows);
        }
    });
}



// Route 7 : GET /artistID/:id
const artistID = async function (req, res) {

    connection.query(`
        SELECT
            MIN(s.song_name) AS song_name,
            MIN(ce.chart_position) AS best_position,
            COUNT(DISTINCT ce.country_code) AS countries_charted,
            MAX(ce.chart_date) AS most_recent_date
        FROM artist a
                JOIN song_artist sa ON a.artist_id = sa.artist_id
                JOIN song s ON sa.song_id = s.song_id
                JOIN chart_entry ce ON s.song_id = ce.song_id
        WHERE a.artist_id = '${req.params.id}'
        GROUP BY s.song_id
        ORDER BY best_position ASC, most_recent_date DESC
        LIMIT 50;
        `, (err, data) => {
        if (err) {
            console.error('Database error:', err);
            res.json({});
        }
        else if (!data || data.rows.length === 0) {  //Check if any rows exist
            console.log('No data found.');
            res.json({ message: 'No tables found.' }); 
        }
        else { //Data exists — return it
        //console.log('Data found:', data.rows);
        res.json(data.rows);
        }
    });
}



// Route 8 : GET /songDuration
const songDuration = async function (req, res) {

    connection.query(`
        SELECT 
            c.country_name,
            a.artist_genre,
            ROUND(AVG(s.duration) / 60000.0, 2) AS avg_duration_minutes,
            COUNT(DISTINCT s.song_id) AS song_count
        FROM chart_entry ce
        JOIN song s ON ce.song_id = s.song_id
        JOIN song_artist sa ON s.song_id = sa.song_id
        JOIN artist a ON sa.artist_id = a.artist_id
        JOIN country c ON ce.country_code = c.country_code
        WHERE ce.chart_position <= 50
            AND ce.chart_date = (SELECT MAX(chart_date) FROM chart_entry)
            AND a.artist_genre IS NOT NULL
            AND s.duration IS NOT NULL
        GROUP BY c.country_name, a.artist_genre
        HAVING COUNT(DISTINCT s.song_id) >= 3
        ORDER BY avg_duration_minutes DESC, c.country_name;
        `, (err, data) => {
        if (err) {
            console.error('Database error:', err);
            res.json({});
        }
        else if (!data || data.rows.length === 0) {  //Check if any rows exist
            console.log('No data found.');
            res.json({ message: 'No tables found.' }); 
        }
        else { //Data exists — return it
        //console.log('Data found:', data.rows);
        res.json(data.rows);
        }
    });
}


// Route 9 : GET /genreOverTime
const genreOverTime = async function (req, res) {

    connection.query(`
        WITH monthly_stats AS (
            SELECT 
                DATE_TRUNC('month', ce.chart_date) AS month,
                a.artist_genre,
                ROUND(AVG(ce.chart_position), 2) AS avg_position,
                COUNT(DISTINCT s.song_id) AS songs_charted
            FROM chart_entry ce
            JOIN song s ON ce.song_id = s.song_id
            JOIN song_artist sa ON s.song_id = sa.song_id
            JOIN artist a ON sa.artist_id = a.artist_id
            WHERE ce.chart_date >= '2023-11-01'
            GROUP BY DATE_TRUNC('month', ce.chart_date), a.artist_genre
            HAVING COUNT(DISTINCT s.song_id) >= 5
        ),
        latest_vs_oldest AS (
            SELECT 
                artist_genre,
                MAX(CASE WHEN month = '2024-11-01' THEN avg_position END) AS nov_2024_position,
                MAX(CASE WHEN month = '2023-11-01' THEN avg_position END) AS nov_2023_position,
                MAX(CASE WHEN month = '2024-11-01' THEN songs_charted END) AS nov_2024_songs,
                MAX(CASE WHEN month = '2023-11-01' THEN songs_charted END) AS nov_2023_songs
            FROM monthly_stats
            GROUP BY artist_genre
        )
        SELECT 
            artist_genre,
            nov_2023_position,
            nov_2024_position,
            ROUND(nov_2023_position - nov_2024_position, 2) AS position_improvement,
            nov_2023_songs,
            nov_2024_songs,
            nov_2024_songs - nov_2023_songs AS song_growth
        FROM latest_vs_oldest
        WHERE nov_2023_position IS NOT NULL AND nov_2024_position IS NOT NULL
        ORDER BY position_improvement DESC;
        `, (err, data) => {
        if (err) {
            console.error('Database error:', err);
            res.json({});
        }
        else if (!data || data.rows.length === 0) {  //Check if any rows exist
            console.log('No data found.');
            res.json({ message: 'No tables found.' }); 
        }
        else { //Data exists — return it
        //console.log('Data found:', data.rows);
        res.json(data.rows);
        }
    });
}


// Route 10 : GET /songPosition/:songID
const songPosition = async function (req, res) {

    connection.query(`
        SELECT
            c.country_name,
            ce.chart_position,
            ce.chart_date
        FROM chart_entry ce
                JOIN country c ON ce.country_code = c.country_code
        WHERE ce.song_id = '${req.params.songID}'
        ORDER BY ce.chart_position ASC, ce.chart_date DESC;
        `, (err, data) => {
        if (err) {
            console.error('Database error:', err);
            res.json({});
        }
        else if (!data || data.rows.length === 0) {  //Check if any rows exist
            console.log('No data found.');
            res.json({ message: 'No tables found.' }); 
        }
        else { //Data exists — return it
        //console.log('Data found:', data.rows);
        res.json(data.rows);
        }
    });
}


// Route 11 : GET /artistPosition
const artistPosition = async function (req, res) {

    connection.query(`
        WITH ranked AS (
            SELECT 
                c.country_name,
                MIN(a.artist_name) AS artist_name,
                COUNT(DISTINCT s.song_id) AS songs_in_top_50,
                ROUND(AVG(ce.chart_position), 2) AS avg_position,
                MIN(ce.chart_position) AS best_position,
                ROW_NUMBER() OVER (PARTITION BY c.country_name ORDER BY COUNT(DISTINCT s.song_id) DESC, AVG(ce.chart_position) ASC) as rank
            FROM chart_entry ce
            JOIN song s ON ce.song_id = s.song_id
            JOIN song_artist sa ON s.song_id = sa.song_id
            JOIN artist a ON sa.artist_id = a.artist_id
            JOIN country c ON ce.country_code = c.country_code
            WHERE ce.chart_date = (SELECT MAX(chart_date) FROM chart_entry)
                AND ce.chart_position <= 50
            GROUP BY c.country_name, a.artist_id
            HAVING COUNT(DISTINCT s.song_id) >= 2
        )
        SELECT country_name, artist_name, songs_in_top_50, avg_position, best_position
        FROM ranked
        WHERE rank = 1
        ORDER BY songs_in_top_50 DESC, avg_position ASC;
        `, (err, data) => {
        if (err) {
            console.error('Database error:', err);
            res.json({});
        }
        else if (!data || data.rows.length === 0) {  //Check if any rows exist
            console.log('No data found.');
            res.json({ message: 'No tables found.' }); 
        }
        else { //Data exists — return it
        //console.log('Data found:', data.rows);
        res.json(data.rows);
        }
    });
}

// Route 12 : GET /newSongs
const newSongs = async function (req, res) {

    connection.query(`
        SELECT
            c.country_name,
            MIN(s.song_name) AS song_name,
            STRING_AGG(DISTINCT a.artist_name, ', ') AS artists,
            ce.chart_position,
            ce.chart_date AS entry_date
        FROM chart_entry ce
                JOIN song s ON ce.song_id = s.song_id
                JOIN song_artist sa ON s.song_id = sa.song_id
                JOIN artist a ON sa.artist_id = a.artist_id
                JOIN country c ON ce.country_code = c.country_code
        WHERE ce.chart_date = (SELECT MAX(chart_date) FROM chart_entry)
        AND ce.chart_position <= 50
        AND NOT EXISTS (
            SELECT 1
            FROM chart_entry ce2
            WHERE ce2.song_id = ce.song_id
            AND ce2.country_code = ce.country_code
            AND ce2.chart_date < ce.chart_date
        )
        GROUP BY c.country_name, s.song_id, ce.chart_position, ce.chart_date
        ORDER BY ce.chart_position ASC, c.country_name
        LIMIT 50;
        `, (err, data) => {
        if (err) {
            console.error('Database error:', err);
            res.json({});
        }
        else if (!data || data.rows.length === 0) {  //Check if any rows exist
            console.log('No data found.');
            res.json({ message: 'No tables found.' }); 
        }
        else { //Data exists — return it
        //console.log('Data found:', data.rows);
        res.json(data.rows);
        }
    });
}

// Route 13: GET /explicitDistribution
const explicitDistribution = async function (req, res) {

    connection.query(`
        WITH latest_month AS (
            SELECT DATE_TRUNC('month', MAX(chart_date)) AS start_month
            FROM chart_entry
        )
        SELECT
            c.country_name,
            COUNT(*) FILTER (WHERE s.is_explicit = true) AS explicit_count,
            COUNT(*) FILTER (WHERE s.is_explicit = false) AS clean_count,
            ROUND(
                COUNT(*) FILTER (WHERE s.is_explicit = true)::numeric 
                / COUNT(*) * 100, 2
            ) AS explicit_percentage
        FROM chart_entry ce
        JOIN latest_month lm ON ce.chart_date >= lm.start_month
        JOIN song s ON ce.song_id = s.song_id
        JOIN country c ON ce.country_code = c.country_code
        GROUP BY c.country_name
        ORDER BY explicit_percentage DESC;
    `, (err, data) => {
        if (err) {
            console.error('Database error:', err);
            return res.json({});
        }
        if (!data || data.rows.length === 0) {
            return res.json({ message: 'No tables found.' });
        }
        res.json(data.rows);
    });
};

// Route 14 : GET /filterSongs
const filterSongs = async function (req, res) {

    // sanitize empty strings → null
    function cleanParam(v) {
        return v === "" || v === undefined ? null : v;
    }

    const {
        title,
        artist,
        duration_low,
        duration_high,
        explicit,
        album_type,
        min_tracks,
        release_after,
        release_before
    } = req.query;

    const params = [
        cleanParam(title),
        cleanParam(artist),
        cleanParam(duration_low),
        cleanParam(duration_high),
        explicit === undefined ? null : explicit === "true",
        cleanParam(album_type),
        cleanParam(min_tracks),
        cleanParam(release_after),
        cleanParam(release_before)
    ];


    connection.query(`
        SELECT 
            s.song_id, 
            s.song_name, 
            STRING_AGG(DISTINCT a.artist_name, ', ') AS artists,
            s.duration, 
            s.is_explicit, 
            s.album_type,
            s.total_tracks,
            s.release_date,
            s.album_cover_url
        FROM song s
        JOIN song_artist sa ON s.song_id = sa.song_id
        JOIN artist a ON sa.artist_id = a.artist_id
        JOIN chart_entry ce ON s.song_id = ce.song_id
        WHERE 1=1


          AND ($1::text IS NULL OR s.song_name ILIKE '%' || $1 || '%')
          AND ($2::text IS NULL OR a.artist_name ILIKE '%' || $2 || '%')
          AND ($3::int IS NULL OR s.duration >= $3)
          AND ($4::int IS NULL OR s.duration <= $4)
          AND ($5::boolean IS NULL OR s.is_explicit = $5)
          AND ($6::text IS NULL OR s.album_type = $6)
          AND ($7::int IS NULL OR s.total_tracks >= $7)
          AND ($8::date IS NULL OR s.release_date::date >= $8)
          AND ($9::date IS NULL OR s.release_date::date <= $9)

        GROUP BY 
            s.song_id,
            s.song_name,
            s.duration,
            s.is_explicit,
            s.album_type,
            s.total_tracks,
            s.release_date,
            s.album_cover_url

        ORDER BY s.song_name ASC
        LIMIT 200;
    `, params, (err, data) => {

        if (err) {
            console.error('Database error:', err);
            res.json({});
        }
        else if (!data || data.rows.length === 0) {
            res.json({ message: 'No results found.' });
        }
        else {
            res.json(data.rows);
        }
    });
};

// Route 15: GET /songDetails/:songID
const songDetails = async function (req, res) {
    const songID = req.params.songID;

    connection.query(`
        SELECT 
            s.song_id,
            s.song_name,
            s.duration,
            s.release_date,
            s.album_type,
            s.total_tracks,
            s.is_explicit,
            s.album_cover_url,
            STRING_AGG(DISTINCT a.artist_name, ', ') AS artists
        FROM song s
        JOIN song_artist sa ON s.song_id = sa.song_id
        JOIN artist a ON sa.artist_id = a.artist_id
        WHERE s.song_id = $1
        GROUP BY 
            s.song_id, 
            s.song_name, 
            s.duration, 
            s.release_date, 
            s.album_type, 
            s.total_tracks, 
            s.is_explicit, 
            s.album_cover_url;
    `, [songID], (err, data) => {

        if (err) {
            console.error("Database error:", err);
            return res.json({});
        }

        if (!data || data.rows.length === 0) {
            return res.json({ message: "Song not found." });
        }

        res.json(data.rows[0]);
    });
};

// Route 16: GET /artistDetails/:artistID
const artistDetails = async function (req, res) {
    const artistID = req.params.artistID;

    connection.query(`
        SELECT 
            a.artist_id,
            a.artist_name,
            a.artist_genre,
            c.country_name AS artist_country,
            a.artist_img
        FROM artist a
        LEFT JOIN country c ON a.country_code = c.country_code
        WHERE a.artist_id = $1;
    `, [artistID], (err, data) => {

        if (err) {
            console.error("Database error:", err);
            return res.json({});
        }

        if (!data || data.rows.length === 0) {
            return res.json({ message: "Artist not found." });
        }

        res.json(data.rows[0]);
    });
};


module.exports = {
  authors,
  random_song,
  top50,
  global50,
  topArtists,
  topGenres,
  artistID,
  songDuration,
  genreOverTime,
  songPosition,
  artistPosition,
  newSongs,
  explicitDistribution,
  filterSongs,
  songDetails,
  artistDetails
}
