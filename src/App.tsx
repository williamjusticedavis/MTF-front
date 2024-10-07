import { BrowserRouter, Route, Routes } from "react-router-dom"
import Home from "./pages/home"
import Dev from "./pages/Dev"
import { Provider } from "react-redux"
import {store} from './redux/store'

function App() {

  return (
    <>
    <Provider store={store}>
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<h1>place holder for / page</h1>}/>
        <Route path="/home" element={<Home/>}/>
        <Route path="/about" element={<h1>place holder for about page</h1>}/>
        <Route path="/services" element={<h1>place holder for services page</h1>}/>
        <Route path="/contact" element={<h1>place holder for contact page</h1>}/>
        <Route path="/profile" element={<h1>place holder for profile page</h1>}/>
        <Route path="/settings" element={<h1>place holder for settings page</h1>}/>
        <Route path="/login" element={<h1>place holder for login page</h1>}/>
        <Route path="/logout" element={<h1>place holder for testing page</h1>}/>
        <Route path="/Dev" element={<Dev/>}/>
      </Routes>
      </BrowserRouter>
      </Provider>
    </>
  )
}

export default App
