import React from 'react';
// import SearchArtists from './FetchArtists.jsx';
import axios from 'axios';

class Search extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            post: []
        };
    }

    // componentWillMount() {
    //     let myID = '09f12c7365f84dcd886d04fdb5b1c590';
    //     let myCallback = 'http://localhost:3000/callback';
    //     console.log('coucou1');
    //
    //     // let url = "http://www.reddit.com/r/nodejs.json";
    //     let url = "https://api.spotify.com/v1/search?q=tania%20bowra&type=artist";
    //     // let url = 'http://www.omdbapi.com?s=star&y=&r=json&plot=short';
    //     axios.get(url).then(res => {
    //             this.setState({
    //                 post : res
    //                 // total : data.body.totalResults
    //             });
    //         });
    // }

    render() {
        // console.log(this.state.post);
        return (
        <div>
                <div className='container'>
                    <div className='page-header'>
                        {/*<h1>Artistes</h1>*/}
                        {/*<h1>{`/r/${this.state.post}`}</h1>*/}
                    </div>
                    <div className='panel panel-default'>
                        <div className='panel-heading'>Rechercher un artiste Spotify</div>
                        <div className='panel-body'>
                            <form className='form-inline'>
                                <div className='form-group'>
                                    <input type='search' className='form-control' placeholder='Mot(s)-clé(s)'/>
                                </div>
                                <button type='submit' className='btn btn-primary'>Chercher</button>
                            </form>
                        </div>
                    </div>
                </div>

                <div className='container artists'>
                    <div className='media'>
                        <div className='media-left'>
                            <a href='#'>
                                <img className='media-object' src='http://placehold.it/64x64' alt='*'/>
                            </a>
                        </div>
                        <div className='media-body'>
                            <h4 className='media-heading'>Artist name</h4>
                            Artist genres
                        </div>
                    </div>
                    <div className='media'>
                        <div className='media-left'>
                            <a href='#'>
                                <img className='media-object' src='http://placehold.it/64x64' alt='*'/>
                            </a>
                        </div>
                        <div className='media-body'>
                            <h4 className='media-heading'>Artist name</h4>
                            Artist genres
                        </div>
                    </div>
                    <div className='media'>
                        <div className='media-left'>
                            <a href='#'>
                                <img className='media-object' src='http://placehold.it/64x64' alt='*'/>
                            </a>
                        </div>
                        <div className='media-body'>
                            <h4 className='media-heading'>Artist name</h4>
                            Artist genres
                        </div>
                    </div>
                </div>
                <div className='container text-center'>
                    <nav aria-label='Page navigation'>
                        <ul className='pagination'>
                            <li>
                                <a href='#' aria-label='Previous'>
                                    <span aria-hidden='true'>&laquo;</span>
                                </a>
                            </li>
                            <li><a href='#'>1</a></li>
                            <li><a href='#'>2</a></li>
                            <li><a href='#'>3</a></li>
                            <li><a href='#'>4</a></li>
                            <li><a href='#'>5</a></li>
                            <li>
                                <a href='#' aria-label='Next'>
                                    <span aria-hidden='true'>&raquo;</span>
                                </a>
                            </li>
                        </ul>
                    </nav>
                </div>
            </div>
        );
    }
}
export default Search;