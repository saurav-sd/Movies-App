import React, { Component } from "react";
// import { movies } from "./GetMovies";
import axios from "axios";

export default class Movies extends Component {
    constructor() {
        super();
    this.state = {
        hover: '',
        parr: [1],
        currentPage: 1,
        movies: [],
        favourites:[],
    };
    }
    async componentDidMount() {
        //side effects
        const res = await axios(`https://api.themoviedb.org/3/movie/popular?api_key=78330cfbc8ec15e6c159a8657b908ae5&language=en-US&page=${this.state.currentPage}`);
        let data = res.data;
        //console.log(data);
        this.setState({
            movies:[...data.results]
        })
        console.log('mounting done')
    }

    changeMovies = async () => {
        console.log("change movie called");
        console.log(this.state.currentPage);
        const res = await axios(`https://api.themoviedb.org/3/movie/popular?api_key=78330cfbc8ec15e6c159a8657b908ae5&language=en-US&page=${this.state.currentPage}`);
        let data = res.data;
        this.setState({
            movies:[...data.results]
        })
    }
    
    handleNext = () => {
        let temparr = []
        for (let i = 1; i <= this.state.parr.length + 1; i++){
            temparr.push(i);
        }
        this.setState({
            parr: [...temparr],
            currentPage:this.state.currentPage + 1
        },this.changeMovies)
    }

    handlePrevious = () => {
        if (this.state.currentPage !== 1) {
            this.setState({
                currentPage: this.state.currentPage - 1
            }, this.changeMovies)
        }
    }

    handlePageClick = (value) => {
        if (value !== this.state.currentPage) {
            this.setState({
                currentPage:value
            },this.changeMovies)
        }
  }
  
  handleFavourites=(movie)=>{
    let oldData = JSON.parse(localStorage.getItem("movies-app") || "[]")
    if(this.state.favourites.includes(movie.id)){
        oldData = oldData.filter((m)=>m.id!==movie.id)
    }else{
        oldData.push(movie)
    }
    localStorage.setItem("movies-app",JSON.stringify(oldData));
    console.log(oldData);
    this.handleFavouritesState();
}

handleFavouritesState=()=>{
  let oldData = JSON.parse(localStorage.getItem("movies-app") || "[]")
  let temp = oldData.map((movie)=>movie.id);
  this.setState({
      favourites:[...temp]
  })
}

  render() {
    //let movie = movies.results;
      console.log('render');
    return (
      <>
        {this.state.movies.length == 0 ? (
          <div class="spinner-border text-primary" role="status">
            <span class="visually-hidden">Loading...</span>
          </div>
        ) : (
          <>
            <h1 className="text-center">
              <strong>Trending</strong>
            </h1>
            <div className="movies-list">
              {this.state.movies.map((movieObj) => (
                <div
                  class="card movies-card"
                      onMouseEnter={() => this.setState({ hover: movieObj.id })}
                      onMouseLeave={()=>this.setState({hover:''})}
                >
                  <img
                    src={`https://image.tmdb.org/t/p/original${movieObj.backdrop_path}`}
                    style={{ height: "40vh" }}
                    class="card-img-top movies-img"
                    alt={movieObj.title}
                  />
                
                    <h5 class="card-title movies-title">
                      {movieObj.original_title}
                    </h5>
                    {/* <p class="card-text movies-text">{movieObj.overview}</p> */}
                    <div
                      className="button-wrapper"
                      style={{
                        display: "flex",
                        width: "100%",
                        justifyContent: "center",
                      }}
                    >
                      {this.state.hover === movieObj.id && 
                        <a className="btn btn-primary movies-button" onClick={()=>this.handleFavourites(movieObj)}>
                          {this.state.favourites.includes(movieObj.id)?'Remove from favourites':'Add to favourites'}
                        </a>
                      }
                    </div>
                  </div>
              ))}
              <div>
                <nav aria-label="Page navigation example">
                                    <ul class="pagination">
                                        <li class="page-item"><a class="page-link" onClick={this.handlePrevious}>Previous</a></li>
                                        {this.state.parr.map((value) => (
                                            <li class="page-item"><a class="page-link" onClick={()=>this.handlePageClick(value)}>{value}</a></li>
                        
                    ))}
                    
                    <li class="page-item">
                      <a class="page-link" onClick={this.handleNext}>
                        Next
                      </a>
                    </li>
                  </ul>
                </nav>
              </div>
            </div>
          </>
        )}
      </>
    );
  }
}
