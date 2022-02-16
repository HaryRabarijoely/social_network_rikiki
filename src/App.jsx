import React from 'react';
import { Provider } from 'react-redux';
import store from './store';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Register from './pages/Register';
import Profile from './pages/Profile';
import Navbar from './components/Navbar';

function App() {

  return (
    <Provider store={store}>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Profile" element={<Profile />} />
          <Route path="/Register" element={<Register />} />
        </Routes>
      </Router>
    </Provider>
  )
}

export default App;
