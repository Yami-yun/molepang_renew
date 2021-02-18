import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { Provider } from "react-redux";
import {createStore, applyMiddleware} from 'redux';
import Reducer from 'redux/reducer';
import thunk from 'redux-thunk';

const store = createStore(Reducer, applyMiddleware(thunk));
ReactDOM.render(
  
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  
  document.getElementById('root')
);

