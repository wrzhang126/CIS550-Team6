import React, { useState } from "react";
import Navigationbar from "./Navbar";
import Filter from "./FilterTwo";
import { getSongSearch } from "../fetcher";
import { Table } from "antd";

import "../App.css";
import { useNavigate } from "react-router";

export default function SearchSongsPage() {
  const navigate = useNavigate();
  const [songs, setSongs] = useState([]);
  const [loading, setLoader] = useState(false);

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

  const handleRowSelection = (record) => {
    navigate(`/artist/${record.artist_id}`);
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
              pagination={{
                pageSizeOptions: [5, 10],
                defaultPageSize: 5,
                showQuickJumper: true,
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
