import React from 'react';
import axios from 'axios';

class Search extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            artists: [],
            search: '',
            currentPage: 1
        };
        this.handleChange = this.handleChange.bind(this);
        this.handlePageClick = this.handlePageClick.bind(this);
        this.handlePrevious = this.handlePrevious.bind(this);
        this.handleNext = this.handleNext.bind(this);
    }

    handlePrevious() {
        this.setState({ currentPage : this.state.currentPage - 1 })
    }

    handlePageClick(e) {
        this.setState({ currentPage : Number(e.target.id) });
    }

    handleNext() {
        this.setState({ currentPage : this.state.currentPage + 1 })
    }

    handleChange(e) {
        const search = e.target.value;
        this.setState({search : search});
        if (!search) {
            this.setState({artists: []});
            return ;
        }
        let self = this;
        axios({
            method: 'get',
            url: '/search/?q=' + search,
            responseType: 'json'
        })
            .then(response => {
                const artists = response.data.artists.items;
                self.setState({artists:artists});
            })
            .catch(err => console.log('search error :' + err));
    };


    render() {
        let {currentPage, artists} = this.state;
        let pageNumbers = [];
        for (let i = 1; i <= Math.ceil(artists.length / 10); i++) {
            pageNumbers.push(i);
        }

        let renderPages = pageNumbers.map (n => {
            return (
                <li key={n}
                ><a
                    id={n}
                    onClick={this.handlePageClick}
                    href='#'>{n}</a></li>
            )
        });

        let lastIndex = currentPage * 10;
        let firstIndex = lastIndex - 10;
        firstIndex = firstIndex < 0 ? 0 : firstIndex;

        let currentArtists = artists.slice(firstIndex, lastIndex);

        return (
        <div>
                <div className='container'>
                    <div className='page-header'>
                        <h1>Artistes</h1>
                    </div>
                    <div className='panel panel-default'>
                        <div className='panel-heading'>Rechercher un artiste Spotify</div>
                        <div className='panel-body'>
                            <form className='form-inline'>
                                <div className='form-group'>
                                    <input
                                        type='search'
                                        className='form-control'
                                        placeholder='Mot(s)-clé(s)'
                                        onChange={this.handleChange}
                                        value={this.state.search}
                                    />
                                </div>
                                <button type='submit' className='btn btn-primary'>Chercher</button>
                            </form>
                        </div>
                    </div>
                </div>

                <div className='container artists'>
                    { !currentArtists[0] && (this.state.search.length > 1) ?
                        <h1>Desole, pas d'artiste avec ce nom.</h1>
                        : currentArtists.map(function(element,index){
                            return (
                            <div className='media col-sm-6' key={index}>
                                <div className='media-left'>
                                    <a href={'/artist/' + element.id}>
                                        <img
                                            className='media-object'
                                            src={element.images[2] ? element.images[2].url : 'http://placehold.it/64x64'}
                                            alt='*'
                                            height="64"
                                            width="64"/>
                                    </a>
                                </div>
                                <div className='media-body'>
                                    <h4 className='media-heading'>{element.name}</h4>
                                    {element.genres[0]}
                                </div>
                            </div>
                        );
                    })}
                </div>
                <div className='container text-center'>
                    <nav aria-label='Page navigation'>
                        <ul className='pagination'>
                            {currentPage > 1 ?
                                <li key={1}>
                                    <a href='#' onClick={this.handlePrevious} aria-label='Previous'>
                                        <span aria-hidden='true'>&laquo;</span>
                                    </a>
                                </li>
                            : ''}
                            {renderPages}
                            {currentPage < pageNumbers.length ?
                                  <li key={1}>
                                     <a href='#' onClick={this.handleNext} aria-label='Next'>
                                         <span aria-hidden='true'>&raquo;</span>
                                     </a>
                                  </li>
                            : ''}
                        </ul>
                    </nav>
                </div>
            </div>
        );
    }
}
export default Search;