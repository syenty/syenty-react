import React from "react"
import PropTypes from "prop-types"
import "./Song.css"

function Song({ artist, title, img, album }){
    return (
        <div className="song">
            <div className="song_img">
                <img src={img} alt={album} title={album} />
            </div>
            <div className="song_info">
                <div className="song_artist">{artist}</div>
                <div className="song_title">{title}</div>
            </div>
            <div className="song_album">{album}</div>
        </div>
    )
}

Song.propTypes = {
    artist: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    img: PropTypes.string.isRequired,
    album: PropTypes.string.isRequired,
}

export default Song