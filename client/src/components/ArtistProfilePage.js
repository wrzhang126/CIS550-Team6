import React, { useEffect, useState } from "react";
import { getArtist } from "../fetcher";
import { Image, Table } from "react-bootstrap";
import Navigationbar from "./Navbar";
import "./Body.css";

export default function ArtistProfile() {
  const [url, setUrl] = useState("");
  const [name, setName] = useState("");
  const [followers, setFollowers] = useState(0);
  const [popularity, setPopularity] = useState(0);
  const artistId = window.location.pathname.split("/")[2];

  getArtist(artistId).then((res) => {
    console.log(res.results[0]);
    setUrl(res.results[0].image_url);
    setName(res.results[0].name);
    setFollowers(res.results[0].followers);
    setPopularity(res.results[0].popularity);
  });
  return (
    <div>
      <Navigationbar />
      <div style={{ marginTop: "10px", width: "100%", textAlign: "center" }}>
        <Image
          id="test"
          style={{
            width: "90%",
            height: "400px",
            objectFit: "cover",
          }}
          src={url}
        />
        <Image
          style={{
            width: "200px",
            height: "200px",
            objectFit: "cover",
          }}
          roundedCircle
          src={url}
        />
        <div style={{ height: "50%" }}>
          <div style={{ width: "fit-content", margin: "auto" }}>
            <h1 style={{ color: "#0D6EFD" }}>{name}</h1>
            <div
              style={{
                width: "fit-content",
                margin: "auto",
              }}
            >
              <label style={{ float: "left" }} for="followers">
                Followers:{" "}
              </label>
              <div id="followers">{followers} </div>
            </div>

            <div
              style={{
                width: "fit-content",
                margin: "auto",
              }}
            >
              <label for="popularity">Popularity: </label>
              <span id="followers">{popularity} </span>
            </div>
          </div>
        </div>
        <Table stickyHeader responsive>
          <thead>
            <tr>
              <th style={{ color: "#0D6EFD" }}>#</th>
              <th style={{ color: "#0D6EFD" }}>Song Name</th>
              <th style={{ color: "#0D6EFD" }}>Danceability</th>
              <th style={{ color: "#0D6EFD" }}>Energy</th>
              <th style={{ color: "#0D6EFD" }}>Liveness</th>
              <th style={{ color: "#0D6EFD" }}>Release year</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>1</td>
              <td>Socco</td>
              <td>6</td>
              <td>100</td>
              <td>199</td>
              <td>2019</td>
            </tr>
            <tr>
              <td>1</td>
              <td>Socco</td>
              <td>6</td>
              <td>100</td>
              <td>199</td>
              <td>2019</td>
            </tr>
            <tr>
              <td>1</td>
              <td>Socco</td>
              <td>6</td>
              <td>100</td>
              <td>199</td>
              <td>2019</td>
            </tr>
            <tr>
              <td>1</td>
              <td>Socco</td>
              <td>6</td>
              <td>100</td>
              <td>199</td>
              <td>2019</td>
            </tr>
            <tr>
              <td>1</td>
              <td>Socco</td>
              <td>6</td>
              <td>100</td>
              <td>199</td>
              <td>2019</td>
            </tr>

            <tr>
              <td>1</td>
              <td>Socco</td>
              <td>6</td>
              <td>100</td>
              <td>199</td>
              <td>2019</td>
            </tr>
            <tr>
              <td>1</td>
              <td>Socco</td>
              <td>6</td>
              <td>100</td>
              <td>199</td>
              <td>2019</td>
            </tr>
            <tr>
              <td>1</td>
              <td>Socco</td>
              <td>6</td>
              <td>100</td>
              <td>199</td>
              <td>2019</td>
            </tr>
            <tr>
              <td>1</td>
              <td>Socco</td>
              <td>6</td>
              <td>100</td>
              <td>199</td>
              <td>2019</td>
            </tr>
            <tr>
              <td>1</td>
              <td>Socco</td>
              <td>6</td>
              <td>100</td>
              <td>199</td>
              <td>2019</td>
            </tr>
            <tr>
              <td>1</td>
              <td>Socco</td>
              <td>6</td>
              <td>100</td>
              <td>199</td>
              <td>2019</td>
            </tr>
            <tr>
              <td>1</td>
              <td>Socco</td>
              <td>6</td>
              <td>100</td>
              <td>199</td>
              <td>2019</td>
            </tr>
            <tr>
              <td>1</td>
              <td>Socco</td>
              <td>6</td>
              <td>100</td>
              <td>199</td>
              <td>2019</td>
            </tr>
            <tr>
              <td>1</td>
              <td>Socco</td>
              <td>6</td>
              <td>100</td>
              <td>199</td>
              <td>2019</td>
            </tr>
            <tr>
              <td>1</td>
              <td>Socco</td>
              <td>6</td>
              <td>100</td>
              <td>199</td>
              <td>2019</td>
            </tr>
            <tr>
              <td>1</td>
              <td>Socco</td>
              <td>6</td>
              <td>100</td>
              <td>199</td>
              <td>2019</td>
            </tr>

            <tr>
              <td>1</td>
              <td>Socco</td>
              <td>6</td>
              <td>100</td>
              <td>199</td>
              <td>2019</td>
            </tr>
            <tr>
              <td>1</td>
              <td>Socco</td>
              <td>6</td>
              <td>100</td>
              <td>199</td>
              <td>2019</td>
            </tr>
            <tr>
              <td>1</td>
              <td>Socco</td>
              <td>6</td>
              <td>100</td>
              <td>199</td>
              <td>2019</td>
            </tr>
            <tr>
              <td>1</td>
              <td>Socco</td>
              <td>6</td>
              <td>100</td>
              <td>199</td>
              <td>2019</td>
            </tr>
            <tr>
              <td>1</td>
              <td>Socco</td>
              <td>6</td>
              <td>100</td>
              <td>199</td>
              <td>2019</td>
            </tr>
            <tr>
              <td>1</td>
              <td>Socco</td>
              <td>6</td>
              <td>100</td>
              <td>199</td>
              <td>2019</td>
            </tr>
            <tr>
              <td>1</td>
              <td>Socco</td>
              <td>6</td>
              <td>100</td>
              <td>199</td>
              <td>2019</td>
            </tr>
            <tr>
              <td>1</td>
              <td>Socco</td>
              <td>6</td>
              <td>100</td>
              <td>199</td>
              <td>2019</td>
            </tr>
          </tbody>
        </Table>
      </div>
    </div>
  );
}
