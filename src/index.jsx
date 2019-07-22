import React from 'react';
import ReactDOM from 'react-dom';

import './index.css';
import App from './Containers/App';

import { GameProvider } from './store/GameContext';

const app = (
  <GameProvider>
    <App />
  </GameProvider>
);
ReactDOM.render(app, document.getElementById('root'));
