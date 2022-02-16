import React from 'react';
import { Provider } from 'react-redux';
import store from './store';
import './App.css';

function App() {
  return <Provider store={store}>
    <h1> Hello world!</h1>
  </Provider>
}

export default App;
