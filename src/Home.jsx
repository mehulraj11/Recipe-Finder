import { useState } from "react";
import Tile from "./Tile";
import "./home.css";
export default function Home() {
  const [search, setSearch] = useState("");
  const [data, setData] = useState([]);
  const [recentSearches, setRecentSearches] = useState([]);
  const handleChange = (e) => {
    setSearch(e.target.value);
  };
  // fetching API
  const fetchApi = async (search) => {
    const response = await fetch(
      `https://forkify-api.herokuapp.com/api/search?q=${search}`
    );
    const data = await response.json();
    setData(data.recipes);
    // setting the size of recent searches upto 5, if exceeds pop
    setRecentSearches((prevState) => {
      const updatedSearches = [search, ...prevState];
      if (updatedSearches.length > 5) {
        updatedSearches.pop();
      }
      return updatedSearches;
    });

    console.log(data.recipes);
    setSearch("");
  };
  // rendering the tile component for handling each component specially
  const renderedData = data.map((item, index) => {
    return (
      <Tile
        key={index}
        img={item.image_url}
        publisher={item.publisher}
        publisher_url={item.publisher_url}
        rank={item.rank}
        title={item.title}
      />
    );
  });
  // handling recent searches functionality
  const handleRecentclick = (e) => {
    const value = e.target.innerText;
    setSearch(value);
    fetchApi(value);
  };
  // rendering recent search
  const recentSearch = recentSearches.map((item, index) => {
    return <p onClick={handleRecentclick}>{item}</p>;
  });
  return (
    <div className="home">
      <input type="text" value={search} onChange={handleChange} />
      <button onClick={() => fetchApi(search)}>Search</button>
      <div>{recentSearch}</div>
      {renderedData}
    </div>
  );
}
