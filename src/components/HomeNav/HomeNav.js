import "./HomeNav.css";
import React, { useEffect, useState } from "react";
import AliceCarousel from "react-alice-carousel";
import "react-alice-carousel/lib/alice-carousel.css";
import axios from "axios";

const HomeNav = () => {
  const [allContent, setAllContent] = useState([]);

  const fetchPopularMovieApi = async () => {
    try {
      const { data } = await axios.get(
        `https://api.themoviedb.org/3/trending/all/day?api_key=${process.env.REACT_APP_API_KEY}`
      );

      const alldata = data.results;
// Jumlah variasi slide yang ditampilkan sebanyak 3 movie
      const filter = alldata.slice(0, 3);
      const red = filter.reverse();

      setAllContent(red);
    } catch (error) {
      console.error(error);
    }
  };

  const items = allContent.map((item) => (
    <div
      key={item.id}
      className="main__nav"
      style={{
        backgroundImage: `url( https://www.themoviedb.org/t/p/w1920_and_h800_multi_faces/${item.backdrop_path})`,
      }}
    >
      <div className="nav">
        <h3>{item.title || item.name}</h3>
        <p>{item.overview}</p>
        <p></p>
        <div className="back__btn">
          <button onClick={""}>
            NONTON TRAILER
          </button>
        </div>
      </div>
    </div>
  ));


  useEffect(() => {
    fetchPopularMovieApi();
  }, []);

  return (
//Menampilkan carousel autoplay slide halaman 2 detik
    <AliceCarousel
      infinite
      autoPlay
      disableButtonsControls
      mouseTracking
      autoPlayInterval={2000}
      items={items}
    />
  );
};

export default HomeNav;
