import React, { Component } from 'react'
import Spotify from 'spotify-web-api-js'

const spotifyWebApi = new Spotify(); 

class Tracks extends Component {
    constructor(props) {
        super(props)

        this.state = {
            tracks: [],
            prevPlaylistId: "",
            selectedTrack: null
        }

    }

    renderTracks = async () => {
        if (this.state.prevPlaylistId == this.props.playlistId) return

        const tracks = []
        const temp = await spotifyWebApi.getPlaylistTracks(
                this.props.playlistId,
                {limit: 100}
            )

        for (var track of temp.items) {
            try {
                tracks.push({
                    name: track.track.name,
                    id: track.track.id,
                    image: track.track.album.images[2].url
                })
            } catch {}
        }

        this.setState({
            tracks,
            prevPlaylistId: this.props.playlistId
        })
    }

    async componentDidMount() {
        this.renderTracks()
    }

    async componentDidUpdate() {
        this.renderTracks()
    }

    setTrack = (trackId) => {
        this.props.callback(trackId)

    }

    render (){
        return(
            <>
                <div className ="container-fluid py-2">
                    <h3 className ="font-weight-light">
                        {this.props.playlistName}
                    </h3>
                    <div className ="d-flex flex-row flex-wrap ">
                        {this.state.tracks.map(track => 
                            <a key = {track.id} style = {{cursor: 'pointer'}} onClick = {() => this.setTrack(track.id)}>
                                <img src = {track.image}/>
                            </a>
                        )}
                    <h1>{this.state.selectedTrack}</h1>
                    </div>
                </div>
            </>
        )
    }
}

export default Tracks