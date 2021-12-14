import React, { useState } from "react";
import Navigationbar from "./Navbar";
import Filter from "./FilterTwo";
import { getSong, getSongSearch } from "../fetcher";
import { Table, Card, Avatar } from "antd";

import "../App.css";
import { useNavigate } from "react-router";

export default function SearchSongsPage() {
  const navigate = useNavigate();
  const [songs, setSongs] = useState([]);
  const [loading, setLoader] = useState(false);
  const [values, setValues] = useState({});
  const [display, setDisplay] = useState(false);
  const handleFormSubmission = (values) => {
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
  const getSongArtistsInfo = (artistIds) => {
    if (artistIds) {
      const ids = artistIds.split(",");
      console.log(ids);
    }
  };
  const handleRowSelection = (record) => {
    getSong(record.song_id).then((res) => {
      setValues(res.results[0]);

      if (!display) {
        setDisplay(true);
      }
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
                pageSizeOptions: [5, 10],
                defaultPageSize: 5,
                showQuickJumper: true,
              }}
            />
          </div>
          <div>
            {display ? (
              <Card
                hoverable
                size="small"
                title={values.title}
                style={{ width: 500, margin: "auto" }}
              >
                <div style={{}}>
                  <p>
                    {" "}
                    <span style={{ fontWeight: "bold" }}>Album: </span>{" "}
                    {values.album}
                  </p>
                  <div style={{ margin: "5px 0px 5px 0px" }}>
                    <span style={{ fontWeight: "bold" }}>Artists</span>
                    <div>
                      <Avatar
                        size={64}
                        src={
                          "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fyt3.ggpht.com%2F-FvBjR0DHn0c%2FAAAAAAAAAAI%2FAAAAAAAAAAA%2F1X7Fl-w2PUw%2Fs900-c-k-no-mo-rj-c0xffffff%2Fphoto.jpg&f=1&nofb=1"
                        }
                      />
                      <div>{values.artists}</div>
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
