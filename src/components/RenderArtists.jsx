import React from 'react';
import NotFound from './NotFound.jsx';

class RenderArtists extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {

        let {currentPage, artists} = this.props;

        let lastIndex = currentPage * 10;
        let firstIndex = lastIndex - 10;
        firstIndex = firstIndex < 0 ? 0 : firstIndex;

        let currentArtists = artists.slice(firstIndex, lastIndex);

        return (
            <div className='container artists'>
                { !currentArtists[0] && (this.props.search.length > 1) ?
                    <NotFound text="Artist"/> : currentArtists.map(function(element,index){
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
        )
    }
}

export default RenderArtists;