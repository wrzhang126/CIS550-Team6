import React, { useEffect, useState } from "react";
import { Table, Tabs } from "antd";
import { getBoringTableOne, getBoringTableTwo } from "../fetcher";
import Navigationbar from "./Navbar";

export default function BoringPage() {
  const { TabPane } = Tabs;
  const [tableOne, setTableOne] = useState([]);
  const [tableTwo, setTableTwo] = useState([]);
  const [loader, setLoader] = useState(true);
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
    console.log(key);
  }
  return (
    <div>
      <div>
        <Navigationbar />
      </div>
      <Tabs centered defaultActiveKey="1" onChange={callback}>
        <TabPane tab="Tab 1" key="1">
          <div style={{ textAlign: "center" }}>
            <h1>Table one</h1>
          </div>

          <Table loading={loader} columns={columnsOne} dataSource={tableOne} />
        </TabPane>
        <TabPane tab="Tab 2" key="2">
          <div style={{ textAlign: "center" }}>
            <h1>Table two</h1>
          </div>
          <Table loading={loader} columns={columnsOne} dataSource={tableTwo} />
        </TabPane>
      </Tabs>
    </div>
  );
}
