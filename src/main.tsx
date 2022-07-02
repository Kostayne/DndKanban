import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { printAuthorsInfo } from './utils/authors_info';
import './styles/fonts.scss';
import './styles/globals.scss';
import './styles/animations.scss';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

printAuthorsInfo();
