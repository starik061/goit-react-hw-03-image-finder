import React, { Component } from 'react';
import { Searchbar } from './Searchbar/Searchbar';
import { getImagesByQuery } from './imageAPI/api';

export class App extends Component {
  state = {
    searchQuery: '',
    imagesData: [],
  };

  componentDidMount() {}

  async componentDidUpdate(prevProps, prevState) {
    if (prevState.searchQuery !== this.state.searchQuery) {
      this.setState({
        imagesData: await getImagesByQuery(this.state.searchQuery),
      });
    }
  }

  handleSearchSubmit = searchQuery => {
    this.setState({ searchQuery });
  };
  render() {
    return (
      <>
        <Searchbar onSearchSubmit={this.handleSearchSubmit} />
      </>
    );
  }
}
