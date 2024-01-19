import React, { Component } from "react";
import { movies } from "./GetMovies";

export default class Banner extends Component {
  render() {
    //console.log(movies);
    let movie = movies.results[0];
    return (
      <>
        {
        movie === ''?
        <div class="spinner-border text-primary" role="status">
          <span class="visually-hidden">Loading...</span>
        </div>
        :
        <div class="card banner-card">
          <img src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`} class="card-img-top banner-img" alt={movie.title} />
          <div class="card-body">
                <h1 class="card-title banner-title">{movie.original_title}</h1>
            <p class="card-text banner-text">
                  {movie.overview}
            </p>
            {/* <a href="#" class="btn btn-primary">
              Go somewhere
            </a> */}
          </div>
        </div>
        }
      </>
    );
  }
}
