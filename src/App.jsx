import { HashRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./Components/Header/Header";
import Sidebar from "./Components/NavBar/NavBar";
import Main from "./Components/Main/Main";
import "./App.css";
import Footer from "./Components/Footer/Footer";
import NavHeader from "./Components/Navheader/NavHeader";


function App() {
  return (
    <Router>
      <div className="app-container">
        <NavHeader/>
        <Header />
        <div className="content">
            <Sidebar />
            <Main />
        </div>
        <Footer/>
      </div>
    </Router>
  );
}

export default App;
