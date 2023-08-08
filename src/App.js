// import logo from './logo.svg';
import "./App.css";
import React, { useState } from 'react';
// import Landingpage from "./components/landingpage";
import Header from './components/Header';
import About from "./components/About";
import Contact from "./components/Contact";
import LandingPage from "./components/LandingPage";
import Dashboard from "./components/Dashboard";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {

  const [currentTab, setCurrentTab] = useState("landing-page");

  const renderTab = () => {
    switch (currentTab) {
      case "dashboard":
        return <Dashboard />;

      case "about-us":
        return <About Us />;

      case "contact":
        return <Contact />;

          case "landing-page":
            return <LandingPage />;

      default:
        return null;
    }
  };

  return (
    
    <div>
    <div>
      
				<Header currentTab={currentTab} setCurrentTab={setCurrentTab}></Header>
        
			</div>

  
  
      <div>
      <main>{renderTab()}</main>
    </div>
   
  </div>

  );
}
export default App;
