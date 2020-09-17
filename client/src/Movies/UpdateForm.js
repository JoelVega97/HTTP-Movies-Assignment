import React, { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import axios from "axios";

const initialMovie = {
  id: "",
  title: "",
  director: "",
  metascore: "",
  stars: [],
};

export default function UpdateForm(props) {
  const history = useHistory();
  const { id } = useParams();
  const [movie, setMovie] = useState(initialMovie);

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/movies/${id}`)
      .then((res) => setMovie(res.data))
      .catch((err) => console.log(err));
  }, [id]);

  const change = (evt) => {
    evt.persist();
    let value = evt.target.value;
    let name = evt.target.name;

    setMovie({ ...movie, [name]: value });
  };

  const submit = (evt) => {
    evt.preventDefault();
    axios
      .put(`http://localhost:5000/api/movies/${id}`, movie)
      .then((res) => {
        console.log(res);
        history.push(`/movies/${id}`);
        const newMovieList = props.movieList.map((upMovie) => {
          if (upMovie.id === movie.id) {
            return {
              ...props.movieList,
              upMovie,
            };
          } else {
            return props.movieList;
          }
        });
        props.setMovieList(newMovieList);
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="update-form">
      <h3>Update Movie</h3>
      <form onSubmit={submit}>
        <label>
          Title:
          <input
            onChange={change}
            name="title"
            placeholder="Title"
            value={movie.title}
            type="text"
          />
        </label>
        <label>
          Director :
          <input
            onChange={change}
            name="director"
            placeholder="Director"
            value={movie.director}
            type="text"
          />
        </label>
        <label>
          Metascore:
          <input
            onChange={change}
            name="metascore"
            placeholder="Metascore"
            value={movie.metascore}
            type="text"
          />
        </label>
        <button>Update</button>
      </form>
    </div>
  );
}

//onClick={() => )
