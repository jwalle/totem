import React from 'react';
import axios from 'axios';

class FetchArtists extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            artists: []
        };
    }

    componentDidMount() {
        axios.get(`http://www.reddit.com/r/${this.props.subreddit}.json`)
            .then(res => {
                const artists = res.data.data.children.map(obj => obj.data);
                this.setState({ artists });
            });
    }
    render() {
        return (
            <div>
                <h1>{`/r/${this.artists.subreddit}`}</h1>
            </div>
        );
    }
}
