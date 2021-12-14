import config from "./config.json";
const getAllSongs = async (page, pagesize) => {
  var res = await fetch(
    `http://${config.server_host}:${config.server_port}/songs?page=${page}&pagesize=${pagesize}`,
    {
      method: "GET",
    }
  );
  return res.json();
};

const getSong = async (song_id) => {
  var res = await fetch(
    `http://${config.server_host}:${config.server_port}/song/${song_id}`,
    {
      method: "GET",
    }
  );
  return res.json();
};
const searchArtists = async ({ name, startYear, endYear, popularity }) => {
  var res = await fetch(
    `http://${config.server_host}:${config.server_port}/search/artists?name=${
      name ? name : ""
    }&startyear=${startYear ? startYear._d.getFullYear() : ""}&endyear=${
      endYear ? endYear._d.getFullYear() : ""
    }&popularityHigh=${popularity ? popularity[1] : ""}&popularityLow=${
      popularity ? popularity[0] : ""
    }`,
    {
      method: "GET",
    }
  );
  return res.json();
};

const getArtist = async (artist_id) => {
  var res = await fetch(
    `http://${config.server_host}:${config.server_port}/artist/${artist_id}`,
    {
      method: "GET",
    }
  );
  return res.json();
};
const getSongsByArtist = async (artist_id) => {
  var res = await fetch(
    `http://${config.server_host}:${config.server_port}/songs/artist/${artist_id}`,
    {
      method: "GET",
    }
  );
  return res.json();
};
const getSongSearch = async ({
  name,
  danceability,
  energy,
  liveness,
  tempo,
  valence,
  startYear,
  endYear,
  page,
  pagesize,
}) => {
  var res = await fetch(
    `http://${config.server_host}:${config.server_port}/search/songs?name=${
      name ? name : ""
    }&danceLow=${danceability ? danceability[0] : ""}&danceHigh=${
      danceability ? danceability[1] : ""
    }&energyLow=${energy ? energy[0] : ""}&energyHigh=${
      energy ? energy[1] : ""
    }&livenessLow=${liveness ? liveness[0] : ""}&livenessHigh=${
      liveness ? liveness[1] : ""
    }&tempoLow=${tempo ? tempo[0] : ""}&tempoHigh=${
      tempo ? tempo[1] : ""
    }&valenceLow=${valence ? valence[0] : ""}&valenceHigh=${
      valence ? valence[1] : ""
    }&startYear=${startYear ? startYear._d.getFullYear() : ""}&endYear=${
      endYear ? startYear._d.getFullYear() : ""
    }&page=${page ? page : 1}&pagesize=${pagesize ? pagesize : 100}`,
    {
      method: "GET",
    }
  );
  return res.json();
};

const getAwardedArtists = async (page, pagesize) => {
  var res = await fetch(
    `http://${config.server_host}:${config.server_port}/ranking?page=${page}&pagesize=${pagesize}`,
    {
      method: "GET",
    }
  );
  return res.json();
};
const getAwardStat = async (artist_id) => {
  var res = await fetch(
    `http://${config.server_host}:${config.server_port}/awards?artist_id=${artist_id}`,
    {
      method: "GET",
    }
  );
  return res.json();
};
const getBillboardSongs = async (artist_id) => {
  var res = await fetch(
    `http://${config.server_host}:${config.server_port}/awards/billboard?artist_id=${artist_id}`,
    {
      method: "GET",
    }
  );
  return res.json();
};
const getGrammySongs = async (artist_id) => {
  var res = await fetch(
    `http://${config.server_host}:${config.server_port}/awards/grammy?artist_id=${artist_id}`,
    {
      method: "GET",
    }
  );
  return res.json();
};
const getArtistById = async (artist_id) => {
  var res = await fetch(
    `http://${config.server_host}:${config.server_port}/find/artist?id=${artist_id}`,
    {
      method: "GET",
    }
  );
  return res.json();
};

const getArtistStats = async (page, pagesize) => {
  var res = await fetch(
    `http://${config.server_host}:${config.server_port}/awards?page=${
      page ? page : ""
    }&pagesize=${pagesize ? pagesize : ""}`,
    {
      method: "GET",
    }
  );
  return res.json();
};

const getBoringTableOne = async () => {
  var res = await fetch(
    `http://${config.server_host}:${config.server_port}/consecutive/spotify`,
    {
      method: "GET",
    }
  );
  return res.json();
};

const getBoringTableTwo = async () => {
  var res = await fetch(
    `http://${config.server_host}:${config.server_port}/consecutive/billboard`,
    {
      method: "GET",
    }
  );
  return res.json();
};

const getSpotifyRankedSongs = async (artist_id) => {
  var res = await fetch(
    `http://${config.server_host}:${config.server_port}/awards/spotify?id=${artist_id}`,
    {
      method: "GET",
    }
  );
  return res.json();
};

export {
  getAllSongs,
  getSong,
  getSongSearch,
  getAwardedArtists,
  getAwardStat,
  getBillboardSongs,
  getGrammySongs,
  getArtistById,
  getSongsByArtist,
  getArtist,
  searchArtists,
  getArtistStats,
  getBoringTableOne,
  getBoringTableTwo,
  getSpotifyRankedSongs,
};
