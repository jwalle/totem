import React from 'react';

class Album extends React.Component {
    render() {
        return (
            <div className='container'>
                <ol className='breadcrumb'>
                    <li><a href='/'>Recherche</a></li>
                    <li><a href='#'>{ 'Artist' }</a></li>
                    <li className='active'>{ 'Album' }</li>
                </ol>
                <div className='page-header'>
                    <h1>Pistes</h1>
                    <h2>{ 'Artist' } - { 'Album' }</h2>
                </div>
                <div className='row'>
                    <div className='col-xs-12 col-md-6 col-lg-6'>
                        <img src={'http://placehold.it/640x640'} className='thumbnail img-responsive' alt={ 'Album name' } />
                    </div>
                    <div className='col-xs-12 col-md-6 col-lg-6'>
                        <ul className='list-group'>
                            <li className='list-group-item'>#. Track name <span className='badge'>00:00</span></li>
                            <li className='list-group-item'>#. Track name <span className='badge'>00:00</span></li>
                            <li className='list-group-item'>#. Track name <span className='badge'>00:00</span></li>
                            <li className='list-group-item'>#. Track name <span className='badge'>00:00</span></li>
                            <li className='list-group-item'>#. Track name <span className='badge'>00:00</span></li>
                            <li className='list-group-item'>#. Track name <span className='badge'>00:00</span></li>
                            <li className='list-group-item'>#. Track name <span className='badge'>00:00</span></li>
                            <li className='list-group-item'>#. Track name <span className='badge'>00:00</span></li>
                            <li className='list-group-item'>#. Track name <span className='badge'>00:00</span></li>
                            <li className='list-group-item'>#. Track name <span className='badge'>00:00</span></li>
                            <li className='list-group-item'>#. Track name <span className='badge'>00:00</span></li>
                        </ul>
                    </div>
                </div>
            </div>
        );
    }
}
export default Album;