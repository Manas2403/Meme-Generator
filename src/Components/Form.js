import html2canvas from "html2canvas";
import downloadjs from "downloadjs";
import React, { useCallback, useRef, useState } from "react";
import "../App.css";
import gallery from "../images/gallery.png";
import memes from "../memes";
export default function Form() {
  let inputFile = useRef(null);
  const [getMeme, setMeme] = useState({
    topText: "",
    bottomText: "",
    randomImg: "http://i.imgflip.com/1bij.jpg",
  });
  const [topText, setTopText] = useState("");
  const [bottomText, setBottomText] = useState("");
  const [selectedFile, setSelectedFile] = useState("");
  function getMemeImage() {
    setSelectedFile("");
    const memesArray = memes.data.memes;
    const randomNum = Math.floor(Math.random() * memesArray.length);
    const url = memesArray[randomNum].url;
    setMeme((prevMeme) => ({
      ...prevMeme,
      randomImg: url,
    }));
    console.log(getMeme);
  }
  const onImageClick = () => {
    inputFile.current.click();
  };
  function getLocalImage(event) {
    const img = event.target.files[0];
    setSelectedFile(URL.createObjectURL(img));
  }
  const exportAsImage = async () => {
    html2canvas(document.querySelector(".meme-container"), {
      allowTaint: true,
      useCORS: true,
    }).then(function (canvas) {
      var link = document.createElement("a");
      document.body.appendChild(link);
      link.download = "html_image.jpg";
      link.href = canvas.toDataURL();
      link.target = "_blank";
      link.click();
    });
  };
  return (
    <div className="form">
      <div className="input-fields">
        <input
          type="text"
          placeholder="Top Text"
          onChange={(e) => setTopText(e.target.value)}
        />
        <input
          type="text"
          placeholder="Bottom Text"
          onChange={(e) => setBottomText(e.target.value)}
        />
      </div>
      <div className="btn-container">
        <button className="btn" onClick={getMemeImage}>
          Get a new meme image <img src={gallery} alt="" className="btn-icon" />
        </button>
        <button className="btn" onClick={onImageClick}>
          <input
            type="file"
            name="file"
            ref={inputFile}
            onChange={getLocalImage}
            style={{ display: "none" }}
          />
          Load from device
        </button>
        <button className="btn" onClick={exportAsImage}>
          Save
        </button>
      </div>
      <div className="meme-container">
        <p className="top-text">{topText}</p>
        {<img src={selectedFile || getMeme.randomImg} alt="meme" />}
        <p className="bottom-text">{bottomText}</p>
      </div>
    </div>
  );
}
