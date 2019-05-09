import Article from './Article';
import React, {PureComponent} from 'react';

class ArticleList extends PureComponent {
  render() {
    return (
      <div>
        {Object.values(this.props.articles).map(article =>
          <Article
            key={article.id}
            article={article}
          />
        )}
      </div>
    );
  }
}

export default ArticleList;