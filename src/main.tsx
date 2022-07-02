import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './styles/fonts.scss';
import './styles/globals.scss';
import { printAuthorsInfo } from './utils/authors_info';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

printAuthorsInfo();
