import React from 'react';
import axios from 'axios';

class Album extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return(
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
        )
    }
}
export default Album;