import React, { Component } from 'react';
import { AppStyle } from './App.styled';
import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { getImagesByQuery } from './imageAPI/api';
import { LoadMoreButton } from './LoadMoreButton/LoadMoreButton';

export class App extends Component {
  state = {
    searchQuery: '',
    imagesData: [],
    totalHits: 0,
    loadMoreVisible: false,
  };

  componentDidMount() {}

  async componentDidUpdate(prevProps, prevState) {
    if (prevState.searchQuery !== this.state.searchQuery) {
      const { totalHits, hits } = await getImagesByQuery(
        this.state.searchQuery
      );
      totalHits > 12
        ? this.setState({
            imagesData: hits,
            totalHits,
            loadMoreVisible: true,
          })
        : this.setState({
            imagesData: hits,
            totalHits,
            loadMoreVisible: false,
          });
    }
  }

  handleSearchSubmit = searchQuery => {
    this.setState({ searchQuery });
  };
  render() {
    return (
      <AppStyle>
        <Searchbar onSearchSubmit={this.handleSearchSubmit} />
        <ImageGallery galleryImages={this.state.imagesData} />
        {this.state.loadMoreVisible && (
          <div style={{ margin: '0 auto' }}>
            <LoadMoreButton />
          </div>
        )}
      </AppStyle>
    );
  }
}
