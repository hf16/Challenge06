import axios from "axios";
import { useEffect, useState } from "react";
import SingleData from "../../components/SingleData/SingleData";
import "./Home.css";
import Navbar from "../../components/HomeNav/HomeNav";
import LocalSearch from "../../components/Search/LocalSearch";


const Home = () => {
  const [treadingContent, setTreadingContent] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

 //===
 const fetchMovieApi = async () => {
  try {
    const { data } = await axios.get(
      `https://api.themoviedb.org/3/discover/movie?api_key=${process.env.REACT_APP_API_KEY}&page=1&language=en-US&sort_by=popularity.desc`
    );
    setIsLoading(true);
    //===
    const alldata = data.results;
    const filter = alldata.slice(0, 14);
    setTreadingContent(filter)
  } catch (error) {
    console.log(error);
  }
};

const fetchSearchApi = async () => {
  if (searchTerm) {
    const SEARCH_API = `https://api.themoviedb.org/3/search/movie?api_key=${process.env.REACT_APP_API_KEY}&query=${searchTerm}&page=1&sort_by=popularity.desc&page=2`;
    const { data } = await axios.get(SEARCH_API);
    setTreadingContent(data.results);
    setIsLoading(true);
  }
};
  useEffect(() => {
    if (searchTerm) {
      fetchSearchApi();
    } else {
      fetchMovieApi();
    }
   
    return () => {
      setTreadingContent();
    };
  }, []);

  return (
    <>
    <div style={{ marginTop: "-10px" }} >
      <Navbar />
    </div>
      {/* <main className="all__movies">     */}
      <main className="TreadingHome ">
        <div className="my__main">
          <div className="btn__pupuler">
            <h6>
              Populer Movies 
            </h6>
          </div>
          

{/* Button Search */}
          <LocalSearch
            setSearchTerm={setSearchTerm}
            searchTerm={searchTerm}
            fetchSearchApi={fetchSearchApi}
            setIsLoading={setIsLoading}
            media="movies"
            placehold="Search Movies"
            isLoading={isLoading}
            treadingContent={treadingContent}
          />
          <p>See All Movie</p>
        </div>

        <div className="ListContent">
          {
            treadingContent.map((r) => (
              <SingleData key={r.id} {...r} mediaType="movie" />
            ))
         }
        </div>
      </main>      
    </>
  );
};

export default Home;
