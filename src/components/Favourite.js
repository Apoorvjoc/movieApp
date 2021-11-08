import React, { Component } from 'react'
export default class Favourite extends Component {
    constructor(){
        super();
        this.state={
            gen:[],
            currGen:"All Generes",
            movies:[],
            currText:'',
            limit:5,
            currpage:1
        }
    }
    componentDidMount(){
        let genreids = {28:'Action',12:'Adventure',16:'Animation',35:'Comedy',80:'Crime',99:'Documentary',18:'Drama',10751:'Family',14:'Fantasy',36:'History',
        27:'Horror',10402:'Music',9648:'Mystery',10749:'Romance',878:'Sci-Fi',10770:'TV',53:'Thriller',10752:'War',37:'Western'};
        let data = JSON.parse(localStorage.getItem('movies-app')||'[]');
        let temp = [];
        data.forEach((val)=>{
            //here we are checking for the value , if it is previously present then we are igoring it by not and if not present than we are putting it.
            if(!temp.includes(genreids[val.genre_ids[0]])){
                temp.push(genreids[val.genre_ids[0]])
            }
        })
        temp.unshift('All Generes')
        this.setState({
            gen:[...temp],
            movies:[...data]
        })
    }
    handleColor = (genre)=>{
        this.setState({
            currGen:genre
        })
    }
    sortPopularityDesc = ()=>{
        let temp = this.state.movies;
        temp.sort(function(objA,objB){
            return objB.popularity - objA.popularity;
        })
        this.setState({
            movies:[...temp]
        })
    }
    sortPopularityAsc = ()=>{
        let temp = this.state.movies;
        temp.sort(function(objA,objB){
            return objA.popularity - objB.popularity;
        })
        this.setState({
            movies:[...temp]
        })
    }
    sortRatingAsc = ()=>{
        let temp = this.state.movies;
        temp.sort(function(objA,objB){
            return objA.vote_average - objB.vote_average;
        })
        this.setState({
            movies:[...temp]
        })
    }
    sortRatingDesc = ()=>{
        let temp = this.state.movies;
        temp.sort(function(objA,objB){
            return objB.vote_average - objA.vote_average;
        })
        this.setState({
            movies:[...temp]
        })
    }
    handlePageChange = (page)=>{
        if(page<=1){
            this.setState({
                currpage:1
            })
        }
        else{
            this.setState({
                currpage:page
            })
        }
    }
    handleDelete = (id)=>{
        let narr= [];
        narr = this.state.movies.filter((movieObj)=>movieObj.id!=id);
        this.setState({
            movies:[...narr]
        })
        localStorage.setItem('movies-app',JSON.stringify(narr))
    }
    render(){
        // const movie = movies.results;
        let genreids = {28:'Action',12:'Adventure',16:'Animation',35:'Comedy',80:'Crime',99:'Documentary',18:'Drama',10751:'Family',14:'Fantasy',36:'History',
        27:'Horror',10402:'Music',9648:'Mystery',10749:'Romance',878:'Sci-Fi',10770:'TV',53:'Thriller',10752:'War',37:'Western'};   
        let filterArr = [];

        if(this.state.currText===""){
            filterArr=this.state.movies
        }else{
            filterArr = this.state.movies.filter((movieObj)=>{
                let title = movieObj.original_title.toLowerCase();
                return title.includes(this.state.currText.toLowerCase())
            })
        }

        // if(this.state.currGen == "All Generes"){
        //     filterArr = this.state.movies
        // }
        if(this.state.currGen != "All Generes"){
            filterArr = this.state.movies.filter((movieObj)=>{
                return genreids[movieObj.genre_ids[0]] == this.state.currGen
            })
        }
        let pages = Math.ceil(filterArr.length/this.state.limit);
        let pagesArr = [];

        for(let i = 1 ; i<=pages ; i++){
            pagesArr.push(i);
        }
        let startIdx = (this.state.currpage - 1)*this.state.limit;
        let ei = startIdx +this.state.limit;
        filterArr = filterArr.slice(startIdx , ei)
        return (
            <div>
                <>
                    <div className="main">
                        <div className="row">
                            <div className="col-lg-3 col-sm-12">
                                <ul className="list-group favourite-genres">
                                    {/* <li className="list-group-item" style={{backgroundColor:'#3f51b5' , color:"white" , fontWeight:'bold'}}>All Genres</li> */}
                                   {
                                    this.state.gen.map((val)=>(
                                        this.state.currGen == val?
                                        <li className="list-group-item" style={{backgroundColor:'#3f51b5' , color:"white" , fontWeight:'bold'}}>{val}</li>:
                                        <li className="list-group-item" style={{color:'#3f51b5' , fontWeight:'bold'}} onClick={()=>this.handleColor(val)}>{val}</li>
                                    ))
                                   }
                                </ul>
                            </div>
                            <div className="col-lg-9 favourites-table col-sm-12">
                                <div className="row">
                                    <input type='text' className="input-group-text col" placeholder="search" value={this.state.currText} onChange={(e)=>this.setState({currText:e.target.value})}/>
                                    <input type='number' className="input-group-text col" placeholder="rows count" value={this.state.limit} onChange={(e)=>this.setState({limit:e.target.value})}/>
                                </div>
                                <div className="row">
                                <table className="table">
                                    <thead>
                                    <tr>
                                        <th scope="col">Title</th>
                                        <th scope="col">Genre</th>
                                        <th scope="col"><i class="fas fa-sort-up" onClick={this.sortPopularityDesc}></i>Popularity<i class="fas fa-sort-down"  onClick={this.sortPopularityAsc}></i></th>
                                        <th scope="col"><i class="fas fa-sort-up"  onClick={this.sortRatingDesc}></i>Rating<i class="fas fa-sort-down" onClick={this.sortRatingAsc}></i></th>
                                        <th scope="col"></th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            filterArr.map((val)=>(
                                                <tr>
                                                    <td><img src={`https://image.tmdb.org/t/p/original${val.backdrop_path}`} alt={val.original_title} style={{width:"7rem"}} />{val.original_title}</td>
                                                    <td>{genreids[val.genre_ids[0]]}</td>
                                                    <td>{val.popularity}</td>
                                                    <td>{val.vote_average}</td>
                                                    <td><button type="button" className="btn btn-danger" onClick={()=>this.handleDelete(val.id)}>Delete</button></td>
                                                </tr>
                                            ))
                                        }
                                    </tbody>
                                    </table>
                                </div>
                                <nav aria-label="Page navigation example">
                                    <ul className="pagination">
                                        {
                                            pagesArr.map((page)=>(
                                                <li className="page-item"><a className="page-link" onClick={()=>this.handlePageChange(page)}>{page}</a></li>
                                            ))
                                        }
                                    </ul>
                                </nav>
                            </div>
                        </div>
                    </div>
                </>
            </div>
        )
    }
}
