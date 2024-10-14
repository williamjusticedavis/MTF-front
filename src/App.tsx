// src/App.tsx
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Users from "./pages/Users";
import Login from "./pages/Login";
import Otp from './pages/Otp';
import NotFound from './components/NotFound';
import { Provider } from "react-redux";
import store from './redux/store';
import Map from './pages/MapPage';

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<h1>place holder for / page</h1>} />
          <Route path="/About" element={<h1>this is About page</h1>} />
          <Route path="/login" element={<Login />} />
          <Route path="/logout" element={<h1>place holder for testing page</h1>} />
          <Route path="/map" element={<Map/>} />
          // wh
          {/* Unprotected /login/otp route */}
          <Route path="/login/otp" element={<Otp />} />

          {/* Unprotected /users route */}
          <Route path="/users" element={<Users />} />

          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  );
};

export default App;