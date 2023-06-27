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
    page: 1,
  };

  componentDidMount() {
    this.setState({
      totalHits: 1,
    });
  }

  async componentDidUpdate(prevProps, prevState) {
    //Это условие сработает при новом поисковом запросе и обнулив массив изображений в стэйте заполнит его новым массивом с бэкэнда
    if (prevState.searchQuery !== this.state.searchQuery) {
      const { totalHits, hits } = await getImagesByQuery(
        this.state.searchQuery,
        this.state.page
      );
      this.setState({
        imagesData: hits,
        totalHits,
        loadMoreVisible: totalHits > 12 ? true : false,
      });
    }
    //Это условие сработает при нажатии Load more, увеличится страница и в массив добавятся следующие 12 элементов
    if (prevState.page !== this.state.page) {
      const { totalHits, hits } = await getImagesByQuery(
        this.state.searchQuery,
        this.state.page
      );
      this.setState({
        imagesData: [...prevState.imagesData, ...hits],
        totalHits,
        loadMoreVisible: totalHits > 12 ? true : false,
      });
    }
  }

  handleSearchSubmit = searchQuery => {
    this.setState({
      searchQuery,
      imagesData: [],
      totalHits: 0,
      loadMoreVisible: false,
      page: 1,
    });
  };

  loadMoreImages = () => {
    this.setState(prevState => {
      return { page: prevState.page + 1 };
    });
  };
  render() {
    return (
      <AppStyle>
        <Searchbar onSearchSubmit={this.handleSearchSubmit} />
        {this.state.totalHits === 0 && this.state.searchQuery !== '' ? (
          <p>Ничего не найдено</p>
        ) : (
          <ImageGallery galleryImages={this.state.imagesData} />
        )}
        {this.state.loadMoreVisible && (
          <div style={{ margin: '0 auto' }}>
            <LoadMoreButton onLoadMoreBtnClick={this.loadMoreImages} />
          </div>
        )}
      </AppStyle>
    );
  }
}
