import React, {Component} from 'react';
import storeProvider from './storeProvider';

class TimeStamp extends Component {
  render() {
    return (
      <div>
        {this.props.timestamp.toString()}
      </div>
    );
  }
}

function extraProps(store) {
  return {
    timestamp: store.getState().timestamp
  };
}

export default storeProvider(extraProps)(TimeStamp);