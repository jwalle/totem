import React from 'react';
import { render } from 'react-dom';
import { Router, Route, IndexRoute, Link, browserHistory } from 'react-router';

import App from './components/App.jsx';

// import DemoPage from './components/DemoPage.jsx';
import NotFoundPage from './components/NotFoundPage.jsx';
import Search from './components/Search.jsx';
import Artist from './components/Artist.jsx';
import Album from './components/Album.jsx';



render((
  <Router history={browserHistory}>
    <Route path="/" component={App}>
        <IndexRoute component={Search} subreddit="reactjs"/>
        <Route path="artist" component={Artist} />
        <Route path="album" component={Album} />

      <Route path="*" component={NotFoundPage} />
    </Route>
  </Router>
), document.getElementById('root'));
