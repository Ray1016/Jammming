import React from 'react';
import Track from '../Track/Track'
import '../TrackList/TrackList.css';

class TrackList extends React.Component {
  
  render() {
    //this will allow the app to render and then replace the 
    //tracks variable with this.props.tracks when the props are ready
    //this check if this.props.tracks exist and if it doesn't it will 
    //assign the variable to an empty array. then .map will not be 
    //called on an undefined variable.
    let tracks = this.props.tracks ? this.props.tracks : [];
    return (
      <div className="TrackList">
        {tracks.map(track => {
          return <Track track={track} key={track.id} list={this.props.tracks} onAdd={this.props.onAdd} actionType={this.props.actionType} onRemove={this.props.onRemove}/>
        }
        )}
      </div>
    );
  }
}

export default TrackList;
