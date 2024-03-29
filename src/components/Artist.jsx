import React from 'react';
import axios from 'axios';
import NotFound from './NotFound.jsx';

class Artist extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            artist: [],
            albums: []
        };
        this.getArtist = this.getArtist.bind(this);
        this.getAlbums = this.getAlbums.bind(this);
    }

    componentWillMount() {
       this.getArtist();
       this.getAlbums();
    }

    getArtist() {
        var self = this;
        axios
            .get(`/getArtist/` + this.props.params.idArtist)
            .then(res => {
                const artist = res.data;
                self.setState({ artist : artist});
            })
            .catch(err => console.log('artist error :' + err));
    }

    getAlbums() {
        var self = this;
        axios.get(`/getAlbums/` + this.props.params.idArtist)
             .then(res => self.setState({ albums : res.data.items}))
             .catch(err => console.log('albums error :' + err));
    }

    render() {
        if (!this.state.albums.length) {
            return (<NotFound text="artist"/>);
        }

        let listAlbums = this.state.albums.map(function(album, index){
            return (
                <div className='col-xs-12 col-sm-4 col-md-4 col-lg-3' key={index}>
                    <div className='thumbnail text-center'>
                        <a href={'/albums/' + album.id}>
                            <img
                                src={album.images ?
                                    album.images[1].url :
                                    'http://placehold.it/300x300'}
                                alt={album.name}
                            />
                        </a>
                        <div className='caption'>
                            <h4>{album.name}</h4>
                        </div>
                    </div>
                </div>
            );
        });

        return (
            <div className='container'>
                <ol className='breadcrumb'>
                    <li><a href='/'>Recherche</a></li>
                    <li className='active'>{ this.state.artist.name }</li>
                </ol>
                <div className='page-header'>
                    <h1>Albums</h1>
                    <h2>{ this.state.artist.name }</h2>
                </div>
                <div className='container albums'>
                    <div className='row'>
                       <ul>{ listAlbums }</ul>
                    </div>
                </div>
            </div>
        );
    }
}
export default Artist;