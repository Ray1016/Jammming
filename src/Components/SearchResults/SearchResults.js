import React from 'react';
import '../SearchResults/SearchResults.css';
import TrackList from '../TrackList/TrackList';


class SearchResults extends React.Component {
  render() {
    return (
      <div className="SearchResults">
        <h2>Results</h2>
        <TrackList tracks={this.props.searchResults} onAdd={this.props.onAdd} actionType='+'/>
      </div>
    );
  }
}

export default SearchResults;
