import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Register from './pages/Register';
import Profile from './pages/Profile';
import Login from './pages/Login';
import Home from './pages/Home';
import store from './store';
import './App.scss';


function App() {

  return (
    <Provider store={store}>
      <Router>
        <main className='App'>
          <Navbar />
          <div className='container'>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/Register" element={<Register />} />
              <Route path="/Login" element={<Login />} />
              <Route path="/Profile" element={<Profile />} />
            </Routes>
          </div>
        </main>
      </Router>
    </Provider>
  );
};

export default App;
