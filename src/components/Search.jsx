import React from 'react';
import axios from 'axios';
import RenderArtist from './RenderArtists.jsx';

class Search extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            artists: [],
            search: '',
            currentPage: 1,
            requestDone: false
        };
        this.handleChange = this.handleChange.bind(this);
        this.handlePageClick = this.handlePageClick.bind(this);
        this.handlePrevious = this.handlePrevious.bind(this);
        this.handleNext = this.handleNext.bind(this);
    }

    componentDidMount() {
        this.setState({
            requestDone: false
        });
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
                self.setState({
                    artists:artists,
                    requestDone:true,
                    currentPage:1
                });
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
                            </form>
                        </div>
                    </div>
                </div>
                { this.state.requestDone &&
                <RenderArtist currentPage={currentPage}
                              artists={artists}
                              search={this.state.search}/> }
                <div className='container text-center'>
                    <nav aria-label='Page navigation'>
                        <ul className='pagination'>
                            {currentPage > 1 ?
                                <li>
                                    <a href='#' onClick={this.handlePrevious} aria-label='Previous'>
                                        <span aria-hidden='true'>&laquo;</span>
                                    </a>
                                </li>
                            : ''}
                            {renderPages}
                            {currentPage < pageNumbers.length ?
                                  <li>
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