import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {pickBy} from 'lodash';
import ArticleList from './ArticleList';
import SearchBar from './SearchBar';
import TimeStamp  from './TimeStamp';

class App extends Component {
  static childContextTypes = {
    store: PropTypes.object
  };
  
  getChildContext() {
    return {
      store: this.props.store
    };
  };
  
  state = this.props.store.getState();
  
  onStoreChange = () => {
    this.setState(this.props.store.getState());
  };
  
  componentDidMount() {
    this.subscriptionId = this.props.store.subscribe(this.onStoreChange);
    this.props.store.startClock();
  };
  
  componentWillUnmount() {
    this.props.store.unsubscribe(this.subscriptionId)
  };
  
  render() {
    let { articles, searchTerm } = this.state;
    const searchRegEx = new RegExp(searchTerm, 'i');
    if (searchTerm) {
      articles = pickBy(articles, (value) => {
        return value.title.match(searchRegEx) ||
          value.body.match(searchRegEx)
      })
    }
    return (
      <div>
        <TimeStamp />
        <SearchBar />
        <ArticleList
          articles={articles}
        />
      </div>
    );
  }
}

export default App;