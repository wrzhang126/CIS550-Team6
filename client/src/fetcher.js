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
const getSongSearch = async (name, startYear, endYear, page, pagesize) => {
  var res = await fetch(
    `http://${config.server_host}:${config.server_port}/search/songs?name=${name}&startYear=${startYear}&endYear=${endYear}&page=${page}&pagesize=${pagesize}`,
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
const getArtistSongs = async () => {};
export { getAllSongs, getSong, getSongSearch, searchArtists, getArtist };
