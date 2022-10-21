import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { img_300, unavailable } from "../../api/config/DefaultImages";
import "./SinglePage.css";
import YouTubeIcon from "@mui/icons-material/YouTube";

const SinglePage = () => {
  const [content, setContent] = useState();
  const { id, mediaType } = useParams();

  const fetchData = async () => {
    try {
      const { data } = await axios.get(` 
      https://api.themoviedb.org/3/${mediaType}/${id}?api_key=${process.env.REACT_APP_API_KEY}&page=1`);
      setContent(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
    
  }, [id, setContent]);
  return (
        <>
          <div>
            {content && (
              <div
                className="open__modal"
                style={{
                  backgroundImage: `url( https://www.themoviedb.org/t/p/w1920_and_h800_multi_faces/${content.backdrop_path})`,
                }}
              >
                <img
                  className="poster__img"
                  src={
                    `${content.poster_path}`
                      ? `${img_300}/${content.poster_path}`
                      : unavailable
                  }
                  alt=""
                />
                <div className="open__detailsPage">
                  <h3>{content.original_title || content.name}</h3>
                  <h5
                    style={{
                      display: "flex",
                      fontSize: "12px",
                    }}
                    className="genreList"
                  >
                    {content.genres.map((n, i) => {
                      return (
                        <p
                          key={n.id}
                          style={{ fontSize: "13px", marginLeft: "6px" }}
                          className="mygenre"
                        >
                          {i > 0 && ", "}
                          {n.name}
                        </p>
                      );
                    })}
                  </h5>

                  <div className="overview">
                    <p>{content.overview}</p>
                      <b className="tmdb">TMDB</b>
                      <b className="vote_ave">-⭐{content.vote_average}-/10 </b>
                  </div>
                  <div className="videopage">    
{/* BUTTON  UNTUK WATCH TRAILER  */}
                  <div className="wrapper">
                    <div className="image play_trailer" data-title="Arrival">
                      <div
                        className="btn btn-success px-4"
                        data-toggle="modal"
                      >
                        <span>
                          <YouTubeIcon style={{ color: "#e93d3d" }} />
                        </span>{" "}
                        Nonton Trailer
                      </div>
                    </div>
                  </div>           
                  </div>
                </div>
              </div>
            )}
          </div>
        </>
  );
};

export default SinglePage;
