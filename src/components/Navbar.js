import React, { Component } from 'react'
import { Link } from 'react-router-dom'
export default class Navbar extends Component {
    render() {
        return (
            <div style={{display:'flex'}}>
                <Link to="/" style={{textDecoration:"none"}}><h1>Movies App</h1></Link>
                <Link to="/favourite" style={{textDecoration:"none"}}><h3 style={{marginTop:'0.5rem' , marginLeft:"2rem"}}>Favourite</h3></Link>
            </div>
        )
    }
}
