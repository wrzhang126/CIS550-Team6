import Navigationbar from "./Navbar";
import Filter from "./Filter";
import {
  getAwardedArtists,
  getAwardStat,
  getBillboardSongs,
  getGrammySongs,
  getArtistById,
  getArtistStats,
  getArtist,
  getSpotifyRankedSongs,
} from "../fetcher";
import React, { useState } from "react";
import "./Filter.css";
import { Table, Carousel, Tabs, Card, List, Row, Col } from "antd";
import { format } from "d3-format";
import { useEffect } from "react";

const { TabPane } = Tabs;

function onChange(a, b, c) {
  console.log(a, b, c);
}

// const handleRowSelection = (record) => {
//     console.log(record)
// };

const contentStyle = {
  height: "460px",
  margin: "50px 250px 0 250px",
  padding: "20px 50px 0 50px",
  color: "#fff",
  lineHeight: "160px",
  textAlign: "left",
  background: "#364d79",
  borderRadius: "10px",
  boxShadow: "0 3px 6px -4px rgba(0, 0, 0, 0.12)",
};
const artistColumns = [
  {
    title: "Artist Name",
    dataIndex: "artist",
    key: "artist",
    sorter: (a, b) => a.artist.localeCompare(b.artist),
  },
  {
    title: "Total Number of Songs",
    dataIndex: "num_songs",
    key: "num_songs",
    sorter: (a, b) => a.num_songs - b.num_songs,
  },
  {
    title: "Number of Billboard Songs",
    dataIndex: "num_songs_billboard",
    key: "num_songs_billboard",
    sorter: (a, b) => a.num_songs_billboard - b.num_songs_billboard,
  },
  {
    title: "Number of Spotify Ranked Songs",
    dataIndex: "num_songs_spotify",
    key: "num_songs_spotify",
    sorter: (a, b) => a.num_songs_spotify - b.num_songs_spotify,
  },
  {
    title: "Number of Grammy Songs",
    dataIndex: "num_songs_grammy",
    key: "num_songs_grammy",
    sorter: (a, b) => a.num_songs_grammy - b.num_songs_grammy,
  },
];

const parseDateString = (dateString) => {
  return dateString.substring(0, dateString.indexOf("T"));
};

export default function RankingPage() {
  const [artistsResults, setArtistsResults] = useState([]);
  const [artistsStats, setArtistsStats] = useState([]);
  const [billboardSongs, setBillboardSongs] = useState([]);
  const [grammySongs, setGrammySongs] = useState([]);
  const [spotifySongs, setSpotifySongs] = useState([]);
  const [selectedArtistId, setSelectedArtistId] = useState(
    "0du5cEVh5yTK9QJze8zA0C"
  );
  const [awardStat, setAwardStat] = useState(null);
  const [artistInfo, setArtistInfo] = useState(null);
  const [activeTab, setActiveTab] = useState("tab1");
  const [loader, setLoader] = useState(true);

  const handleRowSelection = (record) => {
    console.log(record);

    getAwardStat(record.artist_id).then((res) => {
      console.log("award stats:");
      console.log(res.results);
      setAwardStat(res.results[0]);
    });
    getBillboardSongs(record.artist_id).then((res) => {
      console.log("billboard songs:");
      console.log(res.results);
      setBillboardSongs(res.results);
    });
    getGrammySongs(record.artist_id).then((res) => {
      console.log("grammy songs:");
      console.log(res.results);
      setGrammySongs(res.results);
    });
    getSpotifyRankedSongs(record.artist_id).then((res) => {
      console.log("spotify ranked songs:");
      console.log(res.results);
      setSpotifySongs(res.results);
    });
    getArtist(record.artist_id).then((res) => {
      console.log("artist info:");
      console.log(res.results);
      setArtistInfo(res.results[0]);
    });
  };

  const onTabChange = (key) => {
    setActiveTab(key);
  };

  useEffect(() => {
    getArtistStats().then((res) => {
      setArtistsStats(res.results);
      setLoader(false);
    });
  }, []);

  const getMore = (page, pageSize) => {
    // console.log("artistsStats", artistsStats.length);
    if (page * pageSize == artistsStats.length) {
      getArtistStats(page + 1, pageSize).then((res) => {
        const resultingArray = [...artistsStats, ...res.results];
        setArtistsStats(resultingArray);
      });
    }
  };

  const Emoji = (props) => (
    <span
      className="emoji"
      role="img"
      aria-label={props.label ? props.label : ""}
      aria-hidden={props.label ? "false" : "true"}
    >
      {props.symbol}
    </span>
  );

  const tabList = [
    {
      key: "tab1",
      tab: "Spotify Ranked Songs",
    },
    {
      key: "tab2",
      tab: "Billboard Ranked Songs",
    },
    {
      key: "tab3",
      tab: "Grammy Awards",
    },
  ];

  const contentList = {
    tab1: (
      <div>
        {spotifySongs.length > 0 ? (
          <div style={{ height: "300px", overflow: "scroll" }}>
            <List
              size="small"
              header={<div>Songs</div>}
              // footer={<div>Footer</div>}
              pagination
              bordered
              dataSource={spotifySongs}
              renderItem={(song) => (
                <List.Item>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      gap: "10px",
                    }}
                  >
                    <div>
                      <a
                        href={"https://open.spotify.com/track/" + song.song_id}
                        target="_blank"
                      >
                        Track Title : {song.title}
                      </a>
                      <div>
                        {" "}
                        Most Recent Time on Board :{" "}
                        {parseDateString(song.latestweek)}
                      </div>
                      <div> Times on Board : {song.num} </div>
                    </div>
                    <iframe
                      src={
                        "https://open.spotify.com/embed/track/" + song.song_id
                      }
                      width="300"
                      height="100"
                      frameborder="0"
                      allowtransparency="true"
                      allow="encrypted-media"
                    ></iframe>
                  </div>
                </List.Item>
              )}
            />
          </div>
        ) : (
          <div>
            <div>
              {" "}
              No Spotify Hits for {artistInfo ? artistInfo.name : ""}{" "}
              <Emoji symbol="🙁" />{" "}
            </div>
          </div>
        )}
      </div>
    ),
    tab2: (
      <div>
        {billboardSongs.length > 0 ? (
          <div style={{ height: "300px", overflow: "scroll" }}>
            <List
              size="small"
              header={<div>Songs</div>}
              // footer={<div>Footer</div>}
              pagination
              bordered
              dataSource={billboardSongs}
              renderItem={(song) => (
                <List.Item>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      gap: "10px",
                    }}
                  >
                    <div>
                      <a
                        href={"https://open.spotify.com/track/" + song.song_id}
                        target="_blank"
                      >
                        Track Title : {song.title}
                      </a>
                      <div>
                        {" "}
                        Most Recent Time on Board :{" "}
                        {parseDateString(song.latestweek)}
                      </div>
                      <div> Times on Board : {song.num} </div>
                    </div>
                    <iframe
                      src={
                        "https://open.spotify.com/embed/track/" + song.song_id
                      }
                      width="300"
                      height="100"
                      frameborder="0"
                      allowtransparency="true"
                      allow="encrypted-media"
                    ></iframe>
                  </div>
                </List.Item>
              )}
            />
          </div>
        ) : (
          <div>
            <div>
              {" "}
              No Billboard Hits for {artistInfo ? artistInfo.name : ""}{" "}
              <Emoji symbol="🙁" />{" "}
            </div>
          </div>
        )}
      </div>
    ),
    tab3: (
      <div>
        {grammySongs.length > 0 ? (
          <div style={{ height: "300px", overflow: "scroll" }}>
            <List
              size="small"
              header={<div>Songs</div>}
              // footer={<div>Footer</div>}
              pagination
              bordered
              dataSource={grammySongs}
              renderItem={(song) => (
                <List.Item>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      gap: "10px",
                    }}
                  >
                    <div>
                      <a
                        href={"https://open.spotify.com/track/" + song.song_id}
                        target="_blank"
                      >
                        Track Title : {song.title}
                      </a>
                      <div> Award : {song.award}</div>
                      <div> Year Received : {song.year} </div>
                    </div>
                    <iframe
                      src={
                        "https://open.spotify.com/embed/track/" + song.song_id
                      }
                      width="300"
                      height="100"
                      frameborder="0"
                      allowtransparency="true"
                      allow="encrypted-media"
                    ></iframe>
                  </div>
                </List.Item>
              )}
            />
          </div>
        ) : (
          <div>
            <div>
              {" "}
              No Grammies for {artistInfo ? artistInfo.name : ""}{" "}
              <Emoji symbol="🙁" />{" "}
            </div>
          </div>
        )}
      </div>
    ),
  };

  return (
    <div>
      <div>
        <Navigationbar />
      </div>
      <Table
        id="filter-container"
        style={{ width: "80%", margin: "20px auto" }}
        dataSource={artistsStats}
        columns={artistColumns}
        loading={loader}
        pagination={{
          pageSizeOptions: [5, 10, 50],
          defaultPageSize: 5,
          showQuickJumper: true,
          onChange: getMore,
        }}
        scroll={{ y: 500 }}
        onRow={(record, rowIndex) => {
          return {
            onClick: (event) => {
              handleRowSelection(record);
            }, // click row
          };
        }}
      />

      {artistInfo && (
        <div style={{ width: "50%", margin: "auto" }}>
          <Card
            hoverable
            size="small"
            //   cover={
            //     <img alt="example" src={artistInfo ? artistInfo.image_url : ""} />
            //   }
            title={artistInfo ? artistInfo.name : ""}
            // extra={<a href="#">More</a>}
            tabList={tabList}
            activeTabKey={activeTab}
            onTabChange={(key) => {
              onTabChange(key);
            }}
          >
            <div style={{ display: "flex", flexDirection: "row", gap: "10px" }}>
              <img
                style={{ width: "300px", height: "300px", objectFit: "cover" }}
                alt="example"
                src={artistInfo ? artistInfo.image_url : ""}
              />
              <div style={{ width: "100%", margin: "auto" }}>
                {contentList[activeTab]}
              </div>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
}
