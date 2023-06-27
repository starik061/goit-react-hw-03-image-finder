import React, { Component } from 'react';
import {
  SearchbarStyle,
  SearFormStyle,
  SearchFormButtonStyle,
  SearchFormInputStyle,
} from './Searchbar.styled';
import { FcSearch } from 'react-icons/fc';
import { IconContext } from 'react-icons';

export class Searchbar extends Component {
  state = { searchQuery: '' };

  componentDidUpdate(prevProps, prevState) {}

  handleSearchQuery = event => {
    this.setState({
      searchQuery: event.target.value,
    });
  };
  resetSearchInput = () => {
    this.setState({
      searchQuery: '',
    });
  };

  render() {
    return (
      <SearchbarStyle>
        <SearFormStyle
          onSubmit={event => {
            event.preventDefault();
            this.props.onSearchSubmit(this.state.searchQuery);
            this.resetSearchInput();
          }}
        >
          <SearchFormInputStyle
            type="text"
            autocomplete="off"
            autoFocus
            placeholder="Search images and photos"
            onChange={this.handleSearchQuery}
            value={this.state.searchQuery}
          />
          <SearchFormButtonStyle type="submit">
            <IconContext.Provider value={{ size: '24px' }}>
              <FcSearch />
            </IconContext.Provider>
          </SearchFormButtonStyle>
        </SearFormStyle>
      </SearchbarStyle>
    );
  }
}
