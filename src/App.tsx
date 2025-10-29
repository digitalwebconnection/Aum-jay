import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Header from "./components/Header"
import { Footer } from "./components/Footer"
import HomeMain from "./components/home/HomeMain"

import MainAbout from "./components/AboutUs/MainAbout"
import MainService from "./components/Service/MainService"
import MainProject from "./components/Project/MainProject"
import MainContact from "./components/ContactUs/MainContact"

function App() {
  return (
    <Router>
      <div>
        <Header />
        <main className="pt-20">
          <Routes>
            <Route path="/" element={<HomeMain />} />
            <Route path="/about" element={<MainAbout/>} />
            <Route path="/services" element={<MainService/>} />
            <Route path="/project" element={<MainProject/>} />
            <Route path="/contact" element={<MainContact/>} />
          </Routes>
        </main>
        <Footer/>
      </div>
    </Router>
  )
}

export default App
