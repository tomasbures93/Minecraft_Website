import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './App.css'
import Header from './components/Header'
import Footer from './components/Footer';
import Navbar from './components/Navbar';
import Home from  './pages/Home';
import Rules from './pages/Rules';
import About from './pages/About';
import Statistics from './pages/Statistics'
import PrivateRoute from './utils/PrivateRoute';
import AdminPage from './pages/AdminPage';
import Changelog from './pages/Changelog';
import Server from './components/Server';
import Login from "./pages/Login";
import Impressum from "./pages/Impressum";
import Datenschutz from "./pages/Datenschutz";
import NotFound from "./pages/NotFound";

function App() {

  return (
    <div className='container'>
      <Router>
        <Header />
        <Navbar />
        <Server />
        <Routes>
          <Route path="/" element={<Home />}/>
          <Route path="/Rules" element={<Rules />} />
          <Route path="/About" element={<About />} />
          <Route path="/Statistics" element={<Statistics />} />
          <Route path="/Changelog" element={<Changelog />} />
          <Route path="/Login" element={<Login />} />
          <Route path="/Impressum" element={<Impressum />} />
          <Route path="/Datenschutz" element={<Datenschutz />} />

          <Route path="/AdminPage" element={
            <PrivateRoute>
              <AdminPage />
            </PrivateRoute>
          } />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Footer />
      </Router>
    </div>
  )
}

export default App
