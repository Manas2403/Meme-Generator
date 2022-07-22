import React from "react";
import troll from "../images/troll.png";
import "../App.css";
export default function Header() {
  return (
    <nav>
      <img src={troll} alt="troll-face" />
      <p>Meme Generator</p>
    </nav>
  );
}
