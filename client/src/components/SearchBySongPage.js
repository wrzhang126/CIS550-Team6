import Navigationbar from './Navbar';
import Filter from './Filter';
import React from 'react';
import { Form, FormInput, FormGroup, Button, Card, CardBody, CardTitle, Progress } from "shards-react";
import './Filter.css';
import {
    Table,
    Pagination,
    Select,
    Row,
    Col,
    Divider,
    Slider,
    Rate 
} from 'antd'
import { RadarChart } from 'react-vis';
import { format } from 'd3-format';

const wideFormat = format('.0r');
const { Column, ColumnGroup } = Table;
const songColumns = [
  {
    title: 'id',
    dataIndex: 'Id',
    key: 'id'
  },
  {
    title: 'Title',
    dataIndex: 'title',
    key: 'title'
  },
  {
    title: 'Artist',
    dataIndex: 'Artist',
    key: 'Artist'
  },
  {
    title: 'Album',
    dataIndex: 'Album',
    key: 'Album'
  },
  {
    title: 'Release Date',
    dataIndex: 'release_date',
    key: 'release_date'
  },
]
class SearchBySongPage extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
        selectedSongDetail : {"loudness" : 0.5, "danceability" : 0.3, "tempo" : 0.6, "energy" : 0.8, "liveness" : 0.4},
        songsResults : [
          {"Id" : "abcde", "title" : "Shape of You", "Artist" : "Ed Shereen", "Album" : "Shape of You", "release_date" : "2000-00-00"},
          {"Id" : "abcde", "title" : "Poker Face", "Artist" : "Lady Gaga", "Album" : "The Remix", "release_date" : "2000-00-00"}
      ]
    }
}
  render(){
    return (
      <div>
        <Navigationbar/>
      <div id="main">
        <div id="sticky" style={{width: "20%", minWidth: "400px", padding: "10px 0px 0px 10px"}}>
            <Filter/>
        </div>

        <div  style={{ width: '70vw', margin: '0 auto', marginTop: '2vh'}}>
          <h3>Songs</h3>
          <Table dataSource={this.state.songsResults} columns={songColumns}/>
            <Card>
              
              <CardBody>
                  <Row gutter='15' align='top' justify='top'>
                      <Col flex={2} style={{ textAlign: 'middle', margin: '30px 30px' }}>
                      <h1>Poker Face</h1>
                      <br></br>
                      <h5>SongID : abcdefg</h5>
                      <h5>Artists : Lady Gaga</h5>
                      <h5>Album: The Remix</h5>
                      <h5>Release Year: 2008</h5>
                      </Col>
                      <Col>
                      <RadarChart
                        data={[this.state.selectedSongDetail]}
                        tickFormat={t => wideFormat(t)}
                        startingAngle={0}
                        domains={[
                            { name: 'Loudness', domain: [0, 1], getValue: d => d.loudness },
                            { name: 'Danceability', domain: [0, 1], getValue: d => d.danceability },
                            { name: 'Tempo', domain: [0, 1], getValue: d => d.tempo },
                            { name: 'Liveness', domain: [0, 1], getValue: d => d.liveness},
                            { name: 'Energy', domain: [0, 1], getValue: d => d.energy },
                        ]}
                        width={450}
                        height={400}
                                  
                      />
                      </Col>
                  </Row>
              </CardBody>
  
            </Card>
            <Card style = {{width: "70vw%", marginTop : '2vh'}}>
              <CardBody>
                <Row gutter='300' align = 'left'>
                  <Col>
                  <h2>Grammy</h2>
                  <br></br>
                  <h5>award:</h5>
                  <h5>year:</h5>
                  </Col>
                  <Col>
                  <h2>Spotify</h2>
                  <br></br>
                  <h5>rank:</h5>
                  <h5>stream:</h5>
                  </Col>
                  <Col>
                  <h2>BillBoard</h2>
                  <br></br>
                  <h5>rank:</h5>
                  <h5>top rank:</h5>
                  </Col>
                </Row>

              </CardBody>
            </Card>

        </div>
          
      </div>
      </div>
    );
  }
}
export default SearchBySongPage
