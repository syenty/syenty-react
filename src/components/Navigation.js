import React from "react"
import { Link } from "react-router-dom"
import "./Navigation.css"

function Navigation(){
    return (
        <div className="nav">
            <Link to="/" replace >Home</Link>
            {/* <Link to="/about" replace >About</Link> */}
            <Link to="/search" replace >Search</Link>
            {/* <Link to="/test" replace >Test</Link> */}
            <Link to="/lotto" replace >Lotto</Link>
        </div>
    )
}

export default Navigation