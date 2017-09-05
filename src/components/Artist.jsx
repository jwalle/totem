import React from 'react';

class Artist extends React.Component {
    render() {
        return (
            <div className='container'>
                <ol className='breadcrumb'>
                    <li><a href='/'>Recherche</a></li>
                    <li className='active'>{ 'Artist' }</li>
                </ol>
                <div className='page-header'>
                    <h1>Albums</h1>
                    <h2>{ 'Artist' }</h2>
                </div>
                <div className='container albums'>
                    <div className='row'>
                        <div className='col-xs-12 col-sm-4 col-md-4 col-lg-3'>
                            <div className='thumbnail text-center'>
                                <a href='#'>
                                    <img src={'http://placehold.it/300x300'} alt={ 'Album name' } />
                                </a>
                                <div className='caption'>
                                    <h4>{ 'Album name' }</h4>
                                </div>
                            </div>
                        </div>
                        <div className='col-xs-12 col-sm-4 col-md-4 col-lg-3'>
                            <div className='thumbnail text-center'>
                                <a href='#'>
                                    <img src={'http://placehold.it/300x300'} alt={ 'Album name' } />
                                </a>
                                <div className='caption'>
                                    <h4>{ 'Album name' }</h4>
                                </div>
                            </div>
                        </div>
                        <div className='col-xs-12 col-sm-4 col-md-4 col-lg-3'>
                            <div className='thumbnail text-center'>
                                <a href='#'>
                                    <img src={'http://placehold.it/300x300'} alt={ 'Album name' } />
                                </a>
                                <div className='caption'>
                                    <h4>{ 'Album name' }</h4>
                                </div>
                            </div>
                        </div>
                        <div className='col-xs-12 col-sm-4 col-md-4 col-lg-3'>
                            <div className='thumbnail text-center'>
                                <a href='#'>
                                    <img src={'http://placehold.it/300x300'} alt={ 'Album name' } />
                                </a>
                                <div className='caption'>
                                    <h4>{ 'Album name' }</h4>
                                </div>
                            </div>
                        </div>
                        <div className='col-xs-12 col-sm-4 col-md-4 col-lg-3'>
                            <div className='thumbnail text-center'>
                                <a href='#'>
                                    <img src={'http://placehold.it/300x300'} alt={ 'Album name' } />
                                </a>
                                <div className='caption'>
                                    <h4>{ 'Album name' }</h4>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
export default Artist;