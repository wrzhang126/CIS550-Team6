import React, { useState } from "react";
import Navigationbar from "./Navbar";
import Filter from "./Filter";
import Body from "./Body";
import { searchArtists } from "../fetcher";
import { Table } from "antd";

import "../App.css";
import { useNavigate } from "react-router";

export default function SearchByArtistPage() {
  const navigate = useNavigate();
  const [artists, setArtists] = useState([]);

  const handleFormSubmission = (values) => {
    searchArtists(values).then((res) => {
      setArtists(res.results);
    });
  };
  const columns = [
    {
      title: "Name",
      dataIndex: "name",
    },
    {
      title: "Popularity",
      dataIndex: "popularity",
      sorter: (a, b) => a.popularity - b.popularity,
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
              columns={columns}
              dataSource={artists}
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
