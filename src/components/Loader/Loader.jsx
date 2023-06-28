import { Component } from 'react';
import { RotatingLines } from 'react-loader-spinner';

export class Loader extends Component {
  render() {
    return (
      <RotatingLines
        strokeColor="grey"
        strokeWidth="3"
        animationDuration="0.75"
        width="60"
        visible={true}
      />
    );
  }
}
