import React, { useEffect, useState } from "react";
import { getArtist, getSongsByArtist } from "../fetcher";
import { Image } from "react-bootstrap";
import { Highlighter } from "react-highlight-words";
import { Table, Button, Input, Space } from "antd";
import Navigationbar from "./Navbar";
import { SearchOutlined } from "@ant-design/icons";
import "./Body.css";

export default function ArtistProfile() {
  const [url, setUrl] = useState("");
  const [name, setName] = useState("");
  const [followers, setFollowers] = useState(0);
  const [popularity, setPopularity] = useState(0);
  const [songs, setSongs] = useState([]);
  const artistId = window.location.pathname.split("/")[2];
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");

  useEffect(() => {
    getArtist(artistId).then((res) => {
      setUrl(res.results[0].image_url);
      setName(res.results[0].name);
      setFollowers(res.results[0].followers);
      setPopularity(res.results[0].popularity);
    });
    getSongsByArtist(artistId).then((res) => {
      setSongs(res.results);
    });
  }, []);

  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    console.log(selectedKeys[0]);
    console.log(dataIndex);
    setSearchText(selectedKeys[0]);
    // setSearchedColumn(dataIndex);
  };

  const handleReset = (clearFilters) => {
    clearFilters();
    setSearchText("");
  };
  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
    }) => (
      <div style={{ padding: 8 }}>
        <Input
          ref={(node) => {
            console.log(node);
          }}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{ marginBottom: 8, display: "block" }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{ width: 90 }}
          >
            Search
          </Button>
          <Button
            onClick={() => handleReset(clearFilters)}
            size="small"
            style={{ width: 90 }}
          >
            Reset
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              confirm({ closeDropdown: false });
              setSearchText(selectedKeys[0]);
              setSearchedColumn(dataIndex);
            }}
          >
            Filter
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined style={{ color: filtered ? "#1890ff" : undefined }} />
    ),
    onFilter: (value, record) =>
      record[dataIndex]
        ? record[dataIndex]
            .toString()
            .toLowerCase()
            .includes(value.toLowerCase())
        : "",
    onFilterDropdownVisibleChange: (visible) => {
      if (visible) {
        console.log("triall");
        // setTimeout(() => this.searchInput.select(), 100);
      }
    },
    render: (text) =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{ backgroundColor: "#ffc069", padding: 0 }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ""}
        />
      ) : (
        text
      ),
  });

  const columns = [
    {
      title: "Song name",
      dataIndex: "title",
      width: "30%",
      ...getColumnSearchProps("title"),
    },
    {
      title: "Album",
      dataIndex: "album",
      width: "30%",
      ...getColumnSearchProps("album"),
    },

    {
      title: "Danceability",
      dataIndex: "danceability",
      sorter: (a, b) => a.danceability - b.danceability,
    },
    {
      title: "Energy",
      dataIndex: "energy",
      sorter: (a, b) => a.energy - b.energy,
    },

    {
      title: "Liveness",
      dataIndex: "liveness",
      sorter: (a, b) => a.liveness - b.liveness,
    },
    {
      title: "Release date",
      dataIndex: "release_date",
    },
  ];

  return (
    <div>
      <Navigationbar />
      <div style={{ marginTop: "10px", width: "100%", textAlign: "center" }}>
        <Image
          id="test"
          style={{
            width: "90%",
            height: "400px",
            objectFit: "cover",
          }}
          src={url}
        />
        <Image
          style={{
            width: "200px",
            height: "200px",
            objectFit: "cover",
          }}
          roundedCircle
          src={url}
        />
        <div style={{ height: "50%" }}>
          <div style={{ width: "fit-content", margin: "auto" }}>
            <h1 style={{ color: "#0D6EFD" }}>{name}</h1>
            <div
              style={{
                width: "fit-content",
                margin: "auto",
              }}
            >
              <label style={{ float: "left" }} for="followers">
                Followers:{" "}
              </label>
              <div id="followers">{followers} </div>
            </div>

            <div
              style={{
                width: "fit-content",
                margin: "auto",
              }}
            >
              <label for="popularity">Popularity: </label>
              <span id="followers">{popularity} </span>
            </div>
          </div>
        </div>
        <Table columns={columns} dataSource={songs} />
      </div>
    </div>
  );
}
