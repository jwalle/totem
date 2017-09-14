import React from 'react';

const ArtistNotFound = ({text}) => {
  return (
    <div className='container'>
      <div className='jumbotron'>
        <h1>404 {text} Not Found</h1>
      </div>
    </div>
  );
};

export default ArtistNotFound;