import { BrowserRouter as Router, Routes, Route } from "react-router-dom"

import HomeMain from "./components/home/HomeMain"
import Header from "./components/Header"
import { Footer } from "./components/Footer"

function App() {
  return (
    <Router>
      <div>
        <Header />
        <main className="pt-20">
          <Routes>
            <Route path="/" element={<HomeMain />} />
            {/* <Route path="/about" element={<About />} />
            <Route path="/service" element={<Service />} />
            <Route path="/project" element={<Project />} />
            <Route path="/pages" element={<Pages />} />
            <Route path="/contact" element={<Contact />} /> */}
          </Routes>
        </main>
        <Footer/>
      </div>
    </Router>
  )
}

export default App
