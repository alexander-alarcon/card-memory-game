import React from 'react';
import ReactDOM from 'react-dom';

import './index.css';
import App from './Containers/App';
import { FlipProvider } from './store/FlipContext';

const app = (
  <FlipProvider>
    <App />
  </FlipProvider>
);
ReactDOM.render(app, document.getElementById('root'));
