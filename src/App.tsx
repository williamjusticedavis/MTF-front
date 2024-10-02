import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from "./pages/home";
import Dev from "./pages/Dev";
import Login from "./pages/Login";
import NotFound from './components/NotFound';

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<h1>place holder for / page</h1>} />
          <Route path="/home" element={<Home />} />
          <Route path="/about" element={<h1>place holder for about page</h1>} />
          <Route path="/services" element={<h1>place holder for services page</h1>} />
          <Route path="/contact" element={<h1>place holder for contact page</h1>} />
          <Route path="/profile" element={<h1>place holder for profile page</h1>} />
          <Route path="/settings" element={<h1>place holder for settings page</h1>} />
          <Route path="/login" element={<Login />} />
          <Route path="/logout" element={<h1>place holder for testing page</h1>} />
          <Route path="/Dev" element={<Dev />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
