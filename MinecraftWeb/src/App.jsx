import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './App.css'
import Header from './components/Header'
import Footer from './components/Footer';
import Navbar from './pages/Navbar';
import Home from  './pages/Home';
import Rules from './pages/Rules';
import About from './pages/About';
import Statistics from './pages/Statistics'
import PrivateRoute from './utils/PrivateRoute';
import AdminPage from './pages/AdminPage';
import Changelog from './pages/Changelog';
import Server from './components/Server';

function App() {

  return (
    <div className='container'>
      <Router>
        <Header />
        <Navbar />
        <Server ip={"1.2.3.4:7654"} status={"online"}/>
        <Routes className="bg-secondary">
          <Route path="/" element={<Home />}/>
          <Route path="/Rules" element={<Rules />} />
          <Route path="/About" element={<About />} />
          <Route path="/Statistics" element={<Statistics />} />
          <Route path="/Changelog" element={<Changelog />} />

          <Route path="/AdminPage" element={
            <PrivateRoute>
              <AdminPage />
            </PrivateRoute>
          } />
        </Routes>
        <Footer />
      </Router>
    </div>
  )
}

export default App
