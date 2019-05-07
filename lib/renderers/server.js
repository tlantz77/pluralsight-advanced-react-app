import React from 'react';
import ReactDOMServer from 'react-dom/server';

import App from '../components/App';

const server = () => {
  return ReactDOMServer.renderToString(
    <App />
  );
};

export default server;