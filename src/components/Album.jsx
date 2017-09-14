import React from 'react';
import axios from 'axios';
import NotFound from './NotFound.jsx';


class Album extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            artist: [],
            album: [],
            tracks: []
        };
        this.getAlbum = this.getAlbum.bind(this);
    }

    componentWillMount() {
        this.getAlbum();
    }

    convertTime(time) {
        let n = Math.round((time / 3600) % 60);
        n = n > 9 ? n : "0" + n;
        const newTime = {
                            min: Math.round((time / 3600) / 60),
                            sec: n
                        };
        return (newTime);
    }

    getAlbum() {
        let self = this;
        axios
            .get(`/getAlbum/` + this.props.params.idAlbum)
            .then(res => self.setState({
                album : res.data,
                artist : res.data.artists[0],
                tracks: res.data.tracks.items
            }))
            .catch(err => console.log('album error :' + err));
    }

    render() {
        if (!this.state.tracks.length) {
            return (<NotFound text="Album"/>);
        }
        let self = this;
       let listTracks = this.state.tracks.map(function(track, index){
           let time = self.convertTime(track.duration_ms);
           return (
               <li className='list-group-item' key={index}>{index + 1}. {track.name} <span className='badge'>{time.min} : {time.sec}</span></li>
            );}
        );
        return (
            <div className='container'>
                <ol className='breadcrumb'>
                    <li><a href='/'>Recherche</a></li>
                    <li><a href={ '/artist/' + this.state.artist.id }>{ this.state.artist.name }</a></li>
                    <li className='active'>{ this.state.album.name }</li>
                </ol>
                <div className='page-header'>
                    <h1>Pistes</h1>
                    <h2>{ this.state.artist.name } - { this.state.album.name }</h2>
                </div>
                <div className='row'>
                    <div className='col-xs-12 col-md-6 col-lg-6'>
                        <img
                            src={ this.state.album.images
                                ? this.state.album.images[1].url
                                :'http://placehold.it/640x640'}
                            className='thumbnail img-responsive'
                            alt={ this.state.album.name }
                        />
                    </div>
                    <div className='col-xs-12 col-md-6 col-lg-6'>
                        <ul className='list-group'>
                            {listTracks}
                        </ul>
                    </div>
                </div>
            </div>
        );
    }
}
export default Album;