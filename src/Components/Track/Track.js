import React from 'react';
import './Track.css';

class Track extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      "id": this.props.key,
    }
    this.addTrack = this.addTrack.bind(this);
    this.onRemove = this.removeTrack.bind(this);
    this.action = this.action.bind(this);    
  }

  addTrack() {
    this.props.onAdd(this.props.track);
  }

  removeTrack() {
    this.props.onRemove(this.props.track);
  }

  action(){
    if (this.props.actionType === '+') {
      this.addTrack();
    } else {
      this.removeTrack();
    }
  }

  render() {
    return (
      <div className="Track">
        <div className="Track-information">
          <h3>{this.props.track.name}</h3>
          <p>{this.props.track.artist} | {this.props.track.album}</p>
        </div>
        <a className="Track-action" onClick={this.action}>{this.props.actionType}</a>
      </div>
    );
  }
}

export default Track;
