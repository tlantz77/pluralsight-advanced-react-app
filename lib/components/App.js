import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import {pickBy} from 'lodash';
import Perf from 'react-addons-perf';
if (typeof window !== 'undefined') {
  window.Perf = Perf;
}
import ArticleList from './ArticleList';
import SearchBar from './SearchBar';
import TimeStamp  from './TimeStamp';

class App extends PureComponent {
  static childContextTypes = {
    store: PropTypes.object
  };
  
  getChildContext() {
    return {
      store: this.props.store
    };
  };
  
  appState = () => {
    const {articles, searchTerm} = this.props.store.getState();
    return {articles, searchTerm};
  }
  
  state = this.appState();
  
  onStoreChange = () => {
    this.setState(this.appState);
  };
  
  componentDidMount() {
    this.subscriptionId = this.props.store.subscribe(this.onStoreChange);
    this.props.store.startClock();
    setImmediate(() => {
      Perf.start();
    });
    setTimeout(() => {
      Perf.stop();
      Perf.printWasted();
    }, 5000);
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
        {<ArticleList
          articles={articles}
        />}
      </div>
    );
  }
}

export default App;