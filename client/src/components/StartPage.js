import React from "react";
import Navigationbar from "./Navbar";
import "./Filter.css";
export default function StartPage() {
  return (
    <div>
      <Navigationbar />
      <div style={{ display: "flex" }}>
        <div style={{ flexGrow: "3", minWidth: "50%" }}>
          <img src="logo-whitebg.svg" width={"100%"} />
        </div>
        <div style={{ flexGrow: "1", marginRight: "10px" }}>
          <div style={{ textAlign: "center" }} class="test-p">
            Blurb
          </div>
          <p class="test-p">
            <span id="music">Moozik</span> is powerful. It can make people feel
            relaxed, raise their moods, spark creativity and so on. <br />
            <span id="punch">It's a universal aspect across cultures.</span>
          </p>
        </div>
      </div>
    </div>
  );
}
