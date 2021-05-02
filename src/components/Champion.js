import React from "react"
import PropTypes from "prop-types"
import "./Champion.css"
import keys from "../keys.json"

function Champion({ number, id, name, image, clickHandler }) {
    return (
        <div className="champion" number={number}>
            <img src={`${keys.riotCdn}/img/champion/${image}`} alt={image} title={id} onClick={clickHandler}/>
            <p className="champion_name">{name}</p>
        </div>
    )
}

Champion.propTypes = {
    number: PropTypes.number.isRequired,
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired
}

export default Champion