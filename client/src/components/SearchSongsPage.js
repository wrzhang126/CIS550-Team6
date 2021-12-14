import React, { useEffect, useState } from "react";
import Navigationbar from "./Navbar";
import Filter from "./FilterTwo";
import { getArtist, getSong, getSongSearch } from "../fetcher";
import { Table, Card, Avatar, Tooltip } from "antd";

import "../App.css";
import { useNavigate } from "react-router";

export default function SearchSongsPage() {
  const navigate = useNavigate();
  const [songs, setSongs] = useState([]);
  const [loading, setLoader] = useState(false);
  const [values, setValues] = useState({});
  const [display, setDisplay] = useState(false);
  const [artistsList, setArtist] = useState([]);
  const [query, setQuery] = useState({});
  const handleFormSubmission = (values) => {
    setQuery(values);
    setLoader(true);
    getSongSearch(values).then((res) => {
      setSongs(res.results);
      setLoader(false);
    });
  };

  const columns = [
    {
      title: "Title",
      dataIndex: "title",
    },
    {
      title: "Album",
      dataIndex: "album",
    },
  ];

  const handleRowSelection = (record) => {
    getSong(record.song_id).then((res) => {
      setValues(res.results[0]);
      getArtist(res.results[0].artist_ids).then((res) => {
        console.log(res.results[0]);
        if (!display) {
          setDisplay(true);
          setArtist([res.results[0], ...artistsList]);
        }
      });
    });
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
  const getMore = (page, pageSize) => {
    if (page * pageSize == songs.length) {
      const newQuery = { ...query };
      newQuery["page"] = page + 1;
      newQuery["pagesize"] = pageSize;
      getSongSearch(newQuery).then((res) => {
        setSongs([...songs, res.results]);
      });
    }
  };
  return (
    <div>
      <Navigationbar />
      <div id="main">
        <div
          id="sticky"
          style={{
            width: "20%",
            minWidth: "400px",
            padding: "10px 0px 0px 10px",
          }}
        >
          <Filter handleFormSubmission={handleFormSubmission} />
        </div>
        <div
          id="sticky"
          style={{
            width: "70%",
            minWidth: "700px",
            padding: "10px 0px 0px 10px",
          }}
        >
          <div>
            <Table
              // onChange={getMore}
              loading={loading}
              columns={columns}
              dataSource={songs}
              onRow={(record, rowIndex) => {
                return {
                  onClick: (event) => {
                    handleRowSelection(record);
                  }, // click row
                };
              }}
              bordered
              pagination={{
                onChange: getMore,
                defaultPageSize: 10,
                pageSizeOptions: [5, 10, 50],
              }}
              scroll={{ y: 240 }}
            />
          </div>
          <div>
            {display ? (
              <Card
                hoverable
                size="small"
                title={values.title}
                style={{ width: 700, margin: "auto" }}
              >
                <div style={{}}>
                  <p>
                    {" "}
                    <span style={{ fontWeight: "bold" }}>Album: </span>{" "}
                    {values.album}
                  </p>
                  <div style={{ margin: "5px 0px 5px 0px" }}>
                    <span style={{ fontWeight: "bold" }}>Artists</span>

                    <div style={{ display: "flex", gap: "5px" }}>
                      {artistsList.length > 0 ? (
                        artistsList.map((item) => (
                          <div id={"button"} style={{ textAlign: "center" }}>
                            <Tooltip title={`${item.name}`} placement="top">
                              <Avatar
                                style={{ margin: "auto" }}
                                size={64}
                                src={item.image_url}
                              />
                              <div style={{}}>{item.name}</div>
                            </Tooltip>
                          </div>
                        ))
                      ) : (
                        <div>hello</div>
                      )}
                      {values.song_id ? (
                        <div style={{ paddingLeft: "50px" }}>
                          <iframe
                            src={
                              "https://open.spotify.com/embed/track/" +
                              values.song_id
                            }
                            width="300"
                            height="100"
                            frameborder="0"
                            allowtransparency="true"
                            allow="encrypted-media"
                          />
                        </div>
                      ) : (
                        <div></div>
                      )}
                    </div>
                  </div>

                  <div id="data">
                    <div
                      style={{
                        display: "flex",
                        gap: "25%",
                      }}
                    >
                      <div>
                        <p>
                          <span style={{ fontWeight: "bold" }}>Explicit: </span>
                          {values.explicit ? (
                            <div>{values.explicit}</div>
                          ) : (
                            <span>
                              {" "}
                              You tell us! <Emoji symbol="😁" />{" "}
                            </span>
                          )}
                        </p>
                        <p>
                          <span style={{ fontWeight: "bold" }}>
                            Danceability:{" "}
                          </span>
                          {values.danceability}
                        </p>
                        <p>
                          {" "}
                          <span style={{ fontWeight: "bold" }}>
                            Energy:{" "}
                          </span>{" "}
                          {values.energy}
                        </p>
                      </div>
                      <div>
                        <p>
                          {" "}
                          <span style={{ fontWeight: "bold" }}>
                            Liveness:{" "}
                          </span>{" "}
                          {values.liveness}
                        </p>
                        <p>
                          {" "}
                          <span style={{ fontWeight: "bold" }}>
                            Tempo:{" "}
                          </span>{" "}
                          {values.tempo}
                        </p>
                        <p>
                          {" "}
                          <span style={{ fontWeight: "bold" }}>
                            Acousticness:{" "}
                          </span>{" "}
                          {values.acousticness}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            ) : (
              <div></div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
