import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import Firebase from "./firebase";

// eslint-disable-next-line no-extend-native
Object.defineProperty(String.prototype, "ucfirst", {
    value: function () {
        return this.charAt(0).toUpperCase() + this.slice(1);
    }
});

ReactDOM.render(
  <React.StrictMode>
      <App firebase={new Firebase()}/>
  </React.StrictMode>,
  document.getElementById('root')
);

serviceWorker.unregister();