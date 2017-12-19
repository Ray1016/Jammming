import React from 'react';
import '../Playlist/Playlist.css';
import TrackList from '../TrackList/TrackList';

class Playlist extends React.Component {
  constructor(props) {
    super(props);
    this.handleNameChange = this.handleNameChange.bind(this);
  }

  handleNameChange(event) {
    this.props.onNameChange(event.target.value);
  }

  render() {
    //this will allow the app to render and then replace the 
    //tracks variable with this.props.tracks when the props are ready
    //this check if this.props.playlistTracks exist and if it doesn't it will 
    //assign the variable to an empty array. then .map will not be 
    //called on an undefined variable.
    let trackList = this.props.playlistTracks ? this.props.playlistTracks : [];
    return (
      <div className="Playlist">
        <input value={this.props.playlistName} onChange={this.handleNameChange} />
        <TrackList tracks={trackList} actionType='-' onRemove={this.props.onRemove} />
        <a className="Playlist-save" onClick={this.props.onSave}>SAVE TO SPOTIFY</a>
      </div>
    );
  }
}

export default Playlist;
