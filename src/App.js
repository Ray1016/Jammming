import React, { Component } from 'react';
import './App.css';
import SearchBar from './Components/SearchBar/SearchBar';
import SearchResults from './Components/SearchResults/SearchResults';
import Playlist from './Components/Playlist/Playlist';
import Spotify from './util/Spotify';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      'searchResults': [],
      'playlistTracks': [],
      'playlistName': 'New Playlist'
    };
    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
    this.updatePlaylistName = this.updatePlaylistName.bind(this);
    this.savePlaylist = this.savePlaylist.bind(this);
    this.search = this.search.bind(this);
  }

  addTrack(trackToAdd) {
    let test = false;
    for (let i = 0; i < this.state.playlistTracks.length; i++) {
      if (this.state.playlistTracks[i].id === trackToAdd.id) test = true;
    }
    if (!test) {
      this.state.playlistTracks.push(trackToAdd);
      this.setState({ 'playlistTracks': this.state.playlistTracks });
    }
  }

  removeTrack(trackToRemove) {
    this.state.playlistTracks.splice(this.state.playlistTracks.indexOf(trackToRemove), 1);
    this.setState({ 'playlistTracks': this.state.playlistTracks });
  }

  updatePlaylistName(name) {
    this.setState({ 'playlistName': name });
  }

  savePlaylist() {
    const trackUris = this.state.playlistTracks.map(track => track.uri);

    Spotify.savePlaylist(this.state.playlistName, trackUris).then(response => {
      if (response) {
        this.setState({
          playlistName: 'New Playlist',
          playlistTracks: []
        });
      }
    });
  }

  search(term) {
    Spotify.search(term).then(response => this.setState({ searchResults: response }));
  }

  render() {
    return (
      <div>
        <h1>Ja<span className="highlight">mmm</span>ing</h1>
        <div className="App">
          <SearchBar onSearch={this.search} />
          <div className="App-playlist">
            <SearchResults searchResults={this.state.searchResults} onAdd={this.addTrack} />
            <Playlist playlistTracks={this.state.playlistTracks} playlistName={this.state.playlistName} onRemove={this.removeTrack} onNameChange={this.updatePlaylistName} onSave={this.savePlaylist} />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
