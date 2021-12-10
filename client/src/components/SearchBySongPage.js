import Navigationbar from './Navbar';
import Filter from './Filter';
import { getAllSongs, getSong, getSongSearch } from '../fetcher'
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
    dataIndex: 'song_id',
    key: 'song_id',
    render: (text, row) => <a href={`/songs?id=${row.song_id}`}>{text}</a>
  },
  {
    title: 'Title',
    dataIndex: 'title',
    key: 'title',
    sorter : (a, b) => a.title.localeCompare(b.title)
  },
  {
    title: 'album_id',
    dataIndex: 'album_id',
    key: 'album_id'
  },
  {
    title: 'Album',
    dataIndex: 'album',
    key: 'album'
  },
  {
    title: 'Release Year',
    dataIndex: 'year',
    key: 'year'
  }
]
class SearchBySongPage extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
        selectedSongDetail : {"loudness" : -10, "danceability" : 0, "tempo" : 0, "energy" : 0, "liveness" : 0},
        selectedSongInfo : null,
        songsResults : [],
        pagination : null,
        selectedSongId: window.location.search ? window.location.search.substring(1).split('=')[1] : "0001Lyv0YTjkZSqzT4WkLy",
        nameQuery : '',
        startYearQuery : '',
        endYearQuery : '',
        danceabilityLowQuery : 0,
        danceabilityHighQuery : 1
        
    }
    this.handleNameQueryChange = this.handleNameQueryChange.bind(this)
    this.handleStartYearQueryChange = this.handleStartYearQueryChange.bind(this)
    this.handleEndYearQueryChange = this.handleEndYearQueryChange.bind(this)
    this.handleDanceabilityChange = this.handleDanceabilityChange.bind(this)
    this.updateSearchResults = this.updateSearchResults.bind(this)
}
handleNameQueryChange(event) {
  this.setState({ nameQuery: event.target.value })
}
handleStartYearQueryChange(value){
  this.setState({startYearQuery : value})
}
handleEndYearQueryChange(value){
  this.setState({endYearQuery : value})
}
handleDanceabilityChange(value){
  this.setState({ danceabilityLowQuery: value[0] })
  this.setState({ danceabilityHighQuery: value[1] })
}
updateSearchResults() {

  getSongSearch(this.state.nameQuery, this.state.startYearQuery, this.state.endYearQuery, null, null).then(res => {
      this.setState({ songsResults: res.results })
  })
}

componentDidMount() {
  getAllSongs().then(res => {
    console.log(res.results)
    this.setState({ songsResults: res.results })
  })

  getSong(this.state.selectedSongId).then(res => {
    this.setState({selectedSongInfo: res.results[0]})
  })
}
  render(){
    return (
      <div>
        <Navigationbar/>
      <div id="main">
        <div id="sticky" style={{width: "20%", minWidth: "400px", padding: "10px 0px 0px 10px"}}>
          <div id="filter-container"  style={{margin: "auto", padding: "20px 0 10px 0"}}>
            <Form style={{width: '90%',margin: 'auto' , padding:"0px 0px 10px 0px" }} className="d-flex">
              <FormInput placeholder="Search by Song" value={this.state.nameQuery} onChange={this.handleNameQueryChange} />
              <Button variant="outline-primary" onClick={this.updateSearchResults}>Search</Button>
            </Form>
            <div style={{width: '90%',textAlign: "center", margin: "auto"}}>
              <div style={{fontWeight: 'bolder', textAlign: "center", color: "#0D6EFD"}}>Filter options</div>
              <Form>
                <div style={{ fontWeight: 'bold', textAlign: "left"}}> Release year range </div>
                <FormGroup style={{padding:"10px 0px 10px 0px", justifyContent:"space-evenly"}} className="d-flex">
                  <label>Start year: </label>
                    <Select onChange={this.handleStartYearQueryChange} value={this.state.startYearQuery} style={{width: '25%'}} aria-label="Default select example">
                      <Select.Option value = "1990" >1990</Select.Option>
                      <Select.Option value = "1995">1995</Select.Option>
                      <Select.Option value = "2000">2000</Select.Option>
                      <Select.Option value = "2005">2005</Select.Option>
                      <Select.Option value = "2010">2010</Select.Option>
                      <Select.Option value = "2015">2015</Select.Option>
                      <Select.Option value = "2020">2020</Select.Option>
                    </Select>
                  <label >End year: </label>
                    <Select onChange={this.handleEndYearQueryChange} value={this.state.endYearQuery} style={{width: '25%' }} aria-label="Default select example">
                      <Select.Option value = "1990" >1990</Select.Option>
                      <Select.Option value = "1995">1995</Select.Option>
                      <Select.Option value = "2000">2000</Select.Option>
                      <Select.Option value = "2005">2005</Select.Option>
                      <Select.Option value = "2010">2010</Select.Option>
                      <Select.Option value = "2015">2015</Select.Option>
                      <Select.Option value = "2020">2020</Select.Option>
                    </Select>
                </FormGroup>
                <div style={{ fontWeight: 'bold', textAlign: "left"}}> Songs attributes </div>
                <FormGroup style={{width : '90%', margin : "auto"}}>
                  <label> Danceability</label>
                  <Slider range defaultValue={[0, 1]} onChange={this.handleDanceabilityChange}/>
                </FormGroup>
              </Form>
            </div>
          </div>
          
        </div>

        <div style={{ width: '70vw', margin: '0 auto', marginTop: '2vh', padding: "10px 10px 10px 10px"}}>
          <h3>Songs</h3>
          <Table id="filter-container" dataSource={this.state.songsResults} columns={songColumns} pagination={{ pageSizeOptions:[5, 10], defaultPageSize: 5, showQuickJumper:true }}/>
            <Card id="filter-container">
              
              <CardBody>
                  <Row gutter='15' align='top' justify='top'>
                      <Col flex={2} style={{ textAlign: 'middle', margin: '30px 30px' }}>
                      <h1>{this.state.selectedSongInfo ? this.state.selectedSongInfo.title : ""}</h1>
                      <br></br>
                      <h5>SongID : {this.state.selectedSongInfo ? this.state.selectedSongInfo.song_id : ""}</h5>
                      <h5>Album: {this.state.selectedSongInfo ? this.state.selectedSongInfo.album : ""}</h5>
                      <h5>Release Year: {this.state.selectedSongInfo ? this.state.selectedSongInfo.year : ""}</h5>
                      </Col>
                      <Col>
                      <RadarChart
                        data={[this.state.selectedSongInfo ? this.state.selectedSongInfo : this.state.selectedSongDetail]}
                        tickFormat={t => wideFormat(t)}
                        startingAngle={0}
                        domains={[
                            { name: 'Loudness', domain: [-10, 8], getValue: d => d.loudness ? d.loudness : 0 },
                            { name: 'Danceability', domain: [0, 1], getValue: d => d.danceability },
                            { name: 'Tempo', domain: [0, 10], getValue: d => d.tempo },
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
            <Card id="filter-container" style = {{width: "70vw%", marginTop : '2vh'}}>
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
