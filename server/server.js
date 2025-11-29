const express = require('express');
const cors = require('cors');
const config = require('./config');
const routes = require('./routes');

const app = express();
app.use(cors({
  origin: '*',
}));

// API endpoints
app.get('/authors', routes.authors);
app.get('/random_song', routes.random_song);
app.get('/top50/:code', routes.top50);
app.get('/global50', routes.global50);
app.get('/topArtists', routes.topArtists);
app.get('/topGenres', routes.topGenres);
app.get('/artistID/:id', routes.artistID);
app.get('/songDuration', routes.songDuration);
app.get('/genreOverTime', routes.genreOverTime);
app.get('/songPosition/:songID', routes.songPosition);
app.get('/artistPosition', routes.artistPosition);
app.get('/newSongs', routes.newSongs);
app.get('/explicitDistribution', routes.explicitDistribution);
app.get('/filterSongs', routes.filterSongs);
app.get('/songDetails/:songID', routes.songDetails);
app.get('/artistDetails/:artistID', routes.artistDetails);
app.get('/topArtistsByCountry/:code', routes.topArtistsByCountry);

app.listen(config.server_port, () => {
  console.log(`Server running at http://${config.server_host}:${config.server_port}/`)
});

module.exports = app;
