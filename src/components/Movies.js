import React, { Component } from 'react';
// import {movies} from './getMovies';
import axios from 'axios';
 
export default class Movies extends Component {
    constructor(){
        super();
        this.state={
            hover:'',
            parr:[1],
            currPage:1,
            movies:[],
            fav:[]//ids of fav movies
        }
    }
    changeMovies=async()=>{
        const res = await axios.get(`https://api.themoviedb.org/3/movie/popular?api_key=5540e483a20e0b20354dabc2d66a31c9&language=en-US&page=${this.state.currPage}`);
        let data = res.data
        this.setState({
            movies:[...data.results]
        })
    }
    handleNext = ()=>{
        let tempArr = [];
        for(var i = 1 ; i<=this.state.parr.length+1 ; i++){
            tempArr[i] = i;
        }
        this.setState({
            parr : [...tempArr],
            currPage:this.state.currPage+1
        } , this.changeMovies)
        // this.changeMovies();
    }
    handlePrev= ()=>{
        if(this.state.currPage!=1){
            this.setState({
                currPage:this.state.currPage-1
            } , this.changeMovies)
        }
    }
    handleBtnNum = (val)=>{
        if(val!=this.currPage){
            this.setState({
                currPage:val
            } , this.changeMovies)
        }
    }
    handleFavourites = (movie)=>{
        let oldData = JSON.parse(localStorage.getItem('movies-app') || '[]');
        if(this.state.fav.includes(movie.id)){//already added now you have to delete it
            oldData = oldData.filter((m)=>{
                return movie.id != m.id
            })
        }else{//you have to add
            oldData.push(movie)
        }
        localStorage.setItem('movies-app' ,JSON.stringify(oldData));
        this.handleFavouritesState();
        console.log(oldData);
    }
    handleFavouritesState = ()=>{
        let oldData = JSON.parse(localStorage.getItem('movies-app') || '[]');
        let temp = oldData.map((movie)=>movie.id);
        this.setState({
            fav:[...temp]
        })
    }
    async componentDidMount(){
        const res = await axios.get(`https://api.themoviedb.org/3/movie/popular?api_key=5540e483a20e0b20354dabc2d66a31c9&language=en-US&page=${this.state.currPage}`);
        let data = res.data
        this.setState({
            movies:[...data.results]
        })
    }
    render() {
        // let movie = movies.results;
        return (
            <>
                {
                   this.state.movies.length == 0 ?
                    <div className="spinner-border text-warning" role="status">
                        <span class="visually-hidden">Loading...</span>
                    </div>:
                    <div>
                        <h3 className="text-center"><strong>Trending</strong></h3>
                        <div className="movies-list">
                         {   
                            this.state.movies.map((val)=>(
                                <div className="card movies-card" onMouseEnter={()=>this.setState({hover:val.id})} onMouseLeave={()=>this.setState({hover:''})}>
                                    <img src={`https://image.tmdb.org/t/p/original${val.backdrop_path}`} className="card-img-top movies-img" alt="..." />
                                    {/* <div className="card-body"> */}
                                        <h5 className="card-title movies-title">{val.original_title}</h5>
                                        {/* <p className="card-text movies-text">{val.overview}</p> */}
                                        <div className="button-wrapper">
                                           { 
                                           this.state.hover == val.id && <a className="btn btn-primary movies-btn" onClick={()=>this.handleFavourites(val)}>
                                               {this.state.fav.includes(val.id)?"Remove from Favourite":"Add to Favourite"}</a>//if movie already exists(val.id) then button should show remove otherwise remove
                                           }
                                        </div>    
                                    {/* </div> */}
                                </div>
                            ))
                        }
                        </div>
                        <div style={{display:'flex' , justifyContent:'center'}}>
                        <nav aria-label="Page navigation example">
                                <ul class="pagination">
                                <li class="page-item"><a class="page-link" onClick={this.handlePrev}>Previous</a></li>
                                    {
                                        this.state.parr.map((value)=>(
                                            <li className="page-item"><a class="page-link" onClick={()=>this.handleBtnNum(value)}>{value}</a></li>
                                        ))
                                    }
                                <li class="page-item"><a class="page-link" onClick={this.handleNext}>Next</a></li>
                                </ul>
                        </nav>
                        </div>
                    </div>
                }
            </>
        )
    }
}
