import React from 'react'
import axios from 'axios'
import Song from '../components/Song'
import "./Home.css"

const keys = require("../keys.json")

class Home extends React.Component {

  state = {
    isLoading: true,
    songs: []
  }

  getData = async () => {

    /*
    const {
      data: {
        data: {movies}
      }
    } = await axios.get("https://yts-proxy.now.sh/list_movies.json?sort_by=rating")
    */

    const { data: songs } = await axios.get(`${keys.middleware}/melon/24chart/10`)
    
    this.setState({songs, isLoading: false})

  }

  render(){
    const { isLoading, songs } = this.state
    return (
      <section className="container">
        {isLoading ? (
          <div className="loader">
            <span className="loader_text">Loading...</span>
          </div>
        ) : (
          <div className="wrap">
            <div className="songs">
              {songs.map((song, idx) => (
                <Song
                  key={idx}
                  artist={song.artist}
                  title={song.title}
                  img={song.img}
                  album={song.album}
                />
              ))}
            </div>
            <div className="videos">
              <object type="text/html" width="480" height="360" data="//www.youtube.com/embed/Yv91ZsXvZ9Y" allowFullScreen></object>
              <object type="text/html" width="480" height="360" data="//www.youtube.com/embed/tXN84bABfIQ" allowFullScreen></object>
              <object type="text/html" width="480" height="360" data="//www.youtube.com/embed/yPg6MQ6B-To" allowFullScreen></object>
            </div>
          </div>
            
        )}
      </section>
    )}

    componentDidMount(){
      this.getData()
    }



}

export default Home;
