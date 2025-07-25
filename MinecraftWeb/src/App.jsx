import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";
import './App.css'
import Header from './components/Header'
import Footer from './components/Footer';
import Navbar from './components/Navbar';
import Home from  './pages/Home';
import Rules from './pages/Rules';
import About from './pages/About';
import Statistics from './pages/Statistics'
import PrivateRoute from './utils/PrivateRoute';
import AdminPage from './pages_admin/AdminPage';
import Changelog from './pages/Changelog';
import Server from './components/Server';
import Login from "./pages/Login";
import Impressum from "./pages/Impressum";
import Datenschutz from "./pages/Datenschutz";
import NotFound from "./pages/NotFound";
import LogoutPage from "./pages_admin/LogoutPage";
import RulesPage from "./pages_admin/RulesPage";
import AboutPage from "./pages_admin/AboutPage";

function App() {
  const [info, setInfo] = useState([]);

  useEffect(() => {
          fetch("https://localhost:7198/api/Website/GetServerInfo")
              .then(response => response.json())
              .then(json => {
                  setInfo(json);
              })
              .catch(() => {
                  console.log("Problem while fetching data")
              })
      }, []);


  return (
    <div className='container'>
      <Router>
        <Header />
        <Navbar />
        <Server data={info}/>
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
              <AdminPage data={info}/>
            </PrivateRoute>
          } />
          <Route path="/Logout" element={
            <PrivateRoute>
              <LogoutPage />
            </PrivateRoute>
          } />
          <Route path="/AdminAbout" element={
            <PrivateRoute>
              <AboutPage />
            </PrivateRoute>
          } />
          <Route path="/AdminRules" element={
            <PrivateRoute>
              <RulesPage />
            </PrivateRoute>
          } />

          <Route path="*" element={<NotFound />} />
        </Routes>
        <Footer data={info}/>
      </Router>
    </div>
  )
}

export default App
