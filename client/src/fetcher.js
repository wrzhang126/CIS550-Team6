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
const getSong = async (id) => {
  var res = await fetch(
    `http://${config.server_host}:${config.server_port}/song?id=${id}`,
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
const getSongsByArtist = async () => {};
const getSongSearch = async (
  name,
  danceabilityLow,
  danceabilityHigh,
  energyLow,
  energyHigh,
  livenessLow,
  livenessHigh,
  tempoLow,
  tempoHigh,
  valenceLow,
  valenceHigh,
  startYear,
  endYear,
  page,
  pagesize
) => {
  var res = await fetch(
    `http://${config.server_host}:${config.server_port}/search/songs?name=${
      name ? name : ""
    }&danceLow=${danceabilityLow ? danceabilityLow : ""}&danceHigh=${
      danceabilityHigh ? danceabilityHigh : ""
    }&energyLow=${energyLow ? energyLow : ""}&energyHigh=${
      energyHigh ? energyHigh : ""
    }&livenessLow=${livenessLow ? livenessLow : ""}&livenessHigh=${
      livenessHigh ? livenessHigh : ""
    }&tempoLow=${tempoLow ? tempoLow : ""}&tempoHigh=${
      tempoHigh ? tempoHigh : ""
    }&valenceLow=${valenceLow ? valenceLow : ""}&valenceHigh=${
      valenceHigh ? valenceHigh : ""
    }&startYear=${startYear ? startYear : ""}&endYear=${
      endYear ? endYear : ""
    }&page=${page ? page : ""}&pagesize=${pagesize ? pagesize : ""}`,
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
};
