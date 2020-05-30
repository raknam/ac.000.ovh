import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

String.prototype.ucfirst = function() {
    return this.charAt(0).toUpperCase() + this.slice(1)
};

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
