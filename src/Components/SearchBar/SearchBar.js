import React from 'react';
import '../SearchBar/SearchBar.css';

class SearchBar extends React.Component {
  constructor(props){
    super(props);
    this.handleSearch = this.handleSearch.bind(this);
    this.handleTermChange = this.handleTermChange.bind(this);
    this.state = {term: ''};
  }

  handleSearch(event){
    this.props.onSearch(this.state.term);
    event.preventDefault();
  }

  handleTermChange(event) {
    this.setState({term: event.target.value});
  }

  render() {
    return (
      <div className="SearchBar">
        <input placeholder="Enter A Song Title" onChange={this.handleTermChange} id="searchField"/>
        <a onClick={this.handleSearch} >SEARCH</a>
      </div>
    );
  }
}

export default SearchBar;
