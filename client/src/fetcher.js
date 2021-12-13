import config from './config.json'
const getAllSongs = async (page, pagesize) => {
    var res = await fetch(`http://${config.server_host}:${config.server_port}/songs?page=${page}&pagesize=${pagesize}`, {
        method: 'GET',
    })
    return res.json()
}
const getSong = async (id) => {
    var res = await fetch(`http://${config.server_host}:${config.server_port}/song?id=${id}`, {
        method: 'GET',
    })
    return res.json()
}
const getSongSearch = async (name, danceabilityLow, danceabilityHigh, energyLow, energyHigh, livenessLow, livenessHigh, tempoLow, tempoHigh, valenceLow, valenceHigh, startYear, endYear, page, pagesize) => {
    var res = await fetch(`http://${config.server_host}:${config.server_port}/search/songs?name=${name}&danceLow=${danceabilityLow}&danceHigh=${danceabilityHigh}&energyLow=${energyLow}&energyHigh=${energyHigh}&livenessLow=${livenessLow}&livenessHigh=${livenessHigh}&tempoLow=${tempoLow}&tempoHigh=${tempoHigh}&valenceLow=${valenceLow}&valenceHigh=${valenceHigh}&startYear=${startYear}&endYear=${endYear}&page=${page}&pagesize=${pagesize}`, {
        method: 'GET',
    })
    return res.json()
}
const getAwardedArtists = async (page, pagesize) => {
    var res = await fetch(`http://${config.server_host}:${config.server_port}/ranking?page=${page}&pagesize=${pagesize}`, {
        method: 'GET',
    })
    return res.json()
}
const getAwardStat = async (artist_id) => {
    var res = await fetch(`http://${config.server_host}:${config.server_port}/awards?artist_id=${artist_id}`, {
        method: 'GET',
    })
    return res.json()
}
const getBillboardSongs = async (artist_id) => {
    var res = await fetch(`http://${config.server_host}:${config.server_port}/awards/billboard?artist_id=${artist_id}`, {
        method: 'GET',
    })
    return res.json()
}
const getGrammySongs = async (artist_id) => {
    var res = await fetch(`http://${config.server_host}:${config.server_port}/awards/grammy?artist_id=${artist_id}`, {
        method: 'GET',
    })
    return res.json()
}
const getArtistById = async (artist_id) => {
    var res = await fetch(`http://${config.server_host}:${config.server_port}/find/artist?id=${artist_id}`, {
        method: 'GET',
    })
    return res.json()
}
export{
    getAllSongs,
    getSong,
    getSongSearch,
    getAwardedArtists,
    getAwardStat,
    getBillboardSongs,
    getGrammySongs,
    getArtistById
}
