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
import EditProfile from './pages/EditProfile';
import PrivateRoute from './components/PrivateRoute';


function App() {

  return (
    <Provider store={store}>
      <Router>
        <main className='App'>
          <Navbar />
          <div className='container'>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/register" element={<Register />} />
              <Route path="/login" element={<Login />} />
              <Route path="/profile" element={<PrivateRoute><Profile /></PrivateRoute>} />
              <Route path="/profile/edit" element={<PrivateRoute><EditProfile /></PrivateRoute>} />
              <Route path="/profile/:userID" element={<PrivateRoute><Profile /></PrivateRoute>} />
                           
            </Routes>
          </div>
        </main>
      </Router>
    </Provider>
  );
};

export default App;
