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
const getSongSearch = async (name, startYear, endYear, page, pagesize) => {
    var res = await fetch(`http://${config.server_host}:${config.server_port}/search/songs?name=${name}&startYear=${startYear}&endYear=${endYear}&page=${page}&pagesize=${pagesize}`, {
        method: 'GET',
    })
    return res.json()
}
export{
    getAllSongs,
    getSong,
    getSongSearch
}
