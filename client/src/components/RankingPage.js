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
} from "../fetcher";
import React, { useState } from "react";
import "./Filter.css";
import { Table, Carousel, Tabs, Card } from "antd";
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
    sorter: (a, b) => a.name.localeCompare(b.name),
  },
  {
    title: "Total Number of Songs",
    dataIndex: "num_songs",
    key: "num_songs",
  },
  {
    title: "Number of Billboard Songs",
    dataIndex: "num_songs_billboard",
    key: "num_songs_billboard",
  },
  {
    title: "Number of Spotify Ranked Songs",
    dataIndex: "num_songs_spotify",
    key: "num_songs_spotify",
  },
  {
    title: "Number of Grammy Songs",
    dataIndex: "num_songs_grammy",
    key: "num_songs_grammy",
  },
];

export default function RankingPage() {
  const [artistsResults, setArtistsResults] = useState([]);
  const [artistsStats, setArtistsStats] = useState([]);
  const [billboardSongs, setBillboardSongs] = useState([]);
  const [grammySongs, setGrammySongs] = useState([]);
  const [selectedArtistId, setSelectedArtistId] = useState(
    "0du5cEVh5yTK9QJze8zA0C"
  );
  const [awardStat, setAwardStat] = useState({});
  const [artistInfo, setArtistInfo] = useState({});
  const [activeTab, setActiveTab] = useState("tab1");

  const handleRowSelection = (record) => {
    console.log(record);

    getAwardStat(record.artist_id).then((res) => {
      console.log(res.results);
      setAwardStat(res.results[0]);
    });
    getBillboardSongs(record.artist_id).then((res) => {
      console.log(res.results);
      setBillboardSongs(res.results);
    });
    getGrammySongs(record.artist_id).then((res) => {
      console.log(res.results);
      setGrammySongs(res.results);
    });
    getArtist(record.artist_id).then((res) => {
      console.log(res.results);
      setArtistInfo(res.results[0]);
    });
  };

  const onTabChange = (key) => {
    setActiveTab(key);
  };

  useEffect(() => {
    getAwardedArtists().then((res) => {
      console.log(res.results);
      setArtistsResults(res.results);
    });
    getArtistStats().then((res) => {
      console.log(res.results);
      setArtistsStats(res.results);
    });

    getAwardStat(selectedArtistId).then((res) => {
      console.log(res.results);
      setAwardStat(res.results[0]);
    });
    getBillboardSongs(selectedArtistId).then((res) => {
      console.log(res.results);
      setBillboardSongs(res.results);
    });
    getGrammySongs(selectedArtistId).then((res) => {
      console.log(res.results);
      setGrammySongs(res.results);
    });
    getArtistById(selectedArtistId).then((res) => {
      console.log(res.results);
      setArtistInfo(res.results[0]);
    });
  }, []);

  const tabList = [
    {
      key: "tab1",
      tab: "tab1",
    },
    {
      key: "tab2",
      tab: "tab2",
    },
  ];

  const contentList = {
    tab1: (
      <div>
        <p> Grammy Award : {awardStat ? awardStat.num_songs_grammy : 0}</p>
        <p> Billboard : {awardStat ? awardStat.num_songs_billboard : 0}</p>
        <p> Spotify : {awardStat ? awardStat.num_songs_spotify : 0}</p>
      </div>
    ),

    tab2: <p>content2</p>,
  };

  return (
    <div>
      <div>
        <Navigationbar />
      </div>
      <Table
        id="filter-container"
        style={{ width: "70vw", margin: "20px auto" }}
        dataSource={artistsStats}
        columns={artistColumns}
        pagination={{
          pageSizeOptions: [5, 10],
          defaultPageSize: 5,
          showQuickJumper: true,
        }}
        onRow={(record, rowIndex) => {
          return {
            onClick: (event) => {
              handleRowSelection(record);
            }, // click row
          };
        }}
      />
      <div style={{ width: "50%", margin: "auto" }}>
        <Card
          hoverable
          size="small"
          //   cover={
          //     <img alt="example" src={artistInfo ? artistInfo.image_url : ""} />
          //   }
          title="Card title"
          // extra={<a href="#">More</a>}
          tabList={tabList}
          activeTabKey={activeTab}
          onTabChange={(key) => {
            onTabChange(key);
          }}
        >
          <div style={{ display: "flex", flexDirection: "row", gap: "10px" }}>
            <img
              style={{ width: "200px", height: "200px", objectFit: "cover" }}
              alt="example"
              src={artistInfo ? artistInfo.image_url : ""}
            />
            <div>{contentList[activeTab]}</div>
          </div>
        </Card>

        {/* <Tabs defaultActiveKey="1" centered >
                    <TabPane tab="Tab 1" key="1">
                        <Card title="Card title" bordered={false} style={{ width: 300, margin: "auto", text-align:"center" }}>
                            <p>Card content</p>
                            <p>Card content</p>
                            <p>Card content</p>
                        </Card>
                    </TabPane>
                    <TabPane tab="Tab 2" key="2">
                    Content of Tab Pane 2
                    </TabPane>
                    <TabPane tab="Tab 3" key="3">
                    Content of Tab Pane 3
                    </TabPane>
                </Tabs> */}

        {/* <Carousel afterChange={onChange}>
                    <div>
                        <h1 style={contentStyle}> {artistInfo ? artistInfo.name : ""}
                            <h3 style={{color : '#fff'}}> Grammy Award :  {awardStat ? awardStat.num_songs_grammy : 0}</h3>
                            <h3 style={{color : '#fff'}}> Billboard :  {awardStat ? awardStat.num_songs_billboard : 0}</h3>
                            <h3 style={{color : '#fff'}}> Spotify : {awardStat ? awardStat.num_songs_spotify: 0}</h3>
                        </h1>
                    </div>
                    <div>
                    <h1 style={contentStyle}> Songs on Billboard 
                        {billboardSongs.length > 0 ? <h6>   

                                <h5 style={{color : '#fff'}}> Name : {billboardSongs[0].title}</h5>
                                <h5 style={{color : '#fff'}}> Most Recent Time on Board : {billboardSongs[0].latestweek}</h5>
                                <h5 style={{color : '#fff'}}> Times on Board : {billboardSongs[0].num} </h5>
                            </h6> : null}
                        {billboardSongs.length > 1 ? <h6>
                            <h5 style={{color : '#fff'}}> Name : {billboardSongs[1].title}</h5>
                            <h5 style={{color : '#fff'}}> Most Recent Time on Board : {billboardSongs[1].latestweek}</h5>
                            <h5 style={{color : '#fff'}}> Times on Board : {billboardSongs[1].num} </h5>
                        
                        </h6> : null}
                    </h1>
                    
                    </div>
                    <div>
                        <h1 style={contentStyle}>Grammy Award Songs
                        {grammySongs.length > 0 ? <h6>   
                            <h5 style={{color : '#fff'}}> Name : {grammySongs[0].title}</h5>
                            <h5 style={{color : '#fff'}}> Award : {grammySongs[0].award}</h5>
                            <h5 style={{color : '#fff'}}> Award Year : {grammySongs[0].year} </h5>
                            </h6> : null}
                        </h1>
                    </div>
                    <div>
                        <h3 style={contentStyle}>4</h3>
                    </div>
                </Carousel> */}
      </div>
    </div>
  );
}
