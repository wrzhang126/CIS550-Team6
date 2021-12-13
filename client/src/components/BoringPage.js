import React, { useEffect, useState } from "react";
import { Table } from "antd";
import { getBoringTableOne, getBoringTableTwo } from "../fetcher";

export default function BoringPage() {
  const [tableOne, setTableOne] = useState([]);
  const [tableTwo, setTableTwo] = useState([]);
  useEffect(() => {
    getBoringTableOne().then((res) => {
      setTableOne(res.results);
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

  const columnsTwo = [
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

  return (
    <div>
      <div>
        <h1>Table one</h1>
        <div>
          <Table columns={columnsOne} dataSource={tableOne} />
        </div>
      </div>
      <div>
        <div>
          <h1>Table two</h1>
          <div>
            <Table columns={columnsTwo} dataSource={tableTwo} />
          </div>
        </div>
      </div>
    </div>
  );
}
