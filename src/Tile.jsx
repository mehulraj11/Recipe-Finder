import { useState } from "react";
import "./tile.css";
export default function Tile({ publisher, publisher_url, rank, title, img }) {
  const [click, setClick] = useState(false);
  const handleTileClick = () => {
    setClick(!click);
  };
  return (
    <div className="tile" onClick={handleTileClick}>
      <img src={img} alt="" />
      <h3>{title}</h3>
      <p>{publisher}</p>
      <p>{publisher_url}</p>
      <p>{rank}</p>
      {click && <p>I am active</p>}
    </div>
  );
}
