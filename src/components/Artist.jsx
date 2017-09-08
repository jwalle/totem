import React from 'react';
import axios from 'axios';

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
      //  this.getArtist();
    }

    getArtist() {
        axios
            .get(`/getArtist`)
            .then(res => {
                const artist = res.data;
                this.setState({ artist : artist});
            })
            .catch(err => console.log('artist error :' + err));
    }

    getAlbums() {
    axios
        .get(`/getAlbums/` + this.state.artist.id)
        // .then(res => this.setState({ albums : res.data}))
        .then(res => console.log(res))
        // .then(res => console.log(artistID))
        .catch(err => console.log('albums error :' + err + artist));
}

    // listAlbums = this.state.albums.map((albums) =>
    // <div className='col-xs-12 col-sm-4 col-md-4 col-lg-3'>
    //     <div className='thumbnail text-center'>
    //         <a href='#'>
    //             <img src={'http://placehold.it/300x300'} alt={ 'Album name' } />
    //         </a>
    //         <div className='caption'>
    //             <h4>{ 'Album name' }</h4>
    //         </div>
    //     </div>
    // </div>
// );

    render() {
        return (
            <div className='container'>
                <ol className='breadcrumb'>
                    <li><a href='/'>Recherche</a></li>
                    <li className='active'>{ this.state.artist.id }</li>
                </ol>
                <div className='page-header'>
                    <h1>Albums</h1>
                    <h2>{ this.state.artist.name }</h2>
                </div>
                <div className='container albums'>
                    <div className='row'>
                       <ul>{ this.listAlbums }</ul>
                    </div>
                </div>
            </div>
        );
    }
}
export default Artist;