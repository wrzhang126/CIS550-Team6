import React, { useEffect, useState } from "react";
import { Table, Tabs } from "antd";
import { getBoringTableOne, getBoringTableTwo } from "../fetcher";
import Navigationbar from "./Navbar";

export default function BoringPage() {
  const { TabPane } = Tabs;
  const [spotifyTable, setTableOne] = useState([]);
  const [billboardTable, setTableTwo] = useState([]);
  const [loader, setLoader] = useState(true);
  const [currentTab, setCurrentTab] = useState("spotify");
  useEffect(() => {
    getBoringTableOne().then((res) => {
      setTableOne(res.results);
      setLoader(false);
    });
    getBoringTableTwo().then((res) => {
      setTableTwo(res.results);
    });
  });
  const columnsOne = [
    {
      title: "Artist name",
      dataIndex: "artist",
    },
    {
      title: "Title",
      dataIndex: "title",
    },
    {
      title: "First week",
      dataIndex: "first_week",
    },
    {
      title: "Last week",
      dataIndex: "last_week",
    },
    {
      title: "Weeks",
      dataIndex: "num_consec_weeks",
    },
  ];
  function callback(key) {
    setCurrentTab(key);
  }

  return (
    <div>
      <div>
        <Navigationbar />
      </div>
      <Tabs centered defaultActiveKey="1" onChange={callback}>
        <TabPane tab="Spotify" key="spotify">
          <div style={{ width: "80%", margin: "auto" }}>
            <div style={{ textAlign: "center" }}>
              <h1>Consecutive weeks on Spotify</h1>
            </div>

            <Table
              bordered
              loading={loader}
              columns={columnsOne}
              dataSource={spotifyTable}
              pagination={{
                defaultPageSize: 5,
                pageSizeOptions: [5, 10, 50],
              }}
              scroll={{ y: 500 }}
            />
          </div>
        </TabPane>
        <TabPane tab="Billboard" key="billboard">
          <div style={{ width: "80%", margin: "auto" }}>
            <div style={{ textAlign: "center" }}>
              <h1>Consecutive weeks on Billboard</h1>
            </div>
            <Table
              loading={loader}
              columns={columnsOne}
              dataSource={billboardTable}
              pagination={{
                defaultPageSize: 5,
                pageSizeOptions: [5, 10, 50],
              }}
              scroll={{ y: 500 }}
            />
          </div>
        </TabPane>
      </Tabs>
    </div>
  );
}
