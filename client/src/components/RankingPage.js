import Navigationbar from './Navbar';
import Filter from './Filter';
import { getAwardedArtists, getAwardStat, getBillboardSongs, getGrammySongs, getArtistById } from '../fetcher'
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
    Rate, 
    AutoComplete
} from 'antd'
import { format } from 'd3-format';
import { Carousel } from 'antd';

function onChange(a, b, c) {
  console.log(a, b, c);
}

const contentStyle = {
  height: '460px',
  margin: "50px 250px 0 250px",
  padding : "20px 50px 0 50px",
  color: '#fff',
  lineHeight: '160px',
  textAlign: 'left',
  background: '#364d79',
  borderRadius: '10px',
  boxShadow: "0 3px 6px -4px rgba(0, 0, 0, 0.12)"
};
const artistColumns = [
    {
      title: 'id',
      dataIndex: 'artist_id',
      key: 'artist_id',
      render: (text, row) => <a href={`/ranking?artist_id=${row.artist_id}`}>{text}</a>
    },
    {
      title: 'Artist Name',
      dataIndex: 'name',
      key: 'name',
      sorter : (a, b) => a.name.localeCompare(b.name)
    },
    {
      title: 'Followers',
      dataIndex: 'followers',
      key: 'followers'
    },
    {
      title: 'Popularity',
      dataIndex: 'popularity',
      key: 'popularity'
    }
  ]
class RankingPage extends React.Component{
    constructor(props) {
        super(props)
        this.state = {
            artistsResults : [],
            billboardSongs : [],
            grammySongs : [],
            selectedArtistId: window.location.search ? window.location.search.substring(1).split('=')[1] : "0du5cEVh5yTK9QJze8zA0C",
            awardStat : null,
            artistInfo : null
        }
    }
    
    componentDidMount() {
        getAwardedArtists().then(res => {
            console.log(res.results)
            this.setState({ artistsResults: res.results })
        })
        getAwardStat(this.state.selectedArtistId).then(res => {
            console.log(res.results)
            this.setState({ awardStat: res.results[0] })
        })
        getBillboardSongs(this.state.selectedArtistId).then(res => {
            console.log(res.results)
            this.setState({ billboardSongs: res.results })
        })
        getGrammySongs(this.state.selectedArtistId).then(res => {
            console.log(res.results)
            this.setState({ grammySongs: res.results })
        })
        getArtistById(this.state.selectedArtistId).then(res => {
            console.log(res.results)
            this.setState({ artistInfo: res.results[0] })
        })
    }

    render() {
        return (
            <div>
                <div><Navigationbar/></div>
                <Table id="filter-container" style={{width: '70vw', margin: '20px auto'}}dataSource={this.state.artistsResults} columns={artistColumns} pagination={{ pageSizeOptions:[5, 10], defaultPageSize: 5, showQuickJumper:true }}/>
                <div>
                    <Carousel afterChange={onChange}>
                        <div>
                            <h1 style={contentStyle}> Number of Awarded Songs of {this.state.artistInfo ? this.state.artistInfo.name : ""}
                                <h3 style={{color : '#fff'}}> Grammy Award :  {this.state.awardStat ? this.state.awardStat.num_songs_grammy : 0}</h3>
                                <h3 style={{color : '#fff'}}> Billboard :  {this.state.awardStat ? this.state.awardStat.num_songs_billboard : 0}</h3>
                                <h3 style={{color : '#fff'}}> Spotify : {this.state.awardStat ? this.state.awardStat.num_songs_spotify: 0}</h3>
                            </h1>
                        </div>
                        <div>
                        <h1 style={contentStyle}> Songs on Billboard 
                            {this.state.billboardSongs.length > 0 ? <h6>   

                                    <h5 style={{color : '#fff'}}> Name : {this.state.billboardSongs[0].title}</h5>
                                    <h5 style={{color : '#fff'}}> Most Recent Time on Board : {this.state.billboardSongs[0].latestweek}</h5>
                                    <h5 style={{color : '#fff'}}> Times on Board : {this.state.billboardSongs[0].num} </h5>
                                </h6> : null}
                            {this.state.billboardSongs.length > 1 ? <h6>
                                <h5 style={{color : '#fff'}}> Name : {this.state.billboardSongs[1].title}</h5>
                                <h5 style={{color : '#fff'}}> Most Recent Time on Board : {this.state.billboardSongs[1].latestweek}</h5>
                                <h5 style={{color : '#fff'}}> Times on Board : {this.state.billboardSongs[1].num} </h5>
                            
                            </h6> : null}
                        </h1>
                        
                        </div>
                        <div>
                            <h1 style={contentStyle}>Grammy Award Songs
                            {this.state.grammySongs.length > 0 ? <h6>   
                                <h5 style={{color : '#fff'}}> Name : {this.state.grammySongs[0].title}</h5>
                                <h5 style={{color : '#fff'}}> Award : {this.state.grammySongs[0].award}</h5>
                                <h5 style={{color : '#fff'}}> Award Year : {this.state.grammySongs[0].year} </h5>
                                </h6> : null}
                            </h1>
                        </div>
                        <div>
                            <h3 style={contentStyle}>4</h3>
                        </div>
                    </Carousel>
                </div>
                
            </div>
            
        );
    }
}
export default RankingPage
