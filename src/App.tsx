// src/App.tsx
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Users from "./pages/Users";
import Login from "./pages/Login";
import Otp from './pages/Otp';
import NotFound from './components/NotFound';
import { Provider } from "react-redux";
import store from './redux/store';
import ProtectedRoute from './utilities/ProtectedRoute';  // Make sure this path is correct

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<h1>place holder for / page</h1>} />
          <Route path="/About" element={<h1>this is About page</h1>} />
          <Route path="/login" element={<Login />} />
          <Route path="/logout" element={<h1>place holder for testing page</h1>} />

          {/* Protect the /login/otp route */}
          <Route path="/login/otp" element={
            <ProtectedRoute>
              <Otp />
            </ProtectedRoute>
          } />

          {/* Protect the /users route */}
          <Route path="/users" element={
            <ProtectedRoute>
              <Users />
            </ProtectedRoute>
          } />

          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  );
};

export default App;