import { BrowserRouter, Route, Routes } from "react-router-dom"
import Home from "./pages/home"

function App() {

  return (
    <>
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<h1>place holder for / page</h1>}/>
        <Route path="/home" element={<Home/>}/>
        <Route path="/login" element={<h1>place holder for login page</h1>}/>
        <Route path="/test" element={<h1>place holder for testing page</h1>}/>
      </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
