import React, { Component } from 'react';
import { AppStyle } from './App.styled';
import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { getImagesByQuery } from './imageAPI/api';
import { LoadMoreButton } from './LoadMoreButton/LoadMoreButton';
import { Loader } from './Loader/Loader';

export class App extends Component {
  state = {
    searchQuery: '',
    imagesData: [],
    totalHits: 0,
    loadMoreVisible: false,
    page: 1,
    loaderVisible: false,
    isFound: true,
  };

  componentDidMount() {}

  async componentDidUpdate(prevProps, prevState) {
    //Это условие сработает при новом поисковом запросе и обнулив массив изображений в стэйте заполнит его новым массивом с бэкэнда
    if (
      prevState.searchQuery !== this.state.searchQuery &&
      this.state.page === 1
    ) {
      this.setState({ loaderVisible: true, isFound: true });

      const { totalHits, hits } = await getImagesByQuery(
        this.state.searchQuery,
        this.state.page
      );
      setTimeout(() => {
        this.setState({
          imagesData: hits,
          totalHits,
          loadMoreVisible: totalHits > 12 ? true : false,
          loaderVisible: false,
          isFound: !!hits.length,
        });
      }, 600);
    }

    //Это условие сработает при нажатии Load more, увеличится страница и в массив добавятся следующие 12 элементов
    if (
      prevState.page !== this.state.page &&
      prevState.searchQuery === this.state.searchQuery
    ) {
      this.setState({ loaderVisible: true });

      const { totalHits, hits } = await getImagesByQuery(
        this.state.searchQuery,
        this.state.page
      );

      setTimeout(() => {
        this.setState({
          imagesData: [...prevState.imagesData, ...hits],
          totalHits,
          loadMoreVisible:
            totalHits > prevState.imagesData.length + 12 ? true : false,
          loaderVisible: false,
        });
      }, 600);
    }
  }

  handleSearchSubmit = searchQuery => {
    if (searchQuery !== this.state.searchQuery) {
      this.setState({
        searchQuery,
        imagesData: [],
        totalHits: 0,
        loadMoreVisible: false,
        page: 1,
      });
    }
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
        {this.state.isFound ? (
          <ImageGallery galleryImages={this.state.imagesData} />
        ) : (
          <div style={{ margin: '0 auto' }}>
            <p>Nothing found</p>
          </div>
        )}

        {this.state.loaderVisible && (
          <div style={{ margin: '0 auto' }}>
            <Loader />
          </div>
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
